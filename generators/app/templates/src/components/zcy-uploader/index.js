import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Upload from '../uploader'

import {
  getKey,
  transform,
  setFileIdForIE,
} from './oss'


export default class Uploader extends Component {
  static propTypes = {
    bizCode: PropTypes.string,
    userId: PropTypes.string,
    defaultFileList: PropTypes.array
  }

  state = {
    oss: null,
    defaultFileList: [],
  }

  componentDidMount() {
    let files = this.props.defaultFileList
    getKey(this.props.bizCode, this.props.userId)
      .then((oss) => {
        return transform(files).then((fileList) => {
          this.setState({
            oss,
            fileList,
          })
        })
      })
  }

  render() {
    if (this.props.defaultFileList && this.props.defaultFileList.length && (!this.state.fileList || !this.state.fileList.length)) {
      return <span></span>
    }

    let props = {
      ...this.props,
      ...this.state.oss,
      defaultFileList: this.state.fileList,
      beforeSuccess: setFileIdForIE,
    };

    return (
      <Upload {...props} />
    )
  }
}