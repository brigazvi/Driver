import { useContext } from "react"
import { UiContext } from "../../context/UiContext"

export default function Stats() {
  const { stats } = useContext(UiContext)
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">{stats.title}</h1>
      <h4>{stats.isDir && `📁 Directory`}</h4>
      <div className="flex gap-2">
        <span class="material-symbols-outlined text-slate-500">event</span> <b>creation:</b>
        {stats.creationDay}
      </div>
      <div className="flex gap-2">
        <span class="material-symbols-outlined text-slate-500">save</span> <b>size:</b> {stats.size}
      </div>
      <div></div>
    </div>
  )
}
