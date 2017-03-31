import React from 'react';
import { Form, Row, Col, Input, Button,DatePicker } from 'antd';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Form horizontal className="ant-advanced-search-form">
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button>清除条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default AdvancedSearchForm