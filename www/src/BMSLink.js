
export function link ({ md5 }) {
  return 'http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=' + md5
}

export function searchLink ({ md5 }) {
  return 'http://bmssearch.net/bms?bmsmd5=' + md5
}

export function bmsLink (song) {
  if (song.link) {
    return song.link.url
  } else {
    return searchLink(song)
  }
}

export function soundcloudLink (song) {
  if (song.soundcloud) {
    return 'https://soundcloud.com' + song.soundcloud
  } else {
    return false
  }
}
