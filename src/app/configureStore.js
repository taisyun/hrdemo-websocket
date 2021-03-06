import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/reducers'
import { persistState } from 'redux-devtools'
import DevTools from './containers/DevTools'
import remoteActionMiddleware from './remote_action_middleware'
import io from 'socket.io-client'
import { resetEdited, setState } from '../redux/actions'


const socket = io(`${location.protocol}//${location.hostname}:${location.port}/joblist`)


const loggerMiddleware = createLogger()

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(
    thunkMiddleware,
    remoteActionMiddleware(socket) //,
//    loggerMiddleware
  ),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
};


export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducers/reducers', () =>
      store.replaceReducer(require('./reducers/reducers')/*.default if you use Babel 6+ */)
    );
  }

  socket.on('state', state => {
    store.dispatch(resetEdited());
    store.dispatch(setState(state))
  })

  return store;
}

