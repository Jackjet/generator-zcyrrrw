import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'ZCYForm/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ZCYForm = require('./containers/index').default
      const reducer = require('./modules/index').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ZCYForm', reducer })
      /*  Return getComponent   */
      cb(null, ZCYForm)

    /* Webpack named bundle   */
    }, 'ZCYForm')
  }
})
