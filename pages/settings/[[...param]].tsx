import Header from "../../components/header"
import Footer from "../../components/footer"
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import useSWR from "swr"
import { APIGuildsFull, DSGuildExt, ExtendedSession } from "../../lib/types"
import { signIn, useSession } from "next-auth/react"
import Center from "../../components/center"
import Link from "next/link"
import { Switch, Thumb } from "../../components/radix/switch"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function ProfileSettings({ session }: { session: ExtendedSession }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-4 items-center">
        <p className="text-lg">Levelup mentions: </p>
        <Switch
          className="bg-black w-8 h-6 rounded-full z-0"
        >
          <Thumb
            className="bg-white w-8 h-8 rounded-full z-50"
          />
        </Switch>
      </div>
    </div>
  )
}

function ServerSettings({ guild, isGuildManager }: { guild: DSGuildExt | undefined, isGuildManager: boolean | undefined }) {
  if (!guild) {
    return (
      <h1 className="text-xl">Guild not found</h1>
    )
  }

  if (!isGuildManager) {
    return (
      <>
        <h1 className="text-xl">You do not have the Manage Server permission.</h1>
        <p className="text-lg">Only Server Managers can change Dunhammer settings.</p>
      </>
    )
  }

  return (
    <></>
  )
}

function ServerList({ apiGuilds }: { apiGuilds: DSGuildExt[] }) {
  const passedGuilds = apiGuilds.filter(guild => guild.hasDunhammer || guild.permissions && (BigInt(guild.permissions) & BigInt(0x20)) == BigInt(0x20)) // 0x20 = Guilds.MANAGE_GUILD
  return (
    <>
      {passedGuilds.map((guild, index) => (
        <li key={index} className="my-3 w-16 h-16 relative rounded-full overflow-hidden">
          <Link href={`/settings/${guild.id}`}>
            <a className="hover:no-underline">
              {guild.icon ? (
                <Image
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("a_") ? "gif" : "jpg"}`}
                  alt={guild.name}
                  width={64}
                  height={64}
                  className="absolute inset-0"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <p className="text-xl">
                    {guild.name.split(" ").map((word) => word[0]).join("")}
                  </p>
                </div>
              )}
            </a>
          </Link>
        </li>
      ))
      }
    </>
  )
}

export default function Settings() {
  const router = useRouter()
  const param = router.query.param as string[] | undefined

  // Inital load
  const { data, status } = useSession()
  const sessionIsLoading = status === 'loading'
  const session = data as ExtendedSession

  const { data: apiResGuilds, error: apiErrGuilds, mutate } = useSWR('/api/user/guilds?full=true', fetcher)
  const apiGuilds = apiResGuilds as APIGuildsFull | undefined
  const guildsAreLoading = !apiGuilds
  const guildsHaveError = (apiGuilds && "error" in apiGuilds) || apiErrGuilds
  // Loading
  if (sessionIsLoading || guildsAreLoading) {
    return (
      <Center>
        <div className="spinner" role="status">
          <span className="hidden">Loading...</span>
        </div>
      </Center>
    )
  }
  if ("status" in apiGuilds && apiGuilds.status === 429 && apiGuilds.retry_after) {
    console.log(apiGuilds)
    setTimeout(() => {
      mutate()
    }, apiGuilds.retry_after * 1000 + 100)
    return (
      <Center>
        <div className="spinner" role="status">
          <span className="hidden">Loading...</span>
        </div>
      </Center>
    )
  }
  // Not logged in
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
  // Error
  if (guildsHaveError) {
    return (
      <div>
        <h1>Oops, looks like something went wrong</h1>
        <p>{"error" in apiGuilds ? apiGuilds.error : "An unknown error occured."}</p>
        <p className="text-xs">(Try reloading, that might help)</p>
      </div>
    )
  }

  // Settings
  const isGuild = param && param.length === 1
  const guildId = isGuild ? param[0] : undefined
  const selectedGuild = guildId ? apiGuilds.find(guild => guild.id === guildId) : undefined
  const isGuildManager = (selectedGuild && selectedGuild.permissions) ? (BigInt(selectedGuild.permissions) & BigInt(0x20)) == BigInt(0x20) : undefined

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
              <li className="w-16 h-16 relative overflow-hidden border-b border-gray-600 pb-[4.7rem]">
                <Link href={`/settings`}>
                  <a>
                    <Image
                      src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                      alt={session.user.name ?? "User"}
                      width={64}
                      height={64}
                      className="absolute inset-0 rounded-full"
                    />
                  </a>
                </Link>
              </li>

              <ServerList apiGuilds={apiGuilds} />
            </ul>
          </div>
          <div className="m-8 w-full rounded-2xl bg-black/50 flex flex-col items-center py-10">
            {isGuild ? (
              <ServerSettings guild={selectedGuild} isGuildManager={isGuildManager} />
            ) : (
              <ProfileSettings session={session} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}