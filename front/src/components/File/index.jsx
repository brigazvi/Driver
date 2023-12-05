import { useContext } from "react"
import { UiContext } from "../../context/UiContext"
import { FilesContext } from "../../context/FilesContext"
import axios from "axios"
import FileIcon from "../FileIcon"

export default function File({ obj }) {
  const { setRefresher, currentPath } = useContext(FilesContext)
  const {
    setStats,
    setPopup,
    setContextMenu,
    setContextMenuPosition,
    setContextMenuFunctions,
    setExpandContextMenu,
  } = useContext(UiContext)
  const closeContextMenu = () => {
    setExpandContextMenu(false)
    setTimeout(() => {
      setContextMenu(``)
    }, 150)
  }
  const deleteFile = () => {
    closeContextMenu()
    axios.delete(`http://localhost:1948/?path=${currentPath}${obj.title}`).then((res) => {
      setRefresher((prev) => !prev)
    })
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

  const download = () => {
    closeContextMenu()
    try {
      axios
        .get(`http://localhost:1948/download?path=${obj.path.slice(0, -1)}`, {
          responseType: `blob`,
        })
        .then((res) => {
          // Create a blob object from the file data
          const fileBlob = new Blob([res.data], { type: res.headers["content-type"] })

          // Trigger the file download in the browser
          const fileUrl = URL.createObjectURL(fileBlob)
          const link = document.createElement("a")
          link.href = fileUrl
          link.setAttribute("download", obj.title)
          document.body.appendChild(link)
          link.click()
        })
    } catch (error) {
      console.error("Error:", error)
    }
  }
  return (
    <button
      className="p-3 bg-white rounded-md shadow-sm flex gap-1 items-center outline outline-transparent hover:outline-2 hover:outline-blue-600"
      onAuxClick={(e) => {
        e.stopPropagation()
        setContextMenuFunctions({
          deleteFile,
          showStats,
          rename,
          download,
        })
        setContextMenu(`file`)
        setContextMenuPosition({ x: e.pageX, y: e.pageY })
        setExpandContextMenu(true)
      }}
      onDoubleClick={showStats}
    >
      <span className="text-blue-600 flex items-center justify-center">
        <FileIcon ext={obj.title.slice(obj.title.indexOf(`.`) + 1)} />
      </span>
      {obj.title.slice(0, obj.title.indexOf(`.`))}
    </button>
  )
}
