import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Header from "../components/header"
import Alert from "../components/alert"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const router = useRouter()
  const query = router.query

  return (
    <>
      <Head>
        <title>Dunhammer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <header>
        <Header />
        </header>

        <main className="flex-grow">
          <div className="snap-y section-container">
            <section className="snap-end h-[93vh]">
              <Image
                className="rounded-full"
                src="/images/dunhammer.jpg"
                alt="Dunhammer"
                width={200}
                height={200}
              />
              <h1 className="text-4xl mt-8">Dunhammer</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Dunhammer is a Discord bot. That&apos;s about it.
              </p>
              <div className="mt-8">
                <a
                  target="popup"
                  onClick={() => {
                    window.open(
                      "https://discord.com/api/oauth2/authorize?client_id=671681661296967680&permissions=378091728064&scope=bot%20applications.commands",
                      "popup",
                      "width=600,height=800"
                    );
                  }}
                >
                  <button className="btn btn-primary">
                    Add Dunhammer to your server
                  </button>
                </a>
              </div>
              <div className="mt-4">
                <Link href="/dashboard">
                  <a>
                    <button className="btn btn-primary">Dashboard</button>
                  </a>
                </Link>
              </div>
              {/* Shape thingy */}
              <div className={styles["custom-shape-divider-bottom-1640125492"]}>
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    className={styles["shape-fill"]}
                  ></path>
                </svg>
              </div>
            </section>
            <section className="snap-end relative bg-black bg-opacity-50">
              <div className="flex justify-evenly items-center">
                <div>
                  <Image
                    src="/images/level.jpg"
                    alt="Levelup"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="text-right w-1/2">
                  <h1>Levelsystem</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
                    omnis laudantium dolore temporibus accusamus cupiditate vel quis
                    culpa dicta laborum tenetur voluptate explicabo quibusdam
                    consectetur, exercitationem, autem quod ex rem!
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer>
          {query.error && (
            <Alert
            type="error"
            message={`A ${(query.error as string).toLowerCase()} error has occured.`}
            name="ERROR"
            />
          )}
        </footer>
      </div>
    </>
  )
}

export default Home