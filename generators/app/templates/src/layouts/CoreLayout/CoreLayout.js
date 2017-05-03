import React from 'react'
import {Breadcrumb} from 'antd';
import Header from 'components/Header/index'
import ZCYMenus from 'components/Menus/index'

import './CoreLayout.less'
import 'styles/core.less'

class CoreLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const children = this.props.children;
    return <div>
              <Header/>
                <div style={{background: '#fff',float: "left",width:"20%"}}>
                 <ZCYMenus/>
                </div>
                <div style={{float:"left",padding: '24px',width:"80%"}}>
                  <Breadcrumb style={{margin: '12px 0'}}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                <div style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                { children }
                </div>
              </div>
          </div>;
  }

}
;

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
