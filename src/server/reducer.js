import { combineReducers } from 'redux'
import { SET_STATE } from '../redux/actions'

function jobList(state = {
  isFetching: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  jobList
})

export default rootReducer
