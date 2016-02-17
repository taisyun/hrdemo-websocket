import { RESET_EDITED, SET_STATE } from '../redux/actions'

export default socket => store => next => action => {
  if (action.type !== SET_STATE && action.type !== RESET_EDITED) {
    socket.emit('action', action)
  }

  return next(action)
}
