import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Admin() {
    const [winners, setWinners] = useState([])

    useEffect(() => {
        fetchWinners()
    }, [])

    const fetchWinners = async () => {
        const { data, error } = await supabase
            .from("winners")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.log(error)
            alert("Error fetching winners")
        } else {
            setWinners(data)
        }
    }

    return (
        <div>
            <h2>Admin Panel</h2>

            <button onClick={fetchWinners}>Refresh</button>
            <h3>All Winners</h3>

            {winners.length === 0 ? (
                <p>No data</p>
            ) : (
                winners.map((w) => (
                    <div key={w.id}>
                        <p>User ID: {w.user_id}</p>
                        <p>Matches: {w.match_count}</p>
                        <p>Date: {w.created_at}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    )
}
