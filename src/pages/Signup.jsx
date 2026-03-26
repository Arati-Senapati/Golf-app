
import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function Signup(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignup = async () =>{
        if(!email || !password){
            alert("Please fill all fields")
            return
        }
        const {data,error} = await supabase.auth.signUp({
            email,
            password
        })

        if(error)
            alert(error.message)
        else{
            console.log(data)
            //clear input after signup
            alert("Signup successful! Check your email.")
            setEmail("") 
            setPassword("")
            navigate("/")  //go to Login page
        }
            

    }

    return (
        <div>
            <h2>Signup</h2>

            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            
            <button onClick={handleSignup}>Signup</button>
        </div>
    )
}