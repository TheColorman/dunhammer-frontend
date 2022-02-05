import Image from "next/image"
import useSWR from "swr"
import { APIUser, BackgroundsBuyResponse, ShopBackground, ShopBackgrounds } from "../../lib/types"
import { ScrollArea, Viewport, Scrollbar, Thumb } from "../radix/scrollArea"
import { Dialog, Trigger, Portal, Overlay, Content, Close, Title, Description } from "../radix/dialog"
import { ReactNode } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const BuyDialog = ({ trigger, background, user }: { trigger: ReactNode, background: ShopBackground, user: APIUser | undefined }) => (
  <Dialog>
    {trigger}
    <Portal>
      <Overlay />
      <Content className="p-4">
        <Title className="text-2xl mb-2">{background.name}</Title>
        <Description className="text-base mt-0 hidden">Buy background</Description>
        <Close>
          <button className="text-white/60 hover:bg-fuchsia-900/30 rounded-full p-[2px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Close>
        <div className="flex flex-col mt-4 mr-1"> {/* why the fuck do I need to add 4px of margin to the right. there's supposed to be equal padding around the whole box. why does this happen. */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square h-full">
              <Image
                src={background.image}
                width={512}
                height={512}
                alt={"Background"}
              />
            </div>
            <div className="relative aspect-square h-full">
              <Image
                src={background.thumbnail}
                width={512}
                height={512}
                alt={"Background"}
              />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm italic">{background.description}</p>
            <div className="mt-4 flex justify-between">
              <p className="text-base">
                You currently have{" "}
                <span className="text-yellow-500 inline-flex items-baseline">
                  <span className="self-center w-5 h-5">
                    <Image
                      src="/images/DunhammerCoin.png"
                      alt="Dunhammer Coin"
                      width={16}
                      height={16}
                    />
                  </span>
                  {user?.coins ?? "?"}
                </span>
                .<br />This background costs{" "}
                <span className="text-yellow-500 inline-flex items-baseline">
                  <span className="self-center w-5 h-5">
                    <Image
                      src="/images/DunhammerCoin.png"
                      alt="Dunhammer Coin"
                      width={16}
                      height={16}
                    />
                  </span>
                  {background.price}
                </span>
                .
              </p>
              <button
                className="relative w-36 h-12 rounded-full bg-gradient-to-br from-[#4b7d34] via-[#347d39] to-[#34747d] hover:from-[#669546] hover:via-[#46954a] hover:to-[#469581] transition-colors"
                onClick={() => {
                  fetch(`/api/shop/backgrounds/buy?id=${background.id}`)
                    .then((res) => res.json())
                    .then((res: BackgroundsBuyResponse) => {
                      if (res.success) {
                        const element = document.getElementById("buySuccess")
                        if (element) {
                          element.innerText = "Successfully bought background!"
                          // Reload after 1 second
                          setTimeout(() => {
                            window.location.reload()
                          }, 1000)
                        }
                      }
                      if (res.error) {
                        const element = document.getElementById("buyError")
                        if (element) {
                          element.innerText = res.error
                        }
                      }
                    })
                }}
              >
                <span className="absolute -top-5 right-0 w-max text-green-500 text-xs" id="buySuccess"></span>
                <span className="absolute -top-5 right-0 w-max text-red-500 text-xs" id="buyError"></span>
                <span className="text-xl font-semibold">Buy</span>
              </button>
            </div>
          </div>
        </div>
      </Content>
    </Portal>
  </Dialog >
)

export default function Backgrounds() {
  const { data: backgroundApiData, error: apiError } = useSWR('/api/shop/background', fetcher)
  const { data: userApiData } = useSWR('/api/user', fetcher)
  const error = apiError || backgroundApiData?.error

  if (error) return <h1 className="text-lg">Failed to load shop information</h1>
  if (!backgroundApiData) return (
    <div className="flex flex-row items-baseline">
      <div className="spinner" role="status">
        <span className="hidden">Loading...</span>
      </div>
    </div>
  )
  const bgData = backgroundApiData as ShopBackgrounds
  const userData = userApiData as APIUser | undefined

  return (
    <>
      {bgData.collections.length === 0 && (
        <p className="text-lg">No backgrounds on sale!</p>
      )}
      {bgData.collections.map((collection) => (
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
                        <div className="w-full h-24 rounded-3xl bg-black/40 shadow-lg">
                          {userData && userData.backgrounds.find((bg) => bg.id === background.id) && (
                            <div className="w-full h-full grid grid-rows-5">
                              <div className="row-span-2 flex items-center justify-center">
                                <span className="text-sm text-slate-400">
                                  Owned by you
                                </span>
                              </div>
                              <button className="row-span-3 h-full rounded-b-3xl bg-gradient-to-br from-[#4b7d34] via-[#347d39] to-[#34747d] transition-colors hover:cursor-not-allowed opacity-50">
                                <span className="text-xl font-semibold text-slate-300">Bought</span>
                              </button>
                            </div>
                          )}
                          {!userData || !userData.backgrounds.find((bg) => bg.id === background.id) && background.price !== null && (
                            <BuyDialog
                              trigger={(
                                <Trigger className="w-full h-full grid grid-rows-5">
                                  <div className="row-span-2 h-full flex items-center justify-center">
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
                                  <button className="row-span-3 h-full rounded-b-3xl bg-gradient-to-br from-[#4b7d34] via-[#347d39] to-[#34747d] hover:from-[#669546] hover:via-[#46954a] hover:to-[#469581] transition-colors">
                                    <span className="text-xl font-semibold text-slate-100">Buy</span>
                                  </button>
                                </Trigger>
                              )}
                              background={background}
                              user={userData}
                            />
                          )}
                          {background.price === null && (
                            <div className="w-full h-full grid grid-rows-5">
                              <div className="row-span-2 flex items-center justify-center">
                                <span className="text-sm text-slate-400">
                                  Limited
                                </span>
                              </div>
                              <button className="row-span-3 rounded-b-3xl bg-gradient-to-br from-[#7d3458] via-[#7d3434] to-[#7d4f34] transition-colors hover:cursor-not-allowed">
                                <span className="text-xl font-semibold text-slate-100">Not for sale</span>
                              </button>
                            </div>
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