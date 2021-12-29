import Image from "next/image"
import useSWR from "swr"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import Header from "../components/header"
import Center from "../components/center"
import Footer from "../components/footer"
import { dbUser, ExtendedSession } from "../lib/types.d"

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const getLevel = (xp: number) => (((Math.pow(8100 * xp + 300 * Math.sqrt(729 * xp * xp + 61613700), 1 / 3)) / 30) - (590) / Math.pow((8100 * xp + 300 * Math.sqrt(729 * xp * xp + 61613700)), 1 / 3))
const getXp = (level: number) => 5 * (118 * level + 2 * level * level * level) / 6

export default function Dashboard() {
    const { data, status } = useSession()
    const loading = status === 'loading'
    const session = data as ExtendedSession

    const { data: apiData, error } = useSWR('/api/user', fetcher)
    const dbUserLoading = !apiData
    if (loading || dbUserLoading) return (
        <>
            <Header />
            <Center>
                <div className="spinner" role="status">
                    <span className="hidden">Loading...</span>
                </div>
            </Center>
        </>
    )
    const dbUser = apiData as dbUser

    console.log("dbUser:")
    console.log(dbUser)

    const currentLevel = Math.ceil(getLevel(dbUser?.xp ?? 0))
    const xpForNextLevel = getXp(currentLevel + 1) - getXp(currentLevel)
    const xpForCurrentLevel = dbUser?.xp ?? 0 - getXp(currentLevel)
    const percentage = xpForCurrentLevel / xpForNextLevel


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

    if (error) return (
        <>
            <Header />
            <Center>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        An error occurred!
                    </h1>
                    <p className="text-lg">
                        {error.message}
                    </p>
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
                    <h1 className="text-sm break-all">
                        {JSON.stringify(dbUser)}
                    </h1>
                    <p className="text-sm">
                        Username: {dbUser.username}
                    </p>
                    <div className="flex flex-row items-end">
                        <div className="mt-4 w-80 bg-black bg-opacity-20 h-5 rounded-full shadow-lg">
                            <div className="bg-lime-600 h-5 rounded-full" style={{
                                width: `${percentage}%`
                            }}></div>
                        </div>
                        <div>
                            <p className="ml-2 text-yellow-500">
                                +{(currentLevel + 1) * 10} coins <Image
                                    className="inline-block"
                                    src="/images/DunhammerCoin.png"
                                    alt="Dunhammer Coin"
                                    width={16}
                                    height={16}
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}