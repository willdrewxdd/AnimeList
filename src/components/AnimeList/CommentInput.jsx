"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const CommentInput = ({anime_mal_id, user_email, username, anime_title}) => {
    const [comment, setComment] = useState("")
    const [isCreated, setIsCreated] = useState(false)
    const [error, setError] = useState("") 

    const router = useRouter()

    const handleInput = (event) => {
        setComment(event.target.value)
        if (error) setError("") 
    }

    const handlePosting = async (event) => {
        event.preventDefault()

        
        if (comment.length < 3) {
            setError("Komentar harus memiliki minimal 3 huruf.")
            return
        }

        const data = {anime_mal_id, user_email, comment, username, anime_title}

        const response = await fetch("/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(data)
        })
        const postComment = await response.json()
        if(postComment.isCreated){
            setIsCreated(true)
            setComment("")
            router.refresh()
        }
        return
    }

    return (
    <div className="flex flex-col gap-2">
        {isCreated && <p className="text-primary">postingan terkirim....</p>}
        {error && <p className="text-red-500">{error}</p>} 
        <textarea onChange={handleInput} value={comment} className="w-full h-32 text-xl p-4"/>
        <button onClick={handlePosting} className="w-52 py-2 px-3 bg-accent">Post Comment</button>
    </div>
    )
}

export default CommentInput