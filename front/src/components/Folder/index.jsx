import { useContext } from "react"
import { FilesContext } from "../../context/FilesContext"
import axios from "axios"
import { UiContext } from "../../context/UiContext"
import FileIcon from "../FileIcon"

export default function Folder({ obj }) {
  const { setRefresher, currentPath, setCurrentPath } = useContext(FilesContext)
  const {
    setStats,
    setPopup,
    contextMenu,
    setContextMenu,
    setExpandContextMenu,
    setContextMenuPosition,
    setContextMenuFunctions,
  } = useContext(UiContext)
  const closeContextMenu = () => {
    setExpandContextMenu(false)
    setTimeout(() => {
      setContextMenu(``)
    }, 150)
  }
  const deleteFolder = () => {
    closeContextMenu()
    axios.delete(`http://localhost:1948/?path=${currentPath}${obj.title}`).then((res) => {
      if (res.data.includes(`directory not empty`)) {
        setPopup(`The directory is not empty`)
      }
      setRefresher((prev) => !prev)
    })
  }
  const openFolder = () => {
    setCurrentPath(obj.path)
    closeContextMenu()
  }
  const showStats = () => {
    setStats(obj)
    closeContextMenu()
    setPopup(`stats`)
  }
  const rename = () => {
    setStats(obj)
    closeContextMenu()
    setPopup(`rename`)
  }
  return (
    <button
      className="flex gap-1 rounded-md bg-white p-3 shadow-sm outline outline-transparent hover:outline-2 hover:outline-amber-500"
      onDoubleClick={openFolder}
      onAuxClick={(e) => {
        e.stopPropagation()
        setExpandContextMenu(true)
        setContextMenuFunctions({
          showStats,
          deleteFolder,
          openFolder,
          rename,
        })
        setContextMenuPosition({ x: e.pageX, y: e.pageY })
        setContextMenu(`folder`)
      }}
    >
      <span className="flex items-center justify-center text-amber-500">
        <FileIcon ext={`folder`} />
      </span>
      {obj.title}
    </button>
  )
}
