import Image from "next/image"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { APIUser } from "../../lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Inventory() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const { data: apiData, error, mutate } = useSWR("/api/user", fetcher)
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