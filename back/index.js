const fs = require(`fs`)
const multer = require(`multer`)({ dest: `./temp` })
const express = require("express")
const app = express()
const PORT = 1948
const ROOT = "./root/"

//middleware
app.use(require(`cors`)())
app.use(express.json())

//--ROUTES--
//create folder route:
app.post(`/folder`, (req, res) => {
  try {
    if (fs.existsSync(ROOT + req.query.path + `/` + req.query.name)) {
      console.log(`folder already exists`)
      res.send(`folder already exists`)
    }
    fs.mkdirSync(ROOT + req.query.path + `/` + req.query.name)
    res.send("folder created")
  } catch (err) {
    console.log(err.message)
  }
})
//change file or folder route:
app.put(`/`, (req, res) => {
  try {
    if (fs.existsSync(ROOT + req.query.path)) {
      fs.renameSync(ROOT + req.query.path, ROOT + req.query.newPath)
      res.send("change completed")
    } else {
      res.send("no such file or folder")
    }
  } catch (err) {
    res.send(err.message)
  }
})
//upload route
app.post(`/file`, multer.single(`file`), (req, res) => {
  try {
    if (!fs.existsSync(ROOT + req.query.path)) {
      throw `path not exist`
    } else {
      fs.renameSync(
        `./temp/${req.file.filename}`,
        `${ROOT}${req.query.path}${req.file.originalname}`
      )
      res.send(`file uploaded  successfully`)
      console.log(`file uploaded  successfully`)
    }
  } catch (err) {
    console.log(err.message)
    res.send(err.message)
  }
})
//deletion route
app.delete(`/`, (req, res) => {
  try {
    console.log(`DELETE: 1.trying to delete`)
    if (fs.statSync(ROOT + req.query.path).isDirectory()) {
      console.log(`DELETE: 2.its a directory: `)
      console.log(fs.statSync(ROOT + req.query.path).isDirectory())
      fs.rmdirSync(ROOT + req.query.path)
      res.send(`folder removed successfully`)
      console.log(`DELETE: 3.folder removed successfully`)
    } else {
      fs.rmSync(ROOT + req.query.path)
      res.send(`file removed successfully`)
      console.log(`file removed successfully`)
    }
  } catch (err) {
    console.log(err.message)
    res.send(err.message)
  }
})
//read directory route
app.get(`/`, (req, res) => {
  try {
    //setup
    const path = ROOT + req.query.path
    // console.log(`1. request received: ${req.query.path}`)
    //get file names:
    const arr = fs.readdirSync(path)
    // console.log(`2. directory: ${arr}`)
    //make it beautiful:
    const response = arr.map((file) => {
      const stats = fs.statSync(path + file)
      const obj = {
        title: file,
        isDir: stats.isDirectory(),
        path: req.query.path + file + `/`,
        id: `id` + file + `id`,
        size: stats.size / 1000 + ` kilobytes`,
        creationDay: `${stats.birthtime.getDate()}/${stats.birthtime.getMonth()}/${stats.birthtime.getFullYear()}`,
        stats,
      }
      return obj
    })
    res.send(response)
    // console.log(
    //   `3.\n` +
    //     response.map((v) => {
    //       return v.title
    //     })
    // )
  } catch (err) {
    res.send(err.message)
  }
})

//download file:
app.get(`/download`, (req, res) => {
  try {
    console.log(ROOT)
    console.log(req.query.path)
    res.download(String(ROOT + req.query.path), (err) => {
      if (err) {
        console.log(err.message)
        res.send(err.message)
      }
    })
    // res.send(data)
    // res.send(data)
    console.log(`success?`)
  } catch (err) {
    console.log(err.message)
  }
})

//routes fallback
app.all(`/`, (req, res) => {
  res.send(`ok`)
})

//server listening
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})

function displayFolder(path) {}
