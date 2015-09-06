var test = require('./')
var count = 0

test.beforeEach = function (done) {
  console.log('before', ++count)
  setTimeout(done, 100)
}

test.afterEach = function (done) {
  console.log('after', count)
  setTimeout(done, 100)
}

test('fun is fun', function (t) {
  t.equal('fun', 'fun')
  t.end()
})

test('fun is not not fun', function (t) {
  t.notEqual('fun', 'not fun')
  t.end()
})
