
import { h, Component } from 'preact'
import AboutThisStation from './AboutThisStation'
import styles from './Application.styl'
import NowPlaying from './NowPlaying'
import ServerStatus from './ServerStatus.js'
import Title from './Title'
import Options from './Options'
import { start } from './IO'
import PlayHistory from './PlayHistory'

class Application extends Component {
  componentDidMount () {
    // Setup I/O for browser mode.
    start(this.props.store)
  }
  render () {
    const { state, store } = this.props
    return <div className={styles.root}>
      <Title nowPlaying={state.nowPlaying} key='Title' />
      <div className={styles.nowPlayingSection} key='NowPlayingSection'>
        <h2>Now Playing</h2>
        <NowPlaying nowPlaying={state.nowPlaying} options={state.options} store={store} />
        <Options options={state.options} store={store} />
      </div>
      <div key='PlayHistorySection'>
        {state.options.showHistory
          ? <div className={styles.nowPlayingSection}>
            <h2>Song Play History</h2>
            <PlayHistory history={state.history} />
          </div>
          : null
        }
      </div>
      <div className={styles.serverStatusSection} key='ServerStatusSection'>
        <h2>Server Status</h2>
        <ServerStatus status={state.serverStatus} />
      </div>
      <div className={styles.informationSection} key='InformationSection'>
        <AboutThisStation />
      </div>
    </div>
  }
}

export default Application
