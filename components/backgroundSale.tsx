import Image from "next/image"
import useSWR from "swr"
import { ShopBackgrounds } from "../lib/types"
import { ScrollArea, Viewport, Scrollbar, Thumb, Corner } from "../components/scrollArea"
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
                    <div className="h-80">
                        <ScrollArea className="h-full pt-3">
                            <Viewport className="h-full before:h-72 before:absolute before:bg-white/40 before:top-3 before:left-0 before:w-[1px] before:z-10 after:h-72 after:absolute after:bg-white/40 after:top-3 after:right-0 after:w-[1px] before:after:bg-red-500">
                                <div className="flex h-full">
                                    {collection.backgrounds.map((background) => (
                                        <div key={background.id} className="flex mx-2 h-72 min-w-fit p-2 border-r-[1px] last:border-0 border-white/20">
                                            <div className="relative aspect-square h-full">
                                                <Image
                                                    className="max-h-full max-w-full"
                                                    src={background.image}
                                                    alt={background.name}
                                                    layout="fill"
                                                />
                                            </div>
                                            <div className="mx-2 flex flex-col justify-between">
                                                <div className="w-36">
                                                    <p className="text-lg text-sky-400 font-medium">{background.name}</p>
                                                    <p className="text-sm text-indigo-300">{background.description}</p>
                                                </div>
{/*                                                 <div className="w-full">
                                                    <div className="text-right">
                                                        <p>XXX coins</p>
                                                    </div>
                                                    <button className="w-full h-12 bg-green-400 rounded-full">Buy</button>
                                                </div>
 */}                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Viewport>
                            <Scrollbar orientation="horizontal" forceMount={true}>
                                <Thumb />
                            </Scrollbar>
                        </ScrollArea>
                    </div>
                    {/* {collection.backgrounds.map((background) => (
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
                    ))} */}
                </div>
            ))}
        </>
    )
}