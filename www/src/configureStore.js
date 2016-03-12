
import { createStore, applyMiddleware } from 'redux'
import { reducer } from './AppModel'
import sendMiddleware from 'redux-send'

const withDevTools = (typeof window !== 'undefined' && window.devToolsExtension
  ? window.devToolsExtension()
  : f => f
)

function configureStore () {
  const store = applyMiddleware(sendMiddleware)(withDevTools(createStore))(reducer)
  if (module.hot) {
    module.hot.accept('./AppModel', () =>
      store.replaceReducer(require('./AppModel').reducer)
    )
  }
  return store
}

export default configureStore
