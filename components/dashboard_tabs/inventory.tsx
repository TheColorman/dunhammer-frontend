import Image from "next/image"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { APIUser } from "../../lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Inventory() {
  const { data, status } = useSession()
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
      <div className="h-full w-full flex">
        {dbUser.backgrounds.map((background) => (
          <div
            key={background.id}
            className="w-1/3 h-full flex justify-center items-center pr-3 last:pr-0 text-center"
          >
            <div className="w-full h-full flex flex-col relative">
              <Image
                src={background.image}
                width={128}
                height={128}
                alt={background.name}
              />

              <h3 className="text-base absolute left-1/2 -translate-x-1/2 bottom-2 w-max">{background.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}