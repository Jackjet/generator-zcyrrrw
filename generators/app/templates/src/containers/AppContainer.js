import React, { Component } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  routes: React.PropTypes.array.isRequired,
  store: React.PropTypes.object.isRequired
};

export default AppContainer;
