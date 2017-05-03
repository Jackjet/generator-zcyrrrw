import React, { Component, PropTypes } from 'react'
import { browserHistory,hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
          <Router history={browserHistory} children={routes} />
      </Provider>
    )
  }
}

export default AppContainer
