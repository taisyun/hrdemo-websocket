import initialData from './data.json'

export const INIT_DATA = 'INIT_DATA'

export const RESET_EDITED = 'RESET_EDITED'
export const ROW_EDITED = 'ROW_EDITED'

export const SET_STATE = 'SET_STATE'

export function initData(state) {
  return { type: INIT_DATA, state }
}

export function resetEdited() {
  return {
    type: RESET_EDITED
  }
}

export function rowEdited(row, columnName) {
  return {
    type: ROW_EDITED,
    row: row,
    columnName: columnName
  }
}

export function setState(state) {
  return { type: SET_STATE, state }
}

export function loadInitData() {

  const state = Object.assign({}, {
    jobList: {
      isFetching: false,
      didInvalidate: true,
      items: initialData
    }
  })

  return dispatch => {
    return dispatch(initData(state))
  }
}

