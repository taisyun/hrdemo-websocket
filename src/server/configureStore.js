import { createStore, applyMiddleware } from 'redux'
import createNodeLogger from 'redux-node-logger'
import rootReducer from './reducer'
import initialData from './data.json'


export default function configureStore(initialState) {

  const state = Object.assign({}, initialState, {
    jobList: {
      items: initialData
    }
  })
  const loggerMiddleware = createNodeLogger()
  const enhancer = applyMiddleware(loggerMiddleware)
  const store = createStore(rootReducer, state, enhancer)

  return store
}
