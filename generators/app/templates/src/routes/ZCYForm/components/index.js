import React from 'react';

import { Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
  Cascader, Slider, Button, Col, Upload, Icon } from 'antd';

import Request from '../../../utils/request'
import ZcyUploader from '../../../components/uploader'
// import ZcyUploader from '../../../components/zcy-uploader'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const areaData = [{
  value: 'shanghai',
  label: '上海',
  children: [{
    value: 'shanghaishi',
    label: '上海市',
    children: [{
      value: 'pudongxinqu',
      label: '浦东新区',
    }],
  }],
}];

let uploaderProps = {
  listType: 'picture',
  maxFile: 3,
  beforeUpload(file) {
    console.log('beforeUpload', file.name);
  },
  onStart: (file) => {
    console.log('onStart', file.name);
  },
  onSuccess(file) {
    console.log('onSuccess', file);
  },
  // onChange(file) {
  //   console.info('onchange....')
  // },
  onProgress(step, file) {
    console.log('onProgress', Math.round(step.percent), file.name);
  },
  onError(err, type, file) {
    if (type == 'maxFile') {
       console.log('onError maxFile');
    }
  },
}

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  normFile(e, prevValue, allValues) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },

  componentWillMount() {
    const { getFieldProps } = this.props.form;
    /**
     * 获取上传的token
     */
    let props = {
      ...getFieldProps('logo', {
        valuePropName: 'fileList',
        normalize: this.normFile,
      }),
      ...uploaderProps,
      bizCode: '1099',
      userId: '100012584',
      fileList: [{
        fileId: '1099OT/null/1000139122/3bc7f03f-230d-4d2e-8a7d-613e2c89ac84',
        name: 'test.jpg',
        type: 'image/png',
        size: 1024
      }, {
        fileId: '1099OT/339900/100012584/92128f04-926d-4126-94d1-acbdc7e76d22',
        name: 'test.jpg',
        type: 'image/png',
        size: 1024
      }]
    }

    this.setState({uploaderProps: props})
    return null
  },

  render() {
    // console.info('this.state.uploaderProps', this.state.uploaderProps)
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
        <FormItem
          label="InputNumber 数字输入框"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <InputNumber min={1} max={10} style={{ width: 100 }}
                       {...getFieldProps('inputNumber', { initialValue: 3 })}
          />
          <span className="ant-form-text"> 台机器</span>
        </FormItem>

        <FormItem
          label="我是标题"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <p className="ant-form-text" id="static" name="static">唧唧复唧唧木兰当户织呀</p>
          <p className="ant-form-text">
            <a href="#">链接文字</a>
          </p>
        </FormItem>

        <FormItem
          label="Switch 开关"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          <Switch {...getFieldProps('switch', { valuePropName: 'checked' })} />
        </FormItem>

        <FormItem
          label="Slider 滑动输入条"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} {...getFieldProps('slider')} />
        </FormItem>

        <FormItem
          label="Select 选择器"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          <Select style={{ width: 200 }}
                  {...getFieldProps('select')}
          >
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem
          label="级联选择"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
          hasFeedback
        >
          <Cascader style={{ width: 200 }} options={areaData} {...getFieldProps('area')} />
        </FormItem>

        <FormItem
          label="DatePicker 日期选择框"
          labelCol={{ span: 8 }}
          required
        >
          <Col span="6">
            <FormItem>
              <DatePicker {...getFieldProps('startDate')} />
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="6">
            <FormItem>
              <DatePicker {...getFieldProps('endDate')} />
            </FormItem>
          </Col>
        </FormItem>


        <FormItem
          label="TimePicker 时间选择器"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          <TimePicker {...getFieldProps('time')} />
        </FormItem>

        <FormItem
          label="选项"
          labelCol={{ span: 8 }}
        >
          <RadioGroup {...getFieldProps('rg')}>
            <RadioButton value="a">选项一</RadioButton>
            <RadioButton value="b">选项二</RadioButton>
            <RadioButton value="c">选项三</RadioButton>
          </RadioGroup>
        </FormItem>

        {
        this.state.uploaderProps &&
          <FormItem
          label="logo图"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          help="提示信息要长长长长长长长长长长长长长长"
        >
          <ZcyUploader {...this.state.uploaderProps}>
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </ZcyUploader>
        </FormItem>
        }

        <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);
export default Demo;
