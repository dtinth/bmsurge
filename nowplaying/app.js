'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const exec = require('child_process').exec
const path = require('path')

app.use(cors())
app.get('/playing.json', function (req, res) {
  exec('./current.sh', function (error, stdout, stderr) {
    if (!error) {
      const data = stdout.toString().split(/\n/)
      res.json({
        set: path.basename(path.dirname(data[0])),
        genre: data[1],
        artist: data[2],
        title: data[3],
        event: data[4],
        duration: data[5],
        serverStatus: process.env.SERVER_STATUS
      })
    } else {
      console.log({ stderr, stdout })
      res.json({ error: stderr })
    }
  })
})
app.listen(+process.env.PORT || 80)
