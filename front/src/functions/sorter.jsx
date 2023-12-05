export function sorter(arr, sortAlgorithm) {
  switch (sortAlgorithm) {
    case `namesDesc`:
      console.log("desc")
      return arr.toSorted(
        (previousItem, item) =>
          item.title.toLowerCase().charCodeAt() - previousItem.title.toLowerCase().charCodeAt()
      )
      break

    case `namesAsc`:
      console.log("asc")
      return arr.toSorted(
        (previousItem, item) =>
          previousItem.title.toLowerCase().charCodeAt() - item.title.toLowerCase().charCodeAt()
      )
      break
  }
}
