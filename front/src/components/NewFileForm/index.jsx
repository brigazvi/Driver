import axios from "axios"
import { useContext, useRef, useState } from "react"
import { FilesContext } from "../../context/FilesContext"
import { UiContext } from "../../context/UiContext"

function NewFileForm() {
  const { setRefresher, currentPath } = useContext(FilesContext)
  const { setPopup } = useContext(UiContext)
  const fileUploader = useRef()
  const [fileName, setFileName] = useState(``)
  const [blocked, setBlocked] = useState(``)
  // const submitButton = useRef()
  const addFile = (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append(`file`, fileUploader.current.files[0])
    axios.post(`http://localhost:1948/file?path=${currentPath}`, form).then((res) => {
      setRefresher((prev) => !prev)
      setPopup(``)
    })
  }
  const checkFileCompatibility = () => {
    setFileName(fileUploader.current?.files[0]?.name)
    const acceptableFormats = [
      `db`,
      `jpeg`,
      `png`,
      `webp`,
      `jpg`,
      `jsx`,
      `tsx`,
      `ts`,
      `js`,
      `css`,
      `scss`,
      `sass`,
      `html`,
      `json`,
      `pdf`,
      `docx`,
      `odt`,
    ]
    console.log(
      fileUploader.current.files[0].name.slice(fileUploader.current.files[0].name.indexOf(`.`) + 1)
    )
    if (fileUploader.current.files[0].size > 2000000) {
      setBlocked(`this file is bigger then 2mb and it is not fine`)
    } else if (
      !acceptableFormats.includes(
        fileUploader.current.files[0].name.slice(
          fileUploader.current.files[0].name.indexOf(`.`) + 1
        )
      )
    ) {
      setBlocked(`this file format is not supported`)
    } else {
      setBlocked(``)
    }
  }

  return (
    <form className="flex flex-col gap-2 w-64" onSubmit={addFile}>
      <label htmlFor="fileUploader">upload the file:</label>
      <label
        htmlFor="fileUploader"
        className="bg-slate-300 px-2 py-2 rounded-md flex cursor-pointer hover:bg-slate-400"
      >
        <span class="material-symbols-outlined text-white">add_box</span>
        <span className="px-2">
          {fileName ? fileName : <span className="text-slate-600">file goes here</span>}
        </span>
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        name="fileUploader"
        id="fileUploader"
        ref={fileUploader}
        onInput={checkFileCompatibility}
        accept=".db,.jpeg,.png,.jpg,.jsx,.tsx,.ts,.js,.css,.webp,.scss,.sass,.html,.json,.pdf,.docx,.odt"
      />
      {blocked && <div>{blocked}</div>}
      <button className="btn" disabled={blocked} type="submit">
        add file
      </button>
    </form>
  )
}
export default NewFileForm
