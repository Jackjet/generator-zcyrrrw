// ------------------------------------
// Constants
// ------------------------------------
export const GET_DATA = 'GET_DATA';

// ------------------------------------
// Actions
// ------------------------------------
export const getData = (ID) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: GET_DATA,
          payload: {
            "email": {
              value:"chenkaixia@126.com"
            },
            "select": {
              value:"use"
            },
            "select-multiple":{
              value:["red"]
            },
            "input-number":{
              value:3
            },
            "switch": {
              value:true
            },
            "slider": {
              value:19
            },
            "radio-group": {
              value:"b"
            },
            "radio-button": {
              value:"b"
            }
          }
        })
        resolve()
      }, 200)
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state = action.payload
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function ZCYFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
