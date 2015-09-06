
var test = require('tape')
var getNow = Date.now.bind(Date)

module.exports = tapeExtra

function tapeExtra (name, testFn, cb) {
  return test(name, function (t) {
    var ctx = this
    var args = arguments
    tapeExtra.beforeEach(function () {
      patchTimeoutAfter(t)
      patchEnd(t)
      testFn.apply(ctx, args)
    })
  })
}

tapeExtra.afterEach = function (cb) {
  process.nextTick(cb)
}

tapeExtra.beforeEach = function (cb) {
  process.nextTick(cb)
}

function patchTimeoutAfter (t) {
  // don't let beforeEach count towards timeout
  // TODO: don't let afterEach count towards timeout
  var now = getNow()
  var timeoutAfter = t.timeoutAfter
  t.timeoutAfter = function (millis) {
    return timeoutAfter.call(t, millis + getNow() - now)
  }
}

function patchEnd (t) {
  var end = t._end
  t._end = function () {
    var endCtx = this
    var args = arguments
    tapeExtra.afterEach(function () {
      end.apply(endCtx, args)
    })
  }
}
