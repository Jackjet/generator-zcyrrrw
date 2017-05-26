/* eslint react/no-is-mounted:0 react/sort-comp:0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import defaultRequest from './request';
import getFileId from './fileId';

class AjaxUploader extends Component {
  static propTypes = {
    component: PropTypes.string,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    children: PropTypes.any,
    onStart: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    headers: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    beforeUpload: PropTypes.func,
    customRequest: PropTypes.func,
    onProgress: PropTypes.func,
    withCredentials: PropTypes.bool,
  }

  state = { fileId: getFileId() }

  reqs = {}

  onChange = e => {
    const files = e.target.files;
    this.uploadFiles(files);
    this.reset();
  }

  onClick = () => {
    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.onClick();
    }
  }

  onFileDrop = e => {
    if (e.type === 'dragover') {
      e.preventDefault();
      return;
    }

    const files = e.dataTransfer.files;
    this.uploadFiles(files);

    e.preventDefault();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.abort();
  }

  uploadFiles(files) {
    const postFiles = Array.prototype.slice.call(files);
    const len = postFiles.length;
    for (let i = 0; i < len; i++) {
      const file = postFiles[i];
      file.fileId = getFileId();
      this.upload(file, postFiles);
    }
  }

  upload(file, fileList) {
    const { props } = this;
    if (!props.beforeUpload) {
      // always async in case use react state to keep fileList
      return setTimeout(() => this.post(file), 0);
    }

    const before = props.beforeUpload(file, fileList);
    if (before && before.then) {
      before.then((processedFile) => {
        const processedFileType = Object.prototype.toString.call(processedFile);
        if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
          this.post(processedFile);
        } else {
          this.post(file);
        }
      }).catch(e => {
        console && console.log(e); // eslint-disable-line
      });
    } else if (before !== false) {
      setTimeout(() => this.post(file), 0);
    }
  }

  post(file) {
    if (!this._isMounted) {
      return;
    }
    const { props } = this;
    let { data, headers } = props;
    const { onStart, onProgress } = props;
    if (typeof data === 'function') {
      data = data(file);
    }
    if (typeof headers === 'function') {
      headers = headers(file);
    }
    const fileId = getFileId()
    file.fileId = fileId
    const request = props.customRequest || defaultRequest;
    this.reqs[fileId] = request({
      action: props.action,
      filename: props.name,
      file,
      data,
      headers,
      withCredentials: props.withCredentials,
      onProgress: onProgress ? e => {
        onProgress(e, file);
      } : null,
      onSuccess: ret => {
        delete this.reqs[fileId];
        props.onSuccess(ret, file);
      },
      onError: (err, ret) => {
        delete this.reqs[fileId];
        props.onError(err, ret, file);
      },
    });
    onStart(file);
  }

  reset() {
    this.setState({
      fileId: getFileId(),
    });
  }

  abort(file) {
    const { reqs } = this;
    if (file) {
      let fileId = file;
      if (file && file.fileId) {
        fileId = file.fileId;
      }
      if (reqs[fileId]) {
        reqs[fileId].abort();
        delete reqs[fileId];
      }
    } else {
      Object.keys(reqs).forEach((fileId) => {
        if (reqs[fileId]) {
          reqs[fileId].abort();
        }

        delete reqs[fileId];
      });
    }
  }

  render() {
    const {
      component: Tag, prefixCls, className, disabled,
      style, multiple, accept, children,
    } = this.props;
    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [className]: className,
    });
    const events = disabled ? {} : {
      onClick: this.onClick,
      onKeyDown: this.onKeyDown,
      onDrop: this.onFileDrop,
      onDragOver: this.onFileDrop,
      tabIndex: '0',
    };
    return (
      <Tag
        {...events}
        className={cls}
        role="button"
        style={style}
      >
        <input
          type="file"
          ref="file"
          key={this.state.fileId}
          style={{ display: 'none' }}
          accept={accept}
          multiple={multiple}
          onChange={this.onChange}
        />
        {children}
      </Tag>
    );
  }
}

export default AjaxUploader;
