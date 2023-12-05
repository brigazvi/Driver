import { useContext, useEffect, useState } from "react"
import Files from "./Files"
import Folders from "./Folders"
import { FilesContext } from "../../context/FilesContext"
import axios from "axios"
import { UiContext } from "../../context/UiContext"
import FileIcon from "../../components/FileIcon"
import { sorter } from "../../functions/sorter"

export default function Viewer() {
  const {
    popup,
    setContextMenu,
    setContextMenuPosition,
    expandContextMenu,
    setExpandContextMenu,
    setContextMenuFunctions,
  } = useContext(UiContext)
  const { refresher, setRefresher, currentPath, setCurrentPath, sortAlgorithm, setSortAlgorithm } =
    useContext(FilesContext)
  const [items, setItems] = useState([])
  const folders = items.filter((v) => v.isDir)
  const files = items.filter((v) => !v.isDir)
  useEffect(() => {
    axios.get(`http://localhost:1948/?path=${currentPath}`).then((res) => {
      console.log(`successful connection`)
      const list = sorter(res.data, sortAlgorithm)
      console.log(list)
      setItems(list)
    })
  }, [currentPath, refresher])
  return (
    <div
      className="grow p-5 overflow-scroll"
      onAuxClick={(e) => {
        console.log(e.currentTarget, e.target)
        // if (e.currentTarget === e.target) {
        setExpandContextMenu(true)
        setContextMenuFunctions({})
        setContextMenuPosition({ x: e.pageX, y: e.pageY })
        setContextMenu(`empty`)
        // }
      }}
    >
      {folders.length > 0 && <Folders list={folders} />}
      {folders.length > 0 && files.length > 0 && (
        <hr className="my-6 border-2 border-black border-opacity-10" />
      )}
      {files.length > 0 && <Files list={files} />}
      {items.length === 0 && <div>this is an empty folder</div>}
    </div>
  )
}
