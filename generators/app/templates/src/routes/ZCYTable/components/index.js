/***
 * @author chenkaixia
 * @description
 * 业务组件列表
 */

//使用严格模式
'use strict';

import React from 'react';
import {Table} from 'antd';
import Search from 'components/Search';

const columns = [
  {title: 'Full Name', width: 100, dataIndex: 'name', key: '10', fixed: 'left'},
  {title: 'Age', width: 100, dataIndex: 'age', key: '9', fixed: 'left'},
  {title: 'Column 1', dataIndex: 'address', key: '1'},
  {title: 'Column 2', dataIndex: 'address', key: '2'},
  {title: 'Column 3', dataIndex: 'address', key: '3'},
  {title: 'Column 4', dataIndex: 'address', key: '4'},
  {title: 'Column 5', dataIndex: 'address', key: '5'},
  {title: 'Column 6', dataIndex: 'address', key: '6'},
  {title: 'Column 7', dataIndex: 'address', key: '7'},
  {title: 'Column 8', dataIndex: 'address', key: '8'},
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="ZCYForm/123">action</a>,
  },
];

/**
 * 组件创建方法都是使用
 *
 * @description
 * 组件的创建方式： class name  extends React.Component
 * 组件名称都是使用驼峰命名规则
 */
class ZCYTable extends React.Component {

  //类的构造器
  constructor(props) {
    super(props);
    //初始化state在构造器中
    this.state = {
      qty: props.initialQty,
      image: props.image,
      price: props.price,
      total: 0
    };
  }

  componentWillMount() {
    this.props.init();
  }

  increaseQty() {
    this.setState({qty: this.state.qty + 1}, this.recalculateTotal);
  }

  recalculateTotal() {
    this.setState({total: this.state.qty * this.props.price});
  }

  /**
   *  render 方法使用jsx语法实现，所有属性不要使用解构赋值，导致一些无关属性变化导致组件重新render。
   *  所有属性都做对齐
   *  所有的方法绑定
   */

  render() {
    return <div>
      <ul>
        <li>数量:{this.state.qty}</li>
        <li>价格:{this.state.price}</li>
        <li>总价:{this.state.total}</li>
        <li>
          <button
            onClick={this.increaseQty.bind(this)}
          >test
          </button>
        </li>
      </ul>
      <Search search={this.props.search}
              reset={this.props.init}
      />
      <Table columns={columns}
             dataSource={this.props.list}
             scroll={{x: 1300}}
      />
    </div>
  }
}

//相关属性校验
ZCYTable.propTypes = {
  search: React.PropTypes.func.isRequired,
  init: React.PropTypes.func.isRequired,
  list: React.PropTypes.array
}
//默认属性值
ZCYTable.defaultProps = {
  title: 'test',
  price: 1,
  initialQty: 0
};

export default ZCYTable
