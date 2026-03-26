import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

export default function Dashboard() {
    const [score, setScore] = useState("")
    const [scores, setScores] = useState([])
    const [user, setUser] = useState(null)
    const [drawResult, setDrawResult] = useState("")

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error) {
                console.log(error)
                return
            }

            const currentUser = data.user

            if (currentUser) {
                setUser(currentUser)
                fetchScores(currentUser.id)
            } else {
                alert("User not logged in")
            }
        }

        getUser()
    }, [])
    //     supabase.auth.getUser().then(res => {
    //         const currentUser = res.data.user
    //         if (currentUser) {
    //             setUser(currentUser)
    //             fetchScores(currentUser.id)
    //         } else {
    //             alert("User not logged in")
    //         }
    //     })
    // }, [])

    const fetchScores = async (userId) => {
        let { data } = await supabase
            .from("scores")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: true })

        setScores(data || [])
    }

    const addScore = async () => {
        if (!user) return

        const numericScore = parseInt(score)

        // ✅ ADD HERE
        if (!score) {
            alert("Enter a score")
            return
        }

        if (isNaN(numericScore)) {
            alert("Enter a valid number")
            return
        }

        // ✅ Range check (VERY IMPORTANT)
        if (numericScore < 1 || numericScore > 45) {
            alert("Score must be between 1 and 45")
            return
        }

        // delete oldest if 5 exist
        if (scores.length >= 5) {
            const { error: deleteError } = await supabase
                .from("scores")
                .delete()
                .eq("id", scores[0].id)

            if (deleteError) {
                alert("Error deleting old score")
                return
            }
        }

        // ✅ Insert new score
        const { error: insertError } = await supabase
            .from("scores")
            .insert({
                user_id: user.id,
                score: numericScore,
                date: new Date().toISOString().split("T")[0] // ✅ FIXED
            })

        if (insertError) {
            alert("Error adding score")
            return
        }

        setScore("")
        fetchScores(user.id)
    }
    const runDraw = () => {
        if (scores.length < 5) {
            alert("Add 5 scores first")
            return
        }
        let drawNumbers = []

        while (drawNumbers.length < 5) {
            let num = Math.floor(Math.random() * 45) + 1
            if (!drawNumbers.includes(num)) {
                drawNumbers.push(num)
            }
        }

        checkMatch(drawNumbers)
    }
    const checkMatch = async (drawNumbers) => {
        let userScores = scores.map(s => s.score)

        let matches = userScores.filter(num => drawNumbers.includes(num))

        setDrawResult(`You matched ${matches.length} numbers`)

        const { error } = await supabase.from("winners").insert({
            user_id: user.id,
            match_count: matches.length
        })
        if (error) {
            console.log(error)
            alert("Error saving result")
        }
    }
    return (
        <div>
            <h2>Dashboard</h2>

            <input
                type="number"
                placeholder="Enter score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
            />

            <button onClick={addScore}>Add Score</button>
            <button onClick={runDraw}>Run Draw</button>
            <h3>Your Scores</h3>

            {scores.map((s) => (
                <p key={s.id}>{s.score}</p>
            ))}
            {drawResult && <h3>{drawResult}</h3>}
            <button onClick={() => window.location.href = "/admin"}>
                Go to Admin
            </button>
        </div>
    )
}
