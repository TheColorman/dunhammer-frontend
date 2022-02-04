import Header from "../components/header"
import Center from "../components/center"
import Footer from "../components/footer"

export default function Docs() {
  return (
    <>
      <Header />
      <Center className="text-center">
        <h1 className="text-4xl">Welcome to the documentation</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sorry to dissapoint you, but the documentation is currently under
          construction.
        </p>
        <h2 className="text-3xl italic mt-24 text-opacity-30">Check back soon!</h2>
      </Center>
      <Footer />
    </>
  )
}