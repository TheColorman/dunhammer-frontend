import Image from "next/image"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import Header from "../components/header"
import Center from "../components/center"
import Footer from "../components/footer"
import { ExtendedSession } from "../lib/types"
import { GetServerSideProps } from "next"

export default function Dashboard() {
    const { data, status } = useSession()
    const loading = status === 'loading'
    const session = data as ExtendedSession

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
            <div className="pt-36 flex justify-center">
                <div className="card">
                    <div>
                        <Image
                            src={session.user?.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                            alt="User Avatar"
                            width={128}
                            height={128}
                            className="mt-8"
                        />
                    </div>
                    {session.user && (
                        <h1 className="text-2xl">{session.user.name}<span className="text-xl text-gray-300">#{session.user.discriminator}</span></h1>
                    )}
                    <div className="flex flex-row items-end">
                        <div className="mt-4 w-80 bg-black bg-opacity-20 h-5 rounded-full shadow-lg">
                            <div className="bg-lime-600 h-5 w-[25%] rounded-full"></div>
                        </div>
                        <div>
                            <p className="ml-2 text-white">+100 coins</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}