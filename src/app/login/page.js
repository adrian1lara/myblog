'use client'


import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleLogin = async ()=> {
        try {
            const res = await fetch('http://localhost:3000/blog-api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email , password})
            })

            if(res.ok) {
                const data = await res.json()
                localStorage.setItem('accessToken', data.token)
                localStorage.setItem('userId', data._id)
                router.push("/post-form")
            } else {
                const errorData = await res.json()
                throw new Error(errorData.message ||"Failed to fetch data")
            }
        } catch (error) {
            console.error("Failed to login: ",error)
            setError(error.message)
        }
    }

    return(
        <div>
            <input 
            type="email"
            placeholder="youremail@yourdomain.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}