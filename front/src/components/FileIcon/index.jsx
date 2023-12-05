export default function FileIcon({ ext }) {
  const icon = () => {
    switch (ext) {
      case `db`:
        return `database`
        break
      case `folder`:
        return `folder`
        break
      case `jpeg`:
      case `webp`:
      case `png`:
      case `jpg`:
        return `image`
        break
      case `jsx`:
      case `tsx`:
      case `js`:
      case `ts`:
      case `css`:
      case `scss`:
      case `sass`:
      case `html`:
        return `code`
        break
      case `json`:
        return `data_object`
        break
      case `pdf`:
        return `picture_as_pdf`
        break
      case `docx`:
      case `odt`:
        return `description`
        break
      default:
        return ``
        break
    }
  }
  return <span class="material-symbols-outlined">{icon()}</span>
}
