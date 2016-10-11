import { h } from 'preact'

import styles from './NowPlaying.styl'
import TwitterShareButton from './TwitterShareButton'
import { link, searchLink, bmsLink, soundcloudLink } from './BMSLink'

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
      <a href={bmsLink(nowPlaying)} target='_blank'>{nowPlaying.title}</a>
    </div>
    <div className={styles.artist}><cite>{nowPlaying.artist}</cite></div>
    <div className={styles.event}>{nowPlaying.event}</div>
    <div className={styles.links}>
      <span className={styles.linkItem} key='event'>
        {nowPlaying.link
          ? (
            <a className={styles.link} target='_blank' href={nowPlaying.link.url}>
              <strong>{nowPlaying.set}</strong> No.{String(nowPlaying.link.regNo)}
            </a>
          )
          : null
        }
      </span>
      <span className={styles.linkItem} key='soundcloud'>
        {nowPlaying.soundcloud
          ? (
            <a className={styles.link} target='_blank' href={soundcloudLink(nowPlaying)}>
              SoundCloud
              <span className={styles.bubble}>{nowPlaying.soundcloud}</span>
            </a>
          )
          : null
        }
      </span>
      <span className={styles.linkItem} key='bmsSearch'>
        <a
          className={styles.link + (options['ack.bmssearch'] ? '' : ' ' + styles.unacked)}
          target='_blank'
          onMouseOver={() => !options['ack.bmssearch'] && store.dispatch(app => app.acknowledge('bmssearch'))}
          href={searchLink(nowPlaying)}
        >
          <img src={require('url!./bmssearch.svg')} width={16} height={16} /> BMS Search
          <span className={styles.bubble}>
            Keep track of your favorite songs<br />with BMS Search!
          </span>
        </a>
      </span>
      <span className={styles.linkItem} key='lr2ir'>
        <a className={styles.link} target='_blank' href={link(nowPlaying)}>
          LR2IR
          <span className={styles.bubble}>
            See the score ranking of this song in LR2IR.
          </span>
        </a>
      </span>
      <span className={styles.linkItem} key='share'>
        <TwitterShareButton shareOptions={getShareOptions(nowPlaying)} />
      </span>
    </div>
  </div>
)

export default NowPlaying
