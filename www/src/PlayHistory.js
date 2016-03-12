
import { h } from 'preact'
import styles from './PlayHistory.styl'
import { link } from './BMSLink'

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const twoDigits = x => (x < 10 ? '0' : '') + x
  return date.getHours() + ':' + twoDigits(date.getMinutes())
}

const SongItem = ({ song }) => (
  <li className={styles.song}>
    <span className={styles.timestamp}>{formatTime(song.timestamp)}</span>{' '}
    <span className={styles.genre}>【{song.genre}】</span>
    <cite className={styles.artist}>{song.artist}</cite> — <a href={link(song)} target='_blank' className={styles.title}>{song.title}</a>
  </li>
)


const PlayHistory = ({ history }) => (
  <ul className={styles.root}>
    {history.map(song => <SongItem song={song} key={song.timestamp} />)}
  </ul>
)

export default PlayHistory
