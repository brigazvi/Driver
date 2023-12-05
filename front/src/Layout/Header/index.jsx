import { useContext, useState } from "react"
import Popup from "../../components/Popup"
import { UiContext } from "../../context/UiContext"
import { FilesContext } from "../../context/FilesContext"

export default function Header() {
  const { popup, setPopup } = useContext(UiContext)
  const { setCurrentPath } = useContext(FilesContext)
  const openNewFolderPopup = () => {
    setPopup(`new folder`)
  }
  const openFileUploadPopup = () => {
    setPopup(`new file`)
  }
  return (
    <div className="p-5 flex justify-between items-center bg-white">
      <div
        className="text-5xl text-blue-600 font-black tracking-tighter cursor-pointer"
        onClick={() => {
          setCurrentPath(``)
        }}
      >
        📂Driver
      </div>
      <div className="flex md:gap-6">
        <button className="btn" onClick={openNewFolderPopup}>
          <span class="material-symbols-outlined">create_new_folder</span>
          <span className="disappearOnMobile">New Folder</span>
        </button>
        <button className="btn" onClick={openFileUploadPopup}>
          <span class="material-symbols-outlined">upload_file</span>
          <span className="disappearOnMobile">Upload File</span>
        </button>
        {popup.length > 0 && <Popup />}
      </div>
    </div>
  )
}
