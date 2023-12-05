import axios from "axios"
import { useContext, useRef } from "react"
import { FilesContext } from "../../context/FilesContext"
import { UiContext } from "../../context/UiContext"

export default function NewFolderForm() {
  const { setRefresher, currentPath } = useContext(FilesContext)
  const { setPopup } = useContext(UiContext)
  const nameInput = useRef()
  const addFolder = (e) => {
    e.preventDefault()
    axios
      .post(
        `http://localhost:1948/folder?name=${nameInput.current.value}&path=${currentPath}`
      )
      .then((res) => {
        setRefresher((prev) => !prev)
        setPopup(``)
      })
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={addFolder}>
      <label htmlFor="name">name the new folder:</label>
      <input
        autoFocus
        type="text"
        name="name"
        id="name"
        className=" input "
        ref={nameInput}
      />
      <button className="btn">add folder</button>
    </form>
  )
}
