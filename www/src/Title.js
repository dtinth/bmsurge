
import { h } from 'preact'
import styles from './Title.styl'

const Title = ({ nowPlaying }) => (
  <div className={styles.root}>
    <h1>Be-Music Surge</h1>
    <p className={styles.tagline}>
      Nonstop BMS music station.
      {' '}
      <span className={styles.m3u}>
        [<a href="be-music-surge.m3u">.m3u</a>]
      </span>
    </p>
    <p>
      <audio
        preload="none"
        controls
        src="https://be-music.spacet.me/radio/be-music-surge"
      >Does your browser support audio tag??</audio>
    </p>
  </div>
)

export default Title
