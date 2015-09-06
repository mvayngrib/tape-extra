# tape-extra

For now, adds beforeEach/afterEach to [tape](https://github.com/substack/tape)

## Usage

```js
var test = require('tape-extra')
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

// should print:
// before 1
// after 1
// before 2
// after 2
```
