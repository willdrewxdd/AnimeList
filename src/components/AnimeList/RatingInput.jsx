"use client"
import { useState } from "react"

const RatingInput = ({ anime_mal_id, user_email, anime_title, existingRating }) => {
    const [rating, setRating] = useState(existingRating || 0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    const handleRating = async (ratingValue) => {
        if(ratingValue === existingRating){
            return
        }
        const isUpdating = existingRating && ratingValue !== existingRating;

        setRating(ratingValue)

        const data = { anime_mal_id, user_email, rating: ratingValue, anime_title }

        const response = await fetch("/api/v1/rating", {
            method: "POST",
            body: JSON.stringify(data),
        })

        if (response.ok) {
            setIsSubmitted(true)
            if (isUpdating) {
                setIsUpdated(true) 
            }
        }
    }

    return (
        <div>
            <p>Rate this anime:</p>
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    className={value <= rating ? "text-yellow-500" : "text-gray-400"}
                    onClick={() => handleRating(value)}
                >
                    {value} ★
                </button>
            ))}

            {isSubmitted && !isUpdated && <p className="text-green-500">Thank you for your rating!</p>}
            {isUpdated && <p className="text-blue-500">Rating has been updated!</p>}
        </div>
    )
}

export default RatingInput
