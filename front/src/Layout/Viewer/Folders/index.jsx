import Folder from "../../../components/Folder"

export default function Folders({ list }) {
  return (
    <>
      <h1 className="w-fit mb-2">Folders:</h1>
      <div className="flex gap-4 w-fit flex-wrap">
        {list.map((v) => (
          <Folder obj={v} key={v.id} />
        ))}
      </div>
    </>
  )
}
