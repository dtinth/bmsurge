
import { h } from 'preact'
import styles from './NowPlaying.styl'
import { link } from './BMSLink'

const NowPlaying = ({ nowPlaying, options, store }) => (
  <div className={styles.root}>
    <div className={styles.genre}>【{nowPlaying.genre}】</div>
    <div className={styles.title}>
      <a href={link(nowPlaying)} target='_blank'>{nowPlaying.title}</a>
    </div>
    <div className={styles.artist}><cite>{nowPlaying.artist}</cite></div>
    <div className={styles.event}>{nowPlaying.event}</div>
  </div>
)

export default NowPlaying
