import Image from "next/image"
import useSWR from "swr"
import { ShopBackgrounds } from "../lib/types"
import { ScrollArea, Viewport, Scrollbar, Thumb } from "./scrollArea"
import { Dialog, Trigger, Portal, Overlay, Content, Close, Title, Description } from "./dialog"
import { ReactNode } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const BuyDialog = () => (
  <Dialog>
    <Trigger>
    </Trigger>
    <Portal>
      <Overlay />
      <Content>
        <Title>

        </Title>
        <Description>

        </Description>
        <Close>

        </Close>
      </Content>
    </Portal>
  </Dialog>
)

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
      {data.collections.length === 0 && (
        <p className="text-lg">No backgrounds on sale!</p>
      )}
      {data.collections.map((collection) => (
        <div key={collection.id} className="mt-2 mb-12 last:mb-0">
          <p className="text-lg">{collection.name}</p>
          <p className="text-base">{collection.description}</p>
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
                          <p className="text-sm text-indigo-300 italic">{background.description}</p>
                        </div>
                        <div className="w-full h-24 rounded-3xl bg-black/40 grid grid-rows-5 shadow-lg">
                          {background.price !== null && (
                            <>
                              <div className="row-span-2 flex items-center justify-center">
                                <span className="text-yellow-500 inline-flex text-xl">
                                  <div className="w-5 h-5">
                                    <Image
                                      src="/images/DunhammerCoin.png"
                                      alt="Dunhammer Coin"
                                      width={16}
                                      height={16}
                                    />
                                  </div>
                                  {background.price}
                                </span>
                              </div>
                              <button
                                className="row-span-3 rounded-b-3xl bg-gradient-to-br from-[#4b7d34] via-[#347d39] to-[#34747d] hover:from-[#669546] hover:via-[#46954a] hover:to-[#469581] transition-colors"
                                onClick={() => {
                                  
                                }}
                              >
                                <span className="text-xl font-semibold text-slate-100">Buy</span>
                              </button>
                            </>
                          )}
                          {background.price === null && (
                            <>
                              <div className="row-span-2 flex items-center justify-center">
                                <span className="text-sm text-slate-400">
                                  Limited
                                </span>
                              </div>
                              <button className="row-span-3 rounded-b-3xl bg-gradient-to-br from-[#7d3458] via-[#7d3434] to-[#7d4f34] hover:from-[#95466d] hover:via-[#954646] hover:to-[#956a46] transition-colors hover:cursor-not-allowed">
                                <span className="text-xl font-semibold text-slate-100">Not for sale</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Viewport>
              <Scrollbar orientation="horizontal" forceMount={true}>
                <Thumb />
              </Scrollbar>
            </ScrollArea>
          </div>
        </div>
      ))}
    </>
  )
}