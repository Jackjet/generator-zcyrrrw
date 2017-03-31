import React from 'react';
import {Table} from 'antd';
import Search from '../../../components/Search';

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

class ZCYTable extends React.Component {

  componentWillMount(){
    this.props.init();
  }

  shouldComponentUpdate(){
    return true;
  }
  render() {
    return ( <div>
                <Search search={this.props.search} reset={this.props.init}/>
                <Table columns={columns} dataSource={this.props.list} scroll={{x: 1300}}/>
             </div>
           )
    }
}

ZCYTable.propTypes = {
  search : React.PropTypes.func.isRequired,
  list : React.PropTypes.array
}
export default ZCYTable
