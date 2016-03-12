
const songId = ({ title, artist }) => `${artist} - ${title}`

const addHistory = (history, newSong, timestamp) => (
  !history.length || songId(history[0]) !== songId(newSong)
  ? [ { ...newSong, timestamp: timestamp }, ...history ]
  : history
)

const model = {
  getInitialState: () => ({
    nowPlaying: {
      set: '[set]',
      genre: 'genre',
      artist: '[artist]',
      title: '[TITLE]',
      event: '[event]',
      initial: true
    },
    serverStatus: '[loading server status]',
    history: [ ],
    options: {
      notifications: false,
      showHistory: false
    }
  }),
  nowPlayingDataReceived: (data, timestamp) => state => {
    const toSong = ({ set, genre, artist, title, event, md5 }) => ({ set, genre, artist, title, event, md5 })
    const song = toSong(data)
    return {
      ...state,
      nowPlaying: song,
      history: addHistory(state.history, song, timestamp),
      serverStatus: data.serverStatus
    }
  },
  rehydrate: ({ options }) => state => ({
    ...state,
    options: {
      ...state.options,
      ...options
    }
  }),
  setNotificationsEnabled: setting => state => ({
    ...state,
    options: {
      ...state.options,
      notifications: setting
    }
  }),
  setShowHistory: setting => state => ({
    ...state,
    options: {
      ...state.options,
      showHistory: setting
    }
  })
}

export function reducer (state = model.getInitialState(), action) {
  if (action.type === 'MESSAGE') {
    return (action.message)(model)(state)
  } else {
    return state
  }
}
