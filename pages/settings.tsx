import Header from "../components/header"
import Footer from "../components/footer"
import Image from "next/image"
import Head from "next/head"

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | Dunhammer</title>
      </Head>

      <Header />
      <main className="section-container">
        <section className="pt-20 w-full h-full text-white flex pr-[18px]">
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
          <div className="m-8 rounded-2xl sticky w-full bg-black/50 flex justify-center items-center">
            <div className="m-2 bg-black">
              what
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}