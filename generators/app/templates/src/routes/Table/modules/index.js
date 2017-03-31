// ------------------------------------
// Constants
// ------------------------------------
const TABLE_LIST = 'TABLE_LIST'


export const getList = (type) => {
  return (dispatch, getState) => {
    if (type == 1) {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch({
            type: TABLE_LIST,
            payload: [{
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York Park',
            }, {
              key: '2',
              name: 'Jim Green',
              age: 40,
              address: 'London Park',
            }]
          })
          resolve()
        }, 200)
      })
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: TABLE_LIST,
          payload: [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
          }, {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
          }, {
            key: '3',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
          }, {
            key: '4',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
          }, {
            key: '5',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
          }, {
            key: '6',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
          }, {
            key: '7',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
          }, {
            key: '8',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
          }, {
            key: '9',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
          }, {
            key: '10',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
          }, {
            key: '11',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
          }, {
            key: '12',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
          }
          ]
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
  [TABLE_LIST]: (state, action) => {
    state.list = action.payload;
    return state;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: []
};

export default function tableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
