import Header from "../../components/header"
import Footer from "../../components/footer"
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import useSWR from "swr"
import { APIGuildsFull } from "../../lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function ProfileSettings() {
  return (
    <>
      <div className="flex w-1/2 justify-evenly">
        <p>Username: </p>
        <input type="text" placeholder="COOLERMAN" className="text-black" />
      </div>
    </>
  )
}

function ServerSettings() {
  return (
    <h5>There are no server settings lmao</h5>
  )
}

function ServerList() {
  const { data: apiResGuilds, error: apiErrGuilds, mutate } = useSWR('/api/user/guilds?full=true', fetcher)
  const apiGuilds = apiResGuilds as APIGuildsFull | undefined
  const guildsAreLoading = !apiGuilds
  const guildsHaveError = (apiGuilds && "error" in apiGuilds) || apiErrGuilds

  if (guildsAreLoading) {
    return (
      <div className="spinner" role="status">
        <span className="hidden">Loading...</span>
      </div>
    )
  }

  if ("status" in apiGuilds && apiGuilds.status === 429 && apiGuilds.retry_after) {
    console.log(apiGuilds)
    setTimeout(() => {
      mutate()
    }, apiGuilds.retry_after*1000+100)
    return (
      <div className="spinner" role="status">
        <span className="hidden">Loading...</span>
      </div>
    )
  }

  if (guildsHaveError) {
    return (
      <div>
        <h1>Oops, looks like something went wrong</h1>
        <p>{"error" in apiGuilds ? apiGuilds.error : "An unknown error occured."}</p>
        <p className="text-xs">(Try reloading, that might help)</p>
      </div>
    )
  }

  const passedGuilds = apiGuilds.filter(guild => guild.hasDunhammer || guild.permissions && (BigInt(guild.permissions) & BigInt(0x20)) == BigInt(0x20)) // 0x20 = Guilds.MANAGE_GUILD
  return (
    <>
      {passedGuilds.map((guild, index) => (
        <li key={index} className="my-3 w-16 h-16">
          <Image
            src={`https://cdn.discordapp.com/${guild.icon}.jpeg`}
            alt={guild.name}
            width={64}
            height={64}
          />
        </li>
      ))
      }
    </>
  )
}

export default function Settings() {
  const router = useRouter()
  const param = router.query.param as string[] | undefined

  const { data, status } = useSession()
  const sessionIsLoading = status === 'loading'
  const session = data as ExtendedSession

  if (sessionIsLoading) {
    return (
      <div className="spinner" role="status">
        <span className="hidden">Loading...</span>
      </div>
    )
  }

  if (!session) {
    return (
      <>
        <Head>
          <title>Dunhammer | Not signed in</title>
        </Head>
        <Header />
        {/* Notify User that they're not logged in */}
        <Center>
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              You&apos;re not signed in!
            </h1>
            <p className="text-lg">
              Please sign in to view this page.
            </p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => signIn("discord")}
            >
              Sign in with Discord
            </button>
          </div>
        </Center>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Settings | Dunhammer</title>
      </Head>

      <Header />
      <main className="section-container">
        <section className="pt-20 w-full h-full text-white flex pr-[18px] items-start">
          <div className="w-max bg-black/50 p-2">
            <ul className="p-2 flex flex-col items-center">
              <ServerList />
            </ul>
          </div>
          <div className="m-8 w-full rounded-2xl bg-black/50 flex flex-col items-center py-10">
            <ProfileSettings /> <br />
            <p>Param: {param ? "[" + param.join(", ") + "]" : "None!"}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}