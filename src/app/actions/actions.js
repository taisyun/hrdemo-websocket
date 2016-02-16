import fetch from 'isomorphic-fetch'

export const ROW_EDITED = 'ROW_EDITED'
export const SET_STATE = 'SET_STATE'

export function rowEdited(row, columnName) {
  return {
    type: ROW_EDITED,
    row: row,
    columnName: columnName
  }
}


export function setState(state) {
  return {
    type: SET_STATE,
    state
  }
}

