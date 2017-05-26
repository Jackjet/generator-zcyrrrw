import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Upload from '../uploader'

import {
  getKey,
  transform,
  setFileIdForIE,
} from '../zcy-oss'

export default class Uploader extends Component {
  static propTypes = {
    bizCode: PropTypes.string,
    userId: PropTypes.string,
    fileList: PropTypes.array
  }

  state = {
    oss: null,
    fileList: [],
  }

  componentDidMount() {
    let files = this.props.fileList || this.props.defaultFileList || []
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
    console.info(this.props.fileList, this.state.fileList)
    if (this.props.fileList && this.props.fileList.length && (!this.state.fileList || !this.state.fileList.length)) {
      return null
    }

    console.info('render.......', this.state.fileList)
    let props = {
      ...this.props,
      ...this.state.oss,
      fileList: this.state.fileList,
      // ...this.state,
      beforeSuccess: setFileIdForIE,
    };

    // console.info('render', props)

    return (
      <Upload {...props} />
    )
  }
}