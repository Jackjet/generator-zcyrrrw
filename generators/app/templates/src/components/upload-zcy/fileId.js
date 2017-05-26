
export default function getFileId() {
  /* eslint-disable */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    let date = new Date().getTime()
    const random = (date + Math.random() * 16) % 16 | 0
    date = Math.floor(date / 16)
    const str = char === 'x' ? random : (random & 0x3 | 0x8)
    return str.toString(16)
  })
  /* eslint-enable */
}
