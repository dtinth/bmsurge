import { createReducer } from 'redux-send'

const AppModel = {
  getInitialState: () => ({
    nowPlaying: {
      set: '[set]',
      genre: 'genre',
      artist: '[artist]',
      title: '[TITLE]',
      event: '[event]',
      link: null,
      initial: true
    },
    serverStatus: '[loading server status]',
    history: [ ],
    options: {
      notifications: false,
      showHistory: false,
      'ack.bmssearch': false
    }
  }),
  nowPlayingDataReceived: data => state => {
    const toSong = ({ set, genre, artist, title, event, md5, link, soundcloud, playedAt }) => ({
      set, genre, artist, title, event, md5, link, soundcloud, timestamp: playedAt
    })
    const song = toSong(data)
    return {
      ...state,
      nowPlaying: song,
      history: Object.values(data.history || {}).reverse().map(toSong),
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
  acknowledge: setting => state => ({
    ...state,
    options: {
      ...state.options,
      ['ack.' + setting]: true
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

export const reducer = createReducer(AppModel)
