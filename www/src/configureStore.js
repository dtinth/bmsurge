
import { createStore, applyMiddleware } from 'redux'
import { reducer } from './AppDomain'

const withDevTools = (typeof window !== 'undefined' && window.devToolsExtension
  ? window.devToolsExtension()
  : f => f
)

const sendMiddleware = store => next => action => next(
  typeof action === 'function'
  ? { type: 'MESSAGE', message: action }
  : action
)

function configureStore () {
  const store = applyMiddleware(sendMiddleware)(withDevTools(createStore))(reducer)
  if (module.hot) {
    module.hot.accept('./AppDomain', () =>
      store.replaceReducer(require('./AppDomain').reducer)
    )
  }
  return store
}

export default configureStore
