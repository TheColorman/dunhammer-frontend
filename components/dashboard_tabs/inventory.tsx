import Image from "next/image"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { APIUser, ShopBackground } from "../../lib/types"
import { ReactNode } from "react"
import { Close, Content, Description, Dialog, Overlay, Portal, Title, Trigger } from "../radix/dialog"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SelectDialog = ({ trigger, background, user }: { trigger: ReactNode, background: ShopBackground, user: APIUser | undefined }) => (
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
        <div className="flex flex-col items-center">
          <Image
            src={background.image}
            alt={background.name}
            width={256}
            height={256}
          />
          <button
            className="mt-6 relative text-center rounded-3xl px-3 py-1 bg-gradient-to-br from-[#4b7d34] via-[#347d39] to-[#34747d] hover:from-[#669546] hover:via-[#46954a] hover:to-[#469581] transition-colors"
            onClick={() => {
              fetch(`/api/shop/backgrounds/select?id=${background.id}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    const element = document.getElementById("selectSuccess")
                    if (element) {
                      element.innerText = "Background selected!"
                    }
                    setTimeout(() => {
                      window.location.reload()
                    }, 1000)
                  }
                  if (data.error) {
                    console.log(data.error)
                    const element = document.getElementById("selectError")
                    if (element) {
                      element.innerText = data.error
                    }
                  }
                })
            }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-max text-green-500 text-xs" id="selectSuccess"></span>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-max text-red-500 text-xs" id="selectError"></span>
            <span className="text-xl font-semibold text-slate-100">
              Select
            </span>
          </button>
        </div>
      </Content>
    </Portal>
  </Dialog >

)

export default function Inventory() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const { data: apiData, error } = useSWR("/api/user", fetcher)
  const dbUserLoading = !apiData

  if (loading || dbUserLoading) {
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
      <div className="h-full w-full grid grid-flow-row-dense grid-cols-4 gap-3">
        {dbUser.backgrounds.map((background) => (
          <div
            key={background.id}
            className="aspect-square flex"
          >
            <SelectDialog background={background} user={dbUser} trigger={(
              <Trigger>
                {background.selected ? (
                  <div className="w-full h-full rounded-lg border-4 border-pink-600 flex justify-center text-center relative">
                    <Image
                      className="rounded-lg"
                      src={background.image}
                      alt={background.name}
                      width={512}
                      height={512}
                    />
                    <div className="pl-2 pt-1 bg-pink-600/80 rounded-tl-2xl absolute bottom-0 right-0">
                      <p className="text-sm text-white">Selected</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full">
                    <Image
                      className="rounded-lg"
                      src={background.image}
                      alt={background.name}
                      width={512}
                      height={512}
                    />
                  </div>
                )}
              </Trigger>
            )}
            />
          </div>
        ))}
      </div>
    </>
  )
}