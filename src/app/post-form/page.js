"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function PostForm() {

    const [isLogged, setIsLogged] = useState(false)
    
    const router = useRouter()

    

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        setIsLogged(accessToken !== null)

        if(!accessToken) {
            router.push("/login")
        }
    }, [isLogged, router])

    const handleNewPost = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const res = await fetch("http://localhost:3000/blog-api/new-post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },

                body: JSON.stringify({  
                    title: title,
                    content: content,
                    isPublic: true
                })
            })

            if(res.ok) {
                const data = await res.json()

            } else {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to fetch data")
            }

        } catch (error) {
            console.error("Failed to create a new post: ", error)
            setError(error.message)
        }
    }


    return(
        <div>
            <h1>new Post form</h1>
            <Link href="/">
                home
            </Link>

            <h1>New Post</h1>
            <form>
                <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
                <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)}/>

                <button onClick={handleNewPost}>new post</button>
            </form>

        </div>
    )
}