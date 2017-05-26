/**
 * 只添加部分常用的类型，如果后期有扩展，再进行添加
 * 可参考https://github.com/broofa/node-mime
 */
const mimes = {
  'image/bmp': [
    'bmp'
  ],
  'image/gif': [
    'gif'
  ],
  'image/jpeg': [
    'jpeg',
    'jpg',
    'jpe'
  ],
  'image/png': [
    'png'
  ],
  'application/msword': [
    'doc',
    'dot'
  ],
  'application/vnd.ms-powerpoint': [
    'ppt',
    'pps',
    'pot'
  ],
  'application/vnd.ms-excel': [
    'xls',
    'xlm',
    'xla',
    'xlc',
    'xlt',
    'xlw'
  ],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    'docx'
  ],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    'xlsx'
  ],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
    'pptx'
  ]
}

let types = {}
let extensions = {}

function load () {
  for (let type in mimes) {
    var exts = mimes[type]
    for (var i = 0; i < exts.length; i++) {
      types[exts[i]] = type
    }

    // 默认取第一个
    if (!extensions[type]) {
      extensions[type] = exts[0]
    }
  }
}

// 先初始化
load()
export default function lookup (path, fallback) {
  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase()
  return types[ext] || fallback
}

export function extension (mimeType) {
  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase()
  return extensions[type]
};
