import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Link from "next/link"


const page = async() => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({where: {user_email: user.email}})
    
    return (
        <section className="mt-4 px-4 w-full">
        <Header title={"My Comment"}/>
        <div className="grid grid-cols-1 py-2 gap-4">
                {comments.length > 0  ? (
                    comments.map(comment => (
                        <Link href={`/anime/${comment.anime_mal_id}`} key={comment.id} className="bg-primary text-dark p-4">
                            <p className="text-sm">{comment.anime_title}</p>
                            <p className="italic">{comment.comment}</p>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-primary ">Anda belum berkomentar.</p> 
                )}
            </div>
        </section>
    )
}

export default page