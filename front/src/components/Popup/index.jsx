import { useContext } from "react"
import NewFileForm from "../NewFileForm"
import NewFolderForm from "../NewFolderForm"
import { UiContext } from "../../context/UiContext"
import Stats from "../Stats"
import RenameForm from "../RenameForm"

export default function Popup() {
  const { popup, setPopup } = useContext(UiContext)

  return (
    <div
      className="absolute left-0 top-0 z-20 flex  h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={(e) => {
        e.currentTarget === e.target ? setPopup(``) : null
      }}
    >
      <div className="rounded-xl bg-white p-8 shadow-xl shadow-slate-500">
        {popup === `new file` ? (
          <NewFileForm />
        ) : popup === `new folder` ? (
          <NewFolderForm />
        ) : popup === `stats` ? (
          <Stats />
        ) : popup === `rename` ? (
          <RenameForm />
        ) : (
          popup
        )}
      </div>
    </div>
  )
}
