'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const exec = require('child_process').exec
const path = require('path')
const throttle = require('lodash').throttle
const rp = require('request-promise')
const md = require('markdown-it')({ html: true, typographer: true })

function getLink (setName, fileName) {
  if (setName === 'BOFU2016') {
    const number = (m => m && +m[1] || 0)(fileName.match(/^(\d+)\./))
    if (number) {
      return {
        regNo: number,
        url: 'http://manbow.nothing.sh/event/event.cgi?action=More_def&num=' + number + '&event=110'
      }
    }
  }
  return null
}

const getCurrentSong = throttle(() => {
  return new Promise(function (resolve, reject) {
    exec('./current.sh', function (error, stdout, stderr) {
      if (!error) {
        const data = stdout.toString().split(/\n/)
        const setName = path.basename(path.dirname(data[0]))
        resolve({
          set: setName,
          link: getLink(setName, path.basename(data[0])),
          genre: data[1],
          artist: data[2],
          title: data[3],
          event: data[4],
          duration: data[5],
          md5: (x => x && x[1] || null)(String(data[6]).match(/md5=(\w+)/))
        })
      } else {
        reject(error)
      }
    })
  })
}, 5000, { trailing: false })

const getServerStatus = throttle(() => {
  return rp({
    uri: process.env.STATUS_HTML_URL,
    headers: {
      'User-Agent': 'Be-Music Surge Server Status Reporter 1.0 by @dtinth'
    }
  })
  .then(text => md.render(text))
  .catch(e => `Unable to fetch server status: ${e.toString()}`)
}, 60000, { trailing: false })

app.use(cors())
app.get('/playing.json', function (req, res) {
  const songPromise = getCurrentSong()
  const statusPromise = getServerStatus()
  songPromise.then(song => statusPromise.then(status => {
    res.json(Object.assign({ }, song, { serverStatus: status }))
  }))
  .catch(err => {
    console.error(err.stack)
    res.json({ error: err.toString() })
  })
})
app.listen(+process.env.PORT || 80)
