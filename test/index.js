var test = require('../')
var assert = require('assert')

var afterEachCalled
var beforeEachCalled
test.beforeEach = function beforeEach (cb) {
  beforeEachCalled = true
  setTimeout(cb, 300)
}

test.afterEach = function afterEach (cb) {
  afterEachCalled = true
  cb()
}

test('beforeEach', function (t) {
  t.plan(2)
  // test that beforeEach doesn't count towards test timeout
  t.timeoutAfter(100)
  t.equal(beforeEachCalled, true)
  t.equal(afterEachCalled, undefined)
})

test('afterEach', function (t) {
  t.plan(1)
  t.equal(afterEachCalled, true)
})
