export default function getFileItem(file, fileList) {
  let matchWay = (!file.fileId) ? 'byName' : 'byFileId';
  let target = fileList.filter((item) => {
    if (matchWay === 'byName') {
      return item.name === file.name;
    }
    return item.fileId === file.fileId;
  })[0];
  return target;
}
