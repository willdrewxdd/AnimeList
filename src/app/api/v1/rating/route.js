import prisma from "@/libs/prisma"

export async function POST(request) {
    const { anime_mal_id, user_email, rating, anime_title } = await request.json()
    // const data = { anime_mal_id, user_email, rating, anime_title }

    // Cek apakah rating sudah ada untuk user dan anime ini, jika sudah maka update
    const createRating = await prisma.rating.upsert({
        where: {
            user_email_anime_mal_id: { // Kombinasi unik antara user_email dan anime_mal_id
                user_email: user_email,
                anime_mal_id: anime_mal_id,
            },
        },
        update: {
            rating: rating,  // Update rating jika sudah ada
        },
        create: {
            anime_mal_id: anime_mal_id,
            user_email: user_email,
            rating: rating,
            anime_title: anime_title
        },
    })
    
    if (!createRating) return Response.json({ status: 500, isCreated: false })
    else return Response.json({ status: 200, isCreated: true })
}
