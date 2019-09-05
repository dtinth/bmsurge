
const observer = (f, previous = undefined) => value => {
  f(value, previous)
  previous = value
}

const changeObserver = (f, previous) => observer((newValue, oldValue) => {
  if (oldValue !== newValue) f(newValue, oldValue)
}, previous)

function startNowPlaying (store) {
  firebase.database().ref('station').on('value', (snapshot) => {
    const time = Date.now()
    store.dispatch(app => app.nowPlayingDataReceived(snapshot.val(), time))
  })
}

function startNotifications (store) {
  const observeOption = changeObserver(enabled => {
    if (enabled) {
      try {
        Notification.requestPermission()
      } catch (e) {
        alert('Cannot enable notifications: ' + e.toString())
      }
    }
  })
  const observeSongTitle = changeObserver(() => {
    try {
      const state = store.getState()
      if (!state.options.notifications) return
      if (Notification.permission !== 'granted') return
      const song = state.nowPlaying
      const notification = new Notification('[' + song.genre + '] ' + song.title, {
        body: song.artist + ' (' + song.set + ')',
        icon: require('url!./icon.png')
      })
      setTimeout(() => notification.close(), 5000)
    } catch (e) {
      console.warn('Cannot send notification.')
    }
  })
  store.subscribe(() => {
    const state = store.getState()
    const song = store
    observeOption(state.options.notifications)
    observeSongTitle(state.nowPlaying.title)
  })
}

export function startStorage (store) {
  const observeDataJSON = changeObserver(json => {
    localStorage['bmsurge_data'] = json
  })
  if (localStorage['bmsurge_data']) {
    try {
      const options = JSON.parse(localStorage['bmsurge_data'])
      store.dispatch(app => app.rehydrate(options))
    } catch (e) {
      console.warn('Unable to rehydrate settings:', e.stack)
    }
  }
  const dehydrate = state => ({ options: state.options })
  store.subscribe(() => {
    observeDataJSON(JSON.stringify(dehydrate(store.getState())))
  })
}

export function start (store) {
  startStorage(store)
  startNowPlaying(store)
  startNotifications(store)
}
