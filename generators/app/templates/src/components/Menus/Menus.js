import React from 'react'
import {Menu, Icon} from 'antd'
import { Link } from 'react-router'
import './Menus.scss'
const {SubMenu} = Menu;
const menusData=[
  {
    "title":"subnav1",
    "items":[
      {
        "path":"/",
        "title":"home"
      },
      {
        "path":"/table",
        "title":"Table"
      }]
  }
];

const ZCYSubMenus = (props)=>(
  <SubMenu key={"sub"+props.key} title={<span><Icon type="user"/>{props.title}</span>}>
    {props.items.map((item,index)=>{
     return   <Menu.Item key={index}>
       <Link to={item.path}>
         {item.title}
       </Link>
     </Menu.Item>
    })}
  </SubMenu>
)

export const ZCY_Menus = (props) => (
  <Menu
    mode="inline"
    defaultSelectedKeys={['0']}
    defaultOpenKeys={['sub0']}
    style={{height: '100%'}}
  >
    {
      menusData.map((subMenu,key)=>{
        return ZCYSubMenus({ ...subMenu,key});
      })
    }
  </Menu>
)

export default ZCY_Menus