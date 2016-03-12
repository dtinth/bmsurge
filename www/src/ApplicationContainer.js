
import { h, Component } from 'preact'
import initialApplication  from './Application'
import configureStore  from './configureStore.js'

class ApplicationContainer extends Component {
  constructor (props) {
    super(props)
    this._store = configureStore()
    this.state = {
      appState: this._store.getState(),
      Application: initialApplication
    }
  }
  componentDidMount () {
    // Setup hot reloading…
    if (module.hot) {
      module.hot.accept('./Application', () => {
        this.setState({ Application: require('./Application').default })
      })
    }

    // Set up store
    this._store.subscribe(() => {
      this.setState({ appState: this._store.getState() })
    })
  }
  render () {
    const { Application } = this.state
    return <Application state={this.state.appState} store={this._store} />
  }
}

export default ApplicationContainer
