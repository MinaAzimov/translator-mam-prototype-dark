const ReactTools = require('react-tools')

module.exports = {
  process: function (src) {
    return ReactTools.transform(src, {harmony: true, stripTypes: true})
  }
}
