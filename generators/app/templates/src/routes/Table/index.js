import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'table',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const table = require('./containers/index').default
      const reducer = require('./modules/index').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'table', reducer })

      /*  Return getComponent   */
      cb(null, table)

    /* Webpack named bundle   */
    }, 'table')
  }
})
