import { useContext } from "react"
import { FilesContext } from "../../context/FilesContext"

export default function AddressBar() {
  const { setRefresher, currentPath, setCurrentPath, setSortAlgorithm } = useContext(FilesContext)
  return (
    <div
      className="bg-slate-700 bg-opacity-40  backdrop-blur-sm h-10 flex flex-row-reverse px-3 items-center justify-between "
      style={{ backgroundImage: `linear-gradient(to right, transparent 80%,rgba(0,0,0,0.5) 100%)` }}
    >
      <span
        class="material-symbols-outlined cursor-pointer text-slate-200 py-2  hover:text-white"
        onClick={() => {
          setSortAlgorithm((prev) => (prev === `namesAsc` ? `namesDesc` : `namesAsc`))
          setRefresher((prev) => !prev)
        }}
      >
        sort
      </span>
      {currentPath.length > 0 && (
        <button
          className="flex items-center gap-1  text-slate-900 px-2 py-0.5 rounded-sm"
          onClick={() => {
            if (currentPath.slice(0, -1).lastIndexOf(`/`) !== -1) {
              setCurrentPath((prev) => prev.slice(0, prev.slice(0, -1).lastIndexOf(`/`)) + `/`)
            } else {
              setCurrentPath(``)
            }
          }}
        >
          <span class="material-symbols-outlined">arrow_upward</span>
          <span>{currentPath}</span>
        </button>
      )}
    </div>
  )
}
