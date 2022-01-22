import Image from "next/image"
import useSWR from "swr"
import { ShopBackgrounds } from "../lib/types"
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ReactNode } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function BackgroundSale() {
    const { data: apiData, error: apiError } = useSWR('/api/shop/background', fetcher)
    const error = apiError || apiData?.error

    if (error) return <h1 className="text-lg">Failed to load shop information</h1>
    if (!apiData) return (
        <div className="flex flex-row items-baseline">
            <div className="spinner" role="status">
                <span className="hidden">Loading...</span>
            </div>
        </div>
    )

    const data = apiData as ShopBackgrounds

    return (
        <>
            {data.collections.map((collection) => (
                <div key={collection.id}>
                    <h1 className="text-lg">{collection.name}</h1>
                    <h2 className="text-base">{collection.description}</h2>
                    <ScrollArea.Root>
                        <ScrollArea.Viewport>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                            <p>text here</p>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar orientation="vertical">
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Scrollbar orientation="horizontal">
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                        {collection.backgrounds.map((background) => (
                            <div key={background.id} className="card" style={{ alignItems: 'start' }}>
                                <Image
                                    src={background.image}
                                    alt="background"
                                    width={300}
                                    height={300}
                                />
                                <p className="text-base">{background.name}</p>
                                <p className="text-sm">{background.description}</p>
                                <div className="bg-black/50 rounded-b-3xl flex w-[calc(100%+4rem)] h-12 -ml-8 -mb-8 mt-4 items-center justify-between">
                                    <p className="text-yellow-500 ml-8 inline-flex items-baseline">{background.price}
                                        <div className="self-center w-5 h-5 ml-1">
                                            <Image
                                                src="/images/DunhammerCoin.png"
                                                alt="Dunhammer Coin"
                                                width={16}
                                                height={16}
                                            />
                                        </div>
                                    </p>
                                    <button className="bg-lime-600 text-white px-4 py-2 h-full rounded-br-3xl -mb-[2px] -mr-[2px] right-0">Buy</button>
                                </div>
                            </div>
                        ))}
                </div>
            ))}
        </>
    )
}