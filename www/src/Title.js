
import { h } from 'preact'
import styles from './Title.styl'

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
  </div>
)

export default Title
