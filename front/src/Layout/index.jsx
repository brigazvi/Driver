import { useContext } from "react"
import { UiContext } from "../context/UiContext"
import Header from "./Header"
import Viewer from "./Viewer"
import ContextMenu from "../components/ContextMenu"
import AddressBar from "./AdressBar"

export default function Layout() {
  const { contextMenu } = useContext(UiContext)
  return (
    <div
      className="h-screen w-screen flex flex-col font-sans"
      style={{
        backgroundImage: `radial-gradient(ellipse at 100% 100% , rgb(203 ,213 ,225, 0) 0%,  rgb(203 ,213 ,225,1) 70%), url("/background6.jpg")`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Header />
      <AddressBar />
      <Viewer />
      {/* {contextMenu.length > 0 &&  */}
      <ContextMenu />
      {/* } */}
    </div>
  )
}
