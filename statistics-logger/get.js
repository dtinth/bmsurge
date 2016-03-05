
const prefix = '[' + new Date().toUTCString() + '] '

require('request-promise')('http://cloud.spacet.me:8000/').then(function (text) {
  console.log(prefix + require('cheerio').load(text)('table tr:nth-of-type(6) .streamdata').text())
}).catch(function (error) {
  console.log(prefix + 'ERROR: ' + error)
})
