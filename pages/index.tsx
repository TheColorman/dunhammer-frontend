import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Header from "../components/header"
import Alert from "../components/alert"
import styles from "../styles/Home.module.css"
import Footer from "../components/footer"

const Home: NextPage = () => {
  const router = useRouter()
  const query = router.query

  return (
    <>
      <Head>
        <title>Dunhammer</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <div className="section-container">
            <section className="section">
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
                    <button className="btn btn-secondary">Dashboard</button>
                  </a>
                </Link>
              </div>
              <div className="mt-2 mb-8">
                <p className="text-gray-500 dark:text-gray-300">
                  Need help? Check out the{" "}
                  <Link href="/docs">
                    <a>documentation</a>
                  </Link>
                  .
                </p>
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
            <section className="section bg-black bg-opacity-50">
              <div className="absolute w-5/6 h-5/6 bg-black/50 hover:bg-black/60 transition-all rounded-3xl flex justify-center items-center">
                <span className="text-white text-2xl text-center">
                  Coming soon: <br />Interactive Global Leaderboard
                </span>
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
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Home