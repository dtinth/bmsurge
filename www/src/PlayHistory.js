import { h } from 'preact'

import styles from './PlayHistory.styl'
import { bmsLink, link, searchLink, soundcloudLink } from './BMSLink'

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const twoDigits = x => (x < 10 ? '0' : '') + x
  return date.getHours() + ':' + twoDigits(date.getMinutes())
}

const soundcloudify = (song, content) => {
  if (song.soundcloud) {
    return <a className={styles.soundcloudLink} href={soundcloudLink(song)}>{content}</a>
  } else {
    return content
  }
}

const SongItem = ({ song }) => (
  <li className={styles.song}>
    <span className={styles.timestamp}><a href={link(song)} className={styles.timestampLink} target='_blank'>{formatTime(song.timestamp)}</a></span>{' '}
    <span className={styles.genre}>【{song.genre}】</span>
    <cite className={styles.artist}>{soundcloudify(song, song.artist)}</cite>
    {' — '}
    <a href={bmsLink(song)} target='_blank' className={styles.title}>{song.title}</a>
    {bmsLink(song) !== searchLink(song)
      ? <span> <a target='_blank' href={searchLink(song)}><img src={require('url!./bmssearch.svg')} width={12} style={{ verticalAlign: 'middle', position: 'relative', top: -1 }} height={12} /></a></span>
      : null
    }
  </li>
)


const PlayHistory = ({ history }) => (
  <ul className={styles.root}>
    {history.map(song => <SongItem song={song} key={song.timestamp} />)}
  </ul>
)

export default PlayHistory
