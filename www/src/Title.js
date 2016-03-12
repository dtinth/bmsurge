
import { h } from 'preact'
import styles from './Title.styl'

import TwitterShareButton from './TwitterShareButton'

function getShareOptions (playing) {
  if (playing.initial) {
    return {
      text: 'Listening to non-stop BMS radio station @ Be-Music Surge BMS radio station →',
      hashtags: 'bmsurge'
    }
  } else {
    return {
      text: 'Just listened to “' + playing.artist + ' — ' + playing.title + '” on Be-Music Surge →',
      hashtags: 'bmsurge'
    }
  }
}

const Title = ({ nowPlaying }) => (
  <div className={styles.root}>
    <h1>Be-Music Surge</h1>
    <p className={styles.tagline}>
      Nonstop BMS music station.
      {' '}
      <span className={styles.m3u}>
        [<a href="http://cloud.spacet.me:8000/be-music-surf.m3u">.m3u</a>]
      </span>
    </p>
    <p>
      <audio
        preload="none"
        controls
        src="http://cloud.spacet.me:8000/be-music-surf"
      >Does your browser support audio tag??</audio>
    </p>
    <TwitterShareButton shareOptions={getShareOptions(nowPlaying)} />
  </div>
)

export default Title
