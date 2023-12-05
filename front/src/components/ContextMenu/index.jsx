import { useContext, useEffect, useRef, useState } from "react"
import { UiContext } from "../../context/UiContext"

export default function ContextMenu() {
  const {
    setPopup,
    contextMenu,
    setContextMenu,
    contextMenuPosition,
    setContextMenuPosition,
    contextMenuFunctions,
    expandContextMenu,
    setExpandContextMenu,
  } = useContext(UiContext)
  const ref = useRef(null)
  useEffect(() => {
    console.log(`context menu: `, contextMenu, `| expand: `, expandContextMenu)
    const handleClickOutside = (event) => {
      if (contextMenu.length > 0 && !ref.current.contains(event.target)) {
        setExpandContextMenu(false)
        setTimeout(() => {
          setContextMenu(``)
        }, 150)
      }
    }
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [contextMenu])

  return (
    // <div
    //   className={`absolute w-screen h-screen`}
    //   // onClick={() => {
    //   // triggerAnimation()
    //   // setTimeout(() => {
    //   //   setContextMenu(``)
    //   // }, 150)
    //   // }}
    //   // onAuxClick={() => {
    //   //   triggerAnimation()
    //   //   setTimeout(() => {
    //   //     setContextMenu(``)
    //   //   }, 150)
    //   // }}
    // >
    <ul
      className={`absolute rounded-lg bg-slate-200 flex flex-col gap-0.5 border overflow-clip shadow-md shadow-[rgba(0,0,0,0.2)] ${
        expandContextMenu ? `scale-y-100` : `scale-y-0`
      } transition-transform origin-top z-10`}
      style={{
        top: `${contextMenuPosition.y}px`,
        left: `${contextMenuPosition.x}px `,
      }}
      ref={ref}
    >
      {contextMenu === `folder` && (
        <>
          {/* open folder: */}
          <li className="contextMenuItem" onClick={contextMenuFunctions.openFolder}>
            <span className="material-symbols-outlined contextIcon">folder_open</span>{" "}
            <span className="px-2">open</span>
          </li>
          {/* delete folder */}
          <li className="contextMenuItem" onClick={contextMenuFunctions.deleteFolder}>
            <span className="material-symbols-outlined contextIcon">delete</span>
            <span className="px-2">delete</span>
          </li>
        </>
      )}
      {contextMenu === `file` && (
        <>
          {/* download File: */}
          <li className="contextMenuItem" onClick={contextMenuFunctions.download}>
            <span class="material-symbols-outlined contextIcon">download</span>
            <span className="px-2">download</span>
          </li>

          {/* delete File */}
          <li className="contextMenuItem" onClick={contextMenuFunctions.deleteFile}>
            <span className="material-symbols-outlined contextIcon">delete</span>
            <span className="px-2">delete</span>
          </li>
        </>
      )}
      {(contextMenu === `folder` || contextMenu === `file`) && (
        <>
          <li className="contextMenuItem" onClick={contextMenuFunctions.rename}>
            <span className="material-symbols-outlined contextIcon">edit</span>
            <span className="px-2">rename</span>
          </li>

          <li className="contextMenuItem" onClick={contextMenuFunctions.showStats}>
            <span className="material-symbols-outlined contextIcon">info</span>
            <span className="px-2">stats</span>
          </li>
        </>
      )}

      {contextMenu === `empty` && (
        <>
          <li className="contextMenuItem" onClick={() => setPopup(`new file`)}>
            <span className="material-symbols-outlined contextIcon">upload_file</span>
            <span className="px-2">upload file</span>
          </li>
          <li className="contextMenuItem" onClick={() => setPopup(`new folder`)}>
            <span class="material-symbols-outlined contextIcon">create_new_folder</span>
            <span className="px-2">create folder</span>
          </li>
        </>
      )}
    </ul>
    // </div>
  )
}
