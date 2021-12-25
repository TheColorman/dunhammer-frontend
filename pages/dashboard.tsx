import Image from "next/image"
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Header from "../components/header";
import Center from "../components/center";

export default function Dashboard() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    if (loading) return (
        <>
            <Header />
            <Center>
                <div className="spinner" role="status">
                    <span className="hidden">Loading...</span>
                </div>
            </Center>
        </>
    )
    if (!session) return (
        <>
            <Header />
            {/* Notify User that they're not logged in */}
            <Center>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        You&apos;re not signed in!
                    </h1>
                    <p className="text-lg">
                        Please sign in to view this page.
                    </p>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => signIn("discord")}
                        >
                        Sign in with Discord
                    </button>
                </div>
            </Center>
        </>
    )

    return (
        <>
            <Header />
            <div className="w-screen flex flex-col items-center pt-36 max-h-full">
                <div>
                <Image
                    src={session.user?.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                    alt="User Avatar"
                    width={128}
                    height={128}
                    className="mt-8"
                />
                </div>
            </div>
        </>
    )
}