
import { h, Component } from 'preact'
import styles from './TwitterShareButton.styl'

class TwitterShareButton extends Component {
  render () {
    return <div className={styles.root} id='twitter-share-button'></div>
  }
  componentDidMount () {
    setTimeout(() => this._update())
  }
  shouldComponentUpdate (nextProps) {
    return JSON.stringify(nextProps.shareOptions) !== JSON.stringify(this.props.shareOptions)
  }
  componentDidUpdate () {
    setTimeout(() => this._update())
  }
  _update () {
    // return
    twttr.ready(() => {
      const span = document.createElement('span')
      document.body.appendChild(span)
      twttr.widgets.createShareButton(
        'http://be-music.surge.sh/',
        span,
        JSON.parse(JSON.stringify(this.props.shareOptions))
      ).then(function () {
        const node = document.getElementById('twitter-share-button')
        if (!node) return
        node.innerHTML = ''
        node.appendChild(span)
      })
    })
  }
}

export default TwitterShareButton
