import Image from "next/image"
import useSWR from "swr"
import { HoverCard, Arrow, Content, Trigger } from "../radix/hoverCard"
import type { ReactNode } from "react"
import type { APIUser, APIUserDBBackground } from "../../lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Card = ({ background, DynamicTrigger }: { background: APIUserDBBackground, DynamicTrigger: ReactNode }) => {
  return (
    <HoverCard>
      <Trigger>
        {DynamicTrigger}
      </Trigger>
      <Content className={background.selected ? "!bg-pink-800/80" : ""} side="top">
        <h1 className="text-lg">{background.name}</h1>
        <p className="text-sm">{background.description}</p>
        {(background.price === 0 || background.price) ? (
          <span className="text-yellow-500 inline-flex text-xs">
            <div className="w-5 h-5">
              <Image
                src="/images/DunhammerCoin.png"
                alt="Dunhammer Coin"
                width={14}
                height={14}
              />
            </div>
            {background.price}
          </span>
        ) : (
          <p className="text-yellow-500 italic text-xs">Unobtainable</p>
        )}
        <Arrow className={background.selected ? "!fill-pink-800/80" : ""} />
      </Content>
    </HoverCard>
  )
}

export default function Inventory() {

  const { data: apiData, error, mutate } = useSWR("/api/user", fetcher)
  const dbUserLoading = !apiData

  if (dbUserLoading) {
    return (
      <div className="w-full h-full flex justify-center content-center">
        <div className="spinner" role="status">
          <span className="hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center content-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Something went wrong!
          </h1>
          <p className="text-lg">
            Please try again later.
          </p>
        </div>
      </div>
    )
  }

  const dbUser = apiData as APIUser

  return (
    <>
      <p className="text-lg my-2">Owned backgrounds</p>
      <div className="h-full w-full grid grid-flow-row-dense grid-cols-4 gap-1">
        {dbUser.backgrounds.map((background) => (
          <div
            key={background.id}
            className="aspect-square flex"
          >
            {background.selected ? (
              <button>
                <div className="w-full h-full rounded-lg border-4 border-pink-600 bg-pink-600 flex justify-center text-center relative group">
                  <Image
                    className="rounded-lg"
                    src={background.image}
                    alt={background.name}
                    width={512}
                    height={512}
                  />
                  <div className="absolute top-0 left-0">
                    <Card
                      background={background}
                      DynamicTrigger={(
                        <div className="opacity-0 group-hover:opacity-100 transition-all pr-2 pl-1 pb-1 pt-[2px] bg-pink-600/80 rounded-br-2xl">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70 hover:text-white/100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    />
                  </div>
                  <div className="pl-2 pt-1 bg-pink-600/80 rounded-tl-2xl absolute bottom-0 right-0">
                    <p className="text-sm text-white">Selected</p>
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={async () => {
                  const res = await fetch(`/api/shop/backgrounds/select?id=${background.id}`)
                  if (res.status < 300) {
                    mutate()
                  }
                }}
              >
                <div className="h-full w-full border-4 border-transparent group relative">
                  <Image
                    className="rounded-lg"
                    src={background.image}
                    alt={background.name}
                    width={512}
                    height={512}
                  />
                  <div className="absolute top-0 left-0">
                    <Card
                      background={background}
                      DynamicTrigger={(
                        <div className="opacity-0 group-hover:opacity-100 transition-all p-1 pb-[6px] pr-[6px] bg-black/50 rounded-br-2xl rounded-tl-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40 hover:text-white/80" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}