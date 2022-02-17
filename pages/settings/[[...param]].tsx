import Header from "../../components/header"
import Footer from "../../components/footer"
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"

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

export default function Settings() {
  const router = useRouter()
  const param = router.query.param as string[] | undefined

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
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                return i == 0 ? (
                  <li key={i} className="my-3 w-[72px] h-[72px] border-4 border-pink-500 rounded-full">
                    <Image
                      src="/images/icon.svg"
                      alt="Dunhammer Logo"
                      width={64}
                      height={64}
                    />
                  </li>
                ) : (
                  <li key={i} className="my-3 w-16 h-16">
                    <Image
                      src="/images/icon.svg"
                      alt="Dunhammer Logo"
                      width={64}
                      height={64}
                    />
                  </li>
                )
              })}
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