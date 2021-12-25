import Link from "next/link"
import Header from "../components/header"
import Center from "../components/center"

export default function Page() {
    return (
        <>
            <div className="bg-gradient-to-br from-emerald-400 to-blue-400 dark:from-emerald-700 dark:to-blue-700 h-screen">
                <Header />
                <Center>
                    <h1 className="text-9xl" >404</h1>
                    <Link href="/">
                        <a>
                            <button className="btn btn-primary italic">Take me home, country roads</button>
                        </a>
                    </Link>
                </Center>
            </div>
        </>
    )
}