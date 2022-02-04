import Header from "../components/header"
import Center from "../components/center"
import Footer from "../components/footer"

export default function Settings() {
  return (
    <>
      <Header />
      <Center className="text-center">
        <h1 className="text-4xl">The settings page</h1>
        <p className="text-gray-600 dark:text-gray-400">
          You&apos;ll be able to change your settings soon enough.
        </p>
      </Center>
      <Footer />
    </>
  )
}