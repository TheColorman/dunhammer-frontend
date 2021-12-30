import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"
import useSWR from "swr";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Header() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    const { data: apiData } = useSWR('/api/user', fetcher)
    const dbUserLoading = !apiData
    const error = apiData?.error ?? null

    // Sticky banner with Dunhammer logo
    return (
        <div className="fixed top-0 z-40 w-screen backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 dark:border-gray-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-gray-900/75">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-gray-900/10 lg:px-8 lg:border-0 dark:border-gray-300/10 mx-4 lg:mx-0">
                    <div className="relative flex items-center">
                        <Link href="/">
                            <a className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto">
                                <span className="sr-only">
                                    Dunhammer Homepage
                                </span>
                                <div className="text-gray-900 dark:text-white w-auto h-8">
                                    <Image
                                        src="/images/icon.svg"
                                        alt="Dunhammer Logo"
                                        width={32}
                                        height={32}
                                    />
                                    <Image
                                        className="dark:invert pb-4"
                                        src="/images/dunhammer.svg"
                                        alt="Dunhammer Logo"
                                        width={221}
                                        height={32}
                                    />
                                </div>
                            </a>
                        </Link>
                        <div className="relative flex items-center ml-auto">
                            {!dbUserLoading && !error && (
                                <div className="rounded-full bg-black bg-opacity-30 flex py-1 px-2">
                                    <p className="text-yellow-500 inline-flex items-baseline">
                                        <div className="self-center w-5 h-5">
                                            <Image
                                                src="/images/DunhammerCoin.png"
                                                alt="Dunhammer Coin"
                                                width={16}
                                                height={16}
                                            />
                                        </div>
                                        {apiData.coins}
                                    </p>
                                    <Link
                                        href="/buy"
                                    >
                                        <a className="self-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-yellow-500 hover:text-yellow-300 hover:cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </Link>
                                </div>
                            )}
                            <div className="flex items-center border-l border-gray-200 ml-6 pl-6 dark:border-gray-800">
                                <div className="ml-6 mr-6 block">
                                    {loading && (
                                        <div className="flex flex-row items-baseline">
                                            <div className="spinner" role="status">
                                                <span className="hidden">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                    {!loading && !session && (
                                        <>
                                            <span className="sr-only">Sign in</span>
                                            <a
                                                /* href="/api/auth/signin" <- NextJS isn't allowing this despite the .preventDefault() method used below */
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    signIn("discord")
                                                }}
                                            >
                                                <button className="btn btn-primary">
                                                    Sign in with Discord
                                                </button>
                                            </a>
                                        </>
                                    )}
                                    {!loading && session && (
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger>
                                                <Image
                                                    className="rounded-full"
                                                    src={session.user?.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                                                    alt={session.user?.name ?? "User"}
                                                    width={32}
                                                    height={32}
                                                />
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content
                                                className="dropdownContent"
                                            >
                                                <DropdownMenu.Label
                                                    className="dropdownItem hover:cursor-default hover:bg-gray-900 text-white italic">
                                                    {session.user?.name}
                                                </DropdownMenu.Label>
                                                <DropdownMenu.Separator />
                                                <Link
                                                    href="/dashboard"
                                                >
                                                    <a>
                                                        <DropdownMenu.Item
                                                            className="dropdownItem"
                                                        >
                                                            Dashboard
                                                        </DropdownMenu.Item>
                                                    </a>
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                >
                                                    <a>
                                                        <DropdownMenu.Item
                                                            className="dropdownItem"
                                                        >
                                                            Settings
                                                        </DropdownMenu.Item>
                                                    </a>
                                                </Link>
                                                <a
                                                    /* href="/api/auth/signin" <- NextJS isn't allowing this despite the .preventDefault() method used below */
                                                    className="w-full h-full"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        signOut()
                                                    }}
                                                >
                                                    <DropdownMenu.Item
                                                        className="dropdownItem text-red-500"
                                                    >
                                                        Sign out
                                                    </DropdownMenu.Item>
                                                </a>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
