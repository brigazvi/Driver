import { useContext, useRef, useState } from "react"
import { UiContext } from "../../context/UiContext"
import axios from "axios"
import { FilesContext } from "../../context/FilesContext"

export default function RenameForm() {
  const { stats, setPopup } = useContext(UiContext)
  const { setRefresher, currentPath } = useContext(FilesContext)
  const [newName, setNewName] = useState(stats.title)
  const rename = (e) => {
    e.preventDefault()
    axios
      .put(
        `http://localhost:1948/?path=${stats.path.slice(0, -1)}&newPath=${currentPath}${newName}`
      )
      .then((res) => {
        setRefresher((prev) => !prev)
        setPopup(``)
      })
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={rename}>
      <label>insert the new name:</label>
      <input
        className="input"
        type="text"
        name="newName"
        id="newName"
        autoFocus
        value={newName}
        onInput={(e) => setNewName(e.currentTarget.value)}
      />
      <button type="submit" className="btn">
        rename
      </button>
    </form>
  )
}
