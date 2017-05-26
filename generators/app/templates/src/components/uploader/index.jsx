import React from 'react';
import RcUpload from '../upload-zcy';
import UploadList from './uploadList';
import getFileItem from './getFileItem';
import { extension } from './mime';
import classNames from 'classnames';
const prefixCls = 'ant-upload';
import {
  getKey,
  transform,
  setFileIdForIE,
} from '../zcy-oss'

function noop() {
}

function T() {
  return true;
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    fileId: file.fileId,
    response: file.response,
    error: file.error,
    percent: 0,
    // IE8/9需要将预览保留
    thumbUrl: file.thumbUrl,
    originFileObj: file,
  };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function (s) {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start * 100;
  };
}

function UploadDragger(props) {
  return <Upload {...props} type="drag" style={{ height: props.height }} />;
}

export default class ZcyUpload extends React.Component {
  static Dragger = UploadDragger;

  static defaultProps = {
    type: 'select',
    // do not set
    // name: '',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    maxFile: 20,
    maxFileSize: 2,
    maxFileNameSize: 100,
    onChange: noop,
    beforeUpload: T,
    showUploadList: true,
    listType: 'text', // or pictrue
    className: '',
    success_action_status: '200',
    disabled: false,
  }

  state = {
    fileList: this.props.fileList || this.props.defaultFileList || [],
    dragState: 'drop',
  }

  onStart = (file) => {
    let targetItem;
    let nextFileList = this.state.fileList.concat();
    if (file.length > 0) {
      targetItem = file.map(f => {
        const fileObject = fileToObject(f);
        fileObject.status = 'uploading';
        return fileObject;
      });
      nextFileList = nextFileList.concat(targetItem);
    } else {
      targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      nextFileList.push(targetItem);
    }
    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
    if (!window.FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  }

  autoUpdateProgress(percent, file) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress({
        percent: curPercent,
      }, file);
    }, 200);
  }

  removeFile(file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    let index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  }

  onSuccess = (response, file) => {
    this.clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      if (response.indexOf('413') > -1) {
        this.props.onError && this.props.onError(evt, 'maxFileSize', file)
      }
      /* do nothing */
    }
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    if (this.props.beforeSuccess) {
      this.props.beforeSuccess(targetItem, response)
    }
    // console.info('onsuccess', targetItem)
    this.onChange({
      file: targetItem,
      fileList,
    });
  }

  onProgress = (e, file) => {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: targetItem,
      fileList: this.state.fileList,
    });
  }

  onError = (error, response, file) => {
    this.clearProgressTimer();
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.handleRemove(targetItem);
  }

  handleRemove(file) {
    let fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file,
        fileList,
      });
    }
  }

  handleManualRemove = (file) => {
    this.refs.upload.abort(file);
    /*eslint-disable */
    file.status = 'removed';
    /*eslint-enable */
    if ('onRemove' in this.props) {
      this.props.onRemove(file);
    } else {
      this.handleRemove(file);
    }
  }

  onChange = (info) => {
    // if (!('fileList' in this.props)) {
      this.setState({fileList: info.fileList});
    // }
    console.info('onChange111', this.state.fileList, info.fileList)
    this.props.onChange(info);
    console.info('onChange222', this.state.fileList, this.props)
  }

  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || [],
      });
    }
    console.info('componentWillReceiveProps', this.state.fileList)
  }

  componentDidMount() {
    let files = this.props.fileList || this.props.defaultFileList || []
    getKey(this.props.bizCode, this.props.userId)
      .then((oss) => {
        return transform(files).then((fileList) => {
          this.setState({
            oss,
            // fileList,
          })

          this.onChange({
            fileList,
          })
        })
      })
  }

  onFileDrop = (e) => {
    this.setState({
      dragState: e.type,
    });
  }

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  /**
   * 获取文件类型
   * 根据文件名获取结尾
   */
  getFileSuffix = (filename) => {
    if (!filename) {
      return ''
    }
    let splitArray = filename.split('.')
    if (splitArray.length === 1) {
      return ''
    }
    return splitArray[splitArray.length - 1]
  }

  /**
   * 检查是否是接收的类型
   * 用于IE8、9的判断，
   * 其他浏览器依赖于html5的accept属性即可
   */
  checkAccept = (file) => {
    if (!window.FormData && this.props.accept) {
      let isInclude = false
      const fileSuffix = file && this.getFileSuffix(file.name) || ''
      if (!fileSuffix) {
        return false
      }

      this.props.accept.split(',').forEach((type) => {
        const acceptType = extension(type)
        if (acceptType === fileSuffix) {
          isInclude = true
          return false
        }
      })
      return isInclude
    }
    return true
  }

  /**
   * 检查文件大小
   */
  checkMaxFileSize = (file) => {
    // IE8、9无法获取文件大小，依赖后端的结果来判断
    if (!window.FormData) {
      return true
    }

    const fileSize = file.size
    const limitFileSize = this.props.maxFileSize * 1024 * 1024
    return limitFileSize > fileSize
  }

  /**
   * 检查文件的数量
   */
  checkMaxFile = () => {
    return this.state.fileList.length < this.props.maxFile
  }

  beforeUpload = (file) => {
    if (!this.checkMaxFile()) {
      this.props.onError && this.props.onError('', 'maxFile', file);
      return false
    }
    // 检查文件类型
    if (!this.checkAccept(file)) {
      this.props.onError && this.props.onError('', 'notAcceptFile', file);
      return false
    }

    if (!this.checkMaxFileSize(file)) {
      this.props.onError && this.props.onError('', 'maxFileSize', file);
      return false
    }

    this.props.beforeUpload && this.props.beforeUpload(file)
  }

  render() {
    let uploadList;
    if (!this.props.fileList || !this.props.fileList.length) {
      return (<span></span>)
    }

    let type = this.props.type || 'select';
    let props = {
      ...this.props,
      ...this.state.oss,
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      beforeUpload: this.beforeUpload,
    };

    if (this.props.showUploadList) {
      console.info('render.....', this.state.fileList)
      uploadList = (
        <UploadList listType={this.props.listType}
          items={this.state.fileList}
          onPreview={props.onPreview}
          onRemove={this.handleManualRemove}
        />
      );
    }
    if (type === 'drag') {
      const dragCls = classNames({
        [prefixCls]: true,
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(file => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
        [`${prefixCls}-disabled`]: this.props.disabled,
      });
      return (
        <span className={this.props.className}>
          <div className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload {...props} ref="upload">
              <div className={`${prefixCls}-drag-container`}>
                {this.props.children}
              </div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${this.props.listType}`]: true,
      [`${prefixCls}-disabled`]: this.props.disabled,
    });

    const uploadButton = (
      <div className={uploadButtonCls} style={{ display: this.props.children ? '' : 'none' }}>
        <RcUpload {...props} ref="upload" />
      </div>
    );

    if (this.props.listType === 'picture-card') {
      return (
        <span className={this.props.className}>
          {uploadList}
          {uploadButton}
        </span>
      );
    }

    return (
      <span className={this.props.className}>
        {uploadButton}
        {uploadList}
      </span>
    );
  }
}
