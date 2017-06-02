

import 'utils/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

//调试环境加入
import Perf from 'react-addons-perf'
window.Perf = Perf


// ========================================================
// Store Instantiation
// ========================================================
const initialState = {}
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes}  />,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()

