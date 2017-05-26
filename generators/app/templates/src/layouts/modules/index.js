
// ------------------------------------
// api
// ------------------------------------
import {getMenus} from '../api'

// ------------------------------------
// Constants
// ------------------------------------
const MENUS = 'MENUS';


export const getMenusAction = (data) => {
  return (dispatch) => {
    // getMenus(data).then((res)=>{
    //   dispatch({
    //     type: MENUS,
    //     payload: res.data
    //   })
    // })
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [MENUS]: (state, action) => {
    state.menus = action.payload;
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  menus: []
};

export default function layoutReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
