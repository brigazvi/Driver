import { useState } from "react"
import Layout from "./Layout"
import { FilesContext } from "./context/FilesContext"
import { UiContext } from "./context/UiContext"

function App() {
  const [currentPath, setCurrentPath] = useState(``)
  const [popup, setPopup] = useState(``)
  const [stats, setStats] = useState({})
  const [contextMenu, setContextMenu] = useState(``)
  const [expandContextMenu, setExpandContextMenu] = useState(false)
  const [sortAlgorithm, setSortAlgorithm] = useState(`namesAsc`)
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 20,
    y: 70,
  })
  const [contextMenuFunctions, setContextMenuFunctions] = useState({
    openFolder: () => {},
  })
  const [refresher, setRefresher] = useState(false)
  return (
    <>
      <UiContext.Provider
        value={{
          stats,
          setStats,

          popup,
          setPopup,
          contextMenu,
          setContextMenu,
          contextMenuPosition,
          setContextMenuPosition,
          contextMenuFunctions,
          setContextMenuFunctions,
          expandContextMenu,
          setExpandContextMenu,
        }}
      >
        <FilesContext.Provider
          value={{
            currentPath,
            setCurrentPath,
            sortAlgorithm,
            setSortAlgorithm,
            setRefresher,
            refresher,
          }}
        >
          <Layout />
        </FilesContext.Provider>
      </UiContext.Provider>
    </>
  )
}

export default App
