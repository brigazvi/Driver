import File from "../../../components/File"

export default function Files({ list }) {
  return (
    <>
      <h1 className="w-fit mb-2">Files:</h1>
      <div className="flex gap-4 w-fit flex-wrap">
        {list.map((v) => (
          <File obj={v} key={v.id} />
        ))}
      </div>
    </>
  )
}
