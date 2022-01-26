import { ReactNode } from "react"
import Center from "../components/center"
import Footer from "../components/footer"
import Header from "../components/header"
import * as ScrollAreaP from "@radix-ui/react-scroll-area"
import { Dialog, Trigger, Portal, Overlay, Content, Close, Title, Description } from "../components/dialog"

function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="w-12 bg-pink-900 text-sm leading-5 mt-[10] border-t-2 border-t-pink-800 pt-[10] mx-2">{children}</div>
  )
}

const TAGS = Array.from({ length: 10 }).map((_, i, a) => `Tag ${i + 1}`)

const BuyDialog = () => (
  <Dialog>
    <Trigger>
      <button className="bg-pink-900 text-white font-bold py-2 px-4 rounded-full">
        Popup!
      </button>
    </Trigger>
    <Portal>
      <Overlay />
      <Content>
        <Close>
          <button className="text-white hover:bg-fuchsia-900 rounded-full p-[1px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Close>
        <Title className="m-4 text-2xl">I spent too long on this</Title>
        <Description className="mx-4 my-2 text-base">I should be working on the live version instead of the test version</Description>
        <div className="m-4 mt-0 grid grid-cols-1 grid-rows-2 gap-y-2">
          <div className="col-span-1 grid grid-cols-2 grid-rows-1">
            <div className="p-4 col-span-1 border-l-2 border-r-[1px] border-white/20 text-center hover:bg-white/10">
              <span className="text-base">Very</span>
            </div>
            <div className="p-4 col-span-1 border-r-2 border-l-[1px] border-white/20 text-center hover:bg-white/10">
              <span className="text-base">interesting</span>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-2 grid-rows-1">
            <div className="p-4 col-span-1 border-l-2 border-r-[1px] border-white/20 text-center hover:bg-white/10">
              <span className="text-base">Modal</span>
            </div>
            <div className="p-4 col-span-1 border-r-2 border-l-[1px] border-white/20 text-center hover:bg-white/10">
              <span className="text-base">Popup</span>
            </div>
          </div>
        </div>
      </Content>
    </Portal>
  </Dialog>
)

export default function test() {
  return (
    <>
      <Header />
      <Center>
        <div className="text-center w-4/5">
          <h1 className="text-2xl">
            Welcome to the test page. <br />
            You&apos;re not supposed to be here, but why not enjoy your stay?
          </h1>
          <p className="text-lg">
            <br />This page is for testing various elements of the website, such as components, styles, and such.
          </p>
        </div>
      </Center>
      <div className="flex items-center justify-center my-16 bottom-10 h-96">
        <ScrollAreaP.Root className="border-black border-2 w-32 h-32 overflow-hidden" scrollHideDelay={100000000}>
          <ScrollAreaP.Viewport className="w-72 h-full">
            <div className="flex">
              {TAGS.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div>
              {TAGS.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </ScrollAreaP.Viewport>
          <ScrollAreaP.Scrollbar className="bg-white right-0 w-3">
            <ScrollAreaP.Thumb className="bg-black right-0 w-3" />
          </ScrollAreaP.Scrollbar>
          <ScrollAreaP.Scrollbar className="bg-white bottom-0 h-3" orientation="horizontal">
            <ScrollAreaP.Thumb className="flex-1 bg-black h-3" style={{ height: "0.75rem" }} />
          </ScrollAreaP.Scrollbar>
          <ScrollAreaP.Corner />
        </ScrollAreaP.Root>
      </div>
      <div className="flex items-center justify-center my-16 bottom-10 h-96">
        <BuyDialog />
      </div>
      <Footer />
    </>
  )
}