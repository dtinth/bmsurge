
import { h } from 'preact'
import styles from './NowPlaying.styl'
import { link, searchLink } from './BMSLink'
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

const NowPlaying = ({ nowPlaying, options, store }) => (
  <div className={styles.root}>
    <div className={styles.genre}>【{nowPlaying.genre}】</div>
    <div className={styles.title}>
      <a href={link(nowPlaying)} target='_blank'>{nowPlaying.title}</a>
    </div>
    <div className={styles.artist}><cite>{nowPlaying.artist}</cite></div>
    <div className={styles.event}>{nowPlaying.event}</div>
    <div className={styles.links}>
      <span className={styles.linkItem}>
        <a className={styles.link} target='_blank' href={searchLink(nowPlaying)}>
          <img src={require('url!./bmssearch.svg')} width={16} height={16} /> BMS Search
        </a>
      </span>
      <span className={styles.linkItem}>
        <a className={styles.link} target='_blank' href={link(nowPlaying)}>
          LR2IR
        </a>
      </span>
      <span className={styles.linkItem}>
        <TwitterShareButton shareOptions={getShareOptions(nowPlaying)} />
      </span>
    </div>
  </div>
)

export default NowPlaying
