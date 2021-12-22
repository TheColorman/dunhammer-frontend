import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    
    // Sticky banner with Dunhammer logo
    return (
        <div className="fixed top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 dark:border-gray-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-gray-900/75">
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
                            <div className="flex items-center border-l border-gray-200 ml-6 pl-6 dark:border-gray-800">
                                <div className="ml-6 block text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                    {!session && (
                                        <>
                                            <span className="sr-only">Sign in</span>
                                            <a
                                                href="/api/auth/signin"
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
                                    {session && (
                                        <>
                                            <span className="sr-only">Sign out</span>
                                            <a
                                                href="/api/auth/signout"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    signOut()
                                                }}
                                            >
                                                <button className="btn btn-primary">
                                                    Sign out
                                                </button>
                                            </a>
                                        </>
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
