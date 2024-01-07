"use client"

import { useEffect, useState } from "react"

export default function AllPosts() {

    const [data, setData] = useState(null)
    const [comments, setComment] = useState(null)

    useEffect(() => {
        getData(),
        getComments()
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

    const getComments = async() => {
        try {
            const res = await fetch("http://localhost:3000/blog-api/comments/allComments")

            const dataResponse = await res.json()

            if(res.ok) {
                setComment(dataResponse)
            } else {
                console.error(dataResponse.message)
                setComment([])
            }
            
        } catch (error) {
            console.error("Error to get comments, ", error)
            setComment([])
        }
    }

    const handlePostDelete = async (postId) => {
        const accessToken = localStorage.getItem('accessToken')
        try {
            const res = await fetch(`http://localhost:3000/blog-api/delete/post/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                }
            })
            
            if(res.ok) {
                getData()
            } else {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to delete post");
            }


        } catch (error) {
            console.error(error)
            
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
                            <p>{post.timeStamp}</p>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <button onClick={() => handlePostDelete(post._id)}>delete</button>

                            {comments ? (
                            <div>
                                

                                
                                {comments.filter((comment) => comment.post == post._id).map((comment) => (
                                    <p key={comment._id}>{comment.comment}</p>
                                ))}
                            
                            </div>
                            ): 
                            <p>No comments yet</p>
                            }

                            </li>
                        ))}
                    </ul>
                ):
                <p>No posts yet</p>
            }
        </div>
    )

}