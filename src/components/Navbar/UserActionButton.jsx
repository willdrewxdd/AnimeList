import Link from "next/link"
import {authUserSession} from "@/libs/auth-libs"


export const UserActionButton = async() => {
    const user = await authUserSession();
    const actionLabel = user ? "Sign Out" : "Sign In"
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"

    return (
        <div className="flex justify-between gap-2">
            {
                user ? <Link href="/user/dashboard" className="py-1">Dashboard</Link> : null
            }
            <Link href={actionURL} className="bg-dark text-accent py-1 px-12 inline-block">{actionLabel}</Link>
        </div>
    )
}

export default UserActionButton