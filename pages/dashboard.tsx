import Image from "next/image"
import Head from "next/head"
import useSWR from "swr"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import * as Tabs from "@radix-ui/react-tabs"
import Header from "../components/header"
import Center from "../components/center"
import Footer from "../components/footer"
import XPChart from "../components/xpchart"
import BackgroundSale from "../components/backgroundSale"
import { DBUser, ExtendedSession } from "../lib/types.d"

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

    const dbUser = apiData as DBUser

    const currentLevel = Math.floor(getLevel(dbUser.xp))
    const xpForNextLevel = getXp(currentLevel + 1) - getXp(currentLevel)
    const xpForCurrentLevel = dbUser.xp - getXp(currentLevel)
    const percentage = (xpForCurrentLevel / xpForNextLevel) * 100


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

    if (error || apiData.error) return (
        <>
            <Header />
            <Center>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        An error occurred!
                    </h1>
                    <p className="text-lg">
                        {error ?? apiData.error}
                    </p>
                </div>
            </Center>
        </>

    )
    
    return (
        <>
            <Head>
                <title>Dashboard | Dunhammer</title>
            </Head>

            <div className="flex flex-col min-h-screen">
                <header>
                    <Header />
                </header>
                <main className="flex-grow">
                    <div className="section-container">
                        <div className="pt-36 flex justify-center">
                            <div className="card max-w-full">
                                <div>
                                    <Image
                                        src={session.user?.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                                        alt="User Avatar"
                                        width={128}
                                        height={128}
                                        className="mt-8 rounded-full"
                                    />
                                </div>
                                {session.user && (
                                    <h1 className="text-2xl">{session.user.name}<span className="text-xl text-gray-300">#{session.user.discriminator}</span></h1>
                                )}
                                <div className="w-full mt-4 flex justify-between">
                                    <p>Level {currentLevel}</p>
                                </div>
                                <div className="flex flex-row items-end">
                                    <div className="w-80 bg-black bg-opacity-20 h-5 rounded-full shadow-lg relative flex items-center justify-center">
                                        <p className="absolute z-10 font-bold text-white shadow-md">{xpForCurrentLevel}/{xpForNextLevel} xp</p>
                                        <div className="bg-lime-600 h-5 rounded-full absolute top-0 left-0 shadow-md" style={{
                                            width: `${percentage}%`
                                        }} />
                                    </div>
                                    <div>
                                        <p className="ml-2 text-yellow-500 inline-flex items-baseline">
                                            +{(currentLevel + 1) * 10} coins
                                            <div className="self-center w-5 h-5 ml-1">
                                                <Image
                                                    className="inline-block w-4 h-4"
                                                    src="/images/DunhammerCoin.png"
                                                    alt="Dunhammer Coin"
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 w-full relative">
                                    <XPChart className="blur bg-black bg-opacity-30 opacity-80" />
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                        <h1 className="text-lg">Coming soon: xp graph</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full border-t-2 border-black border-opacity-30 mt-12">
                            <div className="py-16 mx-16 lg:mx-32 2xl:mx-96">
                                <Tabs.Root defaultValue="backgrounds" className="tabsContainer">
                                    <div className="tabsListContainer">
                                        <Tabs.List className="rounded-tl-xl rounded-br-xl bg-black bg-opacity-30 w-max">
                                            <Tabs.Trigger className="tabsTrigger rounded-tl-xl border-r border-gray-800/80" value="inventory"><h1 className="text-lg">Inventory</h1></Tabs.Trigger>
                                            <Tabs.Trigger className="tabsTrigger border-r border-gray-800/80" value="backgrounds"><h1 className="text-lg">Backgrounds</h1></Tabs.Trigger>
                                            <Tabs.Trigger className="tabsTrigger border-r border-gray-800/80" value="modules"><h1 className="text-lg">Modules</h1></Tabs.Trigger>
                                            <Tabs.Trigger className="tabsTrigger rounded-br-xl" value="roulette"><h1 className="text-lg">Roulette</h1></Tabs.Trigger>
                                        </Tabs.List>
                                    </div>
                                    <Tabs.Content value="inventory" className="tabsContent">
                                        <h1 className="text-xl">Inventory</h1>
                                    </Tabs.Content>
                                    <Tabs.Content value="backgrounds" className="tabsContent">
                                    <h1 className="text-xl">Background shop</h1>
                                    <BackgroundSale />
                                    </Tabs.Content>
                                    <Tabs.Content value="modules" className="tabsContent">
                                    <h1 className="text-xl">Module shop</h1>
                                    </Tabs.Content>
                                    <Tabs.Content value="roulette" className="tabsContent">
                                    <h1 className="text-xl">Roulette</h1>
                                    </Tabs.Content>
                                </Tabs.Root>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}