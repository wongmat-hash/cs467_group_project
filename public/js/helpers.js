module.exports = {
  jsonHelper: function (context) {
    return JSON.parse(JSON.stringify(context))
  },
}
