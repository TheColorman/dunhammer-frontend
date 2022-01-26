import { ReactNode } from "react"
import Center from "../components/center"
import Footer from "../components/footer"
import Header from "../components/header"
import * as ScrollAreaP from "@radix-ui/react-scroll-area"

function Tag({ children }: { children: ReactNode }) {
    return (
        <div className="w-12 bg-pink-900 text-sm leading-5 mt-[10] border-t-2 border-t-pink-800 pt-[10] mx-2">{children}</div>
    )
}

const TAGS = Array.from({ length: 10 }).map((_, i, a) => `Tag ${i + 1}`)

export default function test() {
    return (
        <>
            <Header />
            <Center>
                <div className="text-center w-4/5">
                    <h1 className="text-2xl font-bold">
                        Welcome to the test page. <br />
                        You&apos;re not supposed to be here, but why not enjoy your stay?
                    </h1>
                    <p className="text-lg">
                        <br />This page is for testing various elements of the website, such as components, styles, and such.
                    </p>
                </div>
            </Center>
            <div className="flex items-center justify-center my-16 bottom-10 h-96">
                <ScrollAreaP.Root className="border-black border-2 w-32 h-32 overflow-hidden" scrollHideDelay={100000000}>
                    <ScrollAreaP.Viewport className="w-72 h-full">
                        <div className="flex">
                            {TAGS.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </div>
                        <div>
                            {TAGS.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </div>
                    </ScrollAreaP.Viewport>
                    <ScrollAreaP.Scrollbar className="bg-white right-0 w-3">
                        <ScrollAreaP.Thumb className="bg-black right-0 w-3" />
                    </ScrollAreaP.Scrollbar>
                    <ScrollAreaP.Scrollbar className="bg-white bottom-0 h-3" orientation="horizontal">
                        <ScrollAreaP.Thumb className="flex-1 bg-black h-3" style={{height: "0.75rem"}} />
                    </ScrollAreaP.Scrollbar>
                    <ScrollAreaP.Corner />
                </ScrollAreaP.Root>
            </div>
            <Footer />
        </>
    )
}