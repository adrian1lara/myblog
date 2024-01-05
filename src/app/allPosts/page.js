"use client"

import { useEffect, useState } from "react"

export default function AllPosts() {

    const [data, setData] = useState(null)

    useEffect(() => {
        getData()
    },[])

    const getData = async() => {

        try {
            const res = await fetch("http://localhost:3000/blog-api/posts/allPosts")

            const dataResponse = await res.json()

            if(res.ok) {
                setData(dataResponse)
            } else {
                console.error("failed to fetch posts ", dataResponse.message)
                setData([])
            }

        } catch (error) {
            console.error("Failed to fetch data ", error)
            setData([])
        }

    }

    return (
        <div>
            <h1>All Posts</h1>
            {
                data ? (
                    <ul>
                        {data.map((post) => (
                            <li key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            </li>
                        ))}
                    </ul>
                ):
                <p>No posts yet</p>
            }
        </div>
    )

}