
import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all fields")
            return
        }
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error)
            alert(error.message)
        else {
            alert("Login success")
            setEmail("")
            setPassword("")
            navigate("/dashboard")
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />

            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

            <button onClick={handleLogin}>Login</button>

            <p>
                Don't have an account?
                <span onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>Create Account</span>
            </p>
        </div>
    )

}