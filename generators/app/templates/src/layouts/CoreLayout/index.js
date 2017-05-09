

import { connect } from 'react-redux'
import reducer,{ getMenusAction } from '../modules/index'
import { injectReducer } from 'store/reducers'
import CoreLayout from './CoreLayout'

const mapDispatchToProps = {
  getMenus :()=>getMenusAction({id:1,a:2})
}

const mapStateToProps = (state) => ({
  menus : state.layout.menus
})


export default function(store){
  injectReducer(store, { key: 'layout', reducer })
  return connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
}
