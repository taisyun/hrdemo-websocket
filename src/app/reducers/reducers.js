import { combineReducers } from 'redux'
import {
  INVALIDATE_CONTENTS,
  REQUEST_JOBS, RECEIVE_JOBS, ROW_EDITED,
  SAVING_JOBS, SAVED_JOBS, SET_STATE
} from '../actions/actions'

function jobList(state = {
  isFetching: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    case SET_STATE:
      return action.state.jobList
    default:
      return state
  }
}

const rootReducer = combineReducers({
    jobList
})

export default rootReducer
