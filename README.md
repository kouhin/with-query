with-query
=======

Format url with query (string or object), simple and fast, with the power of [qs](https://github.com/ljharb/qs).

The typical usage of this library is building URL for [Fetch API](https://fetch.spec.whatwg.org). It can be used both on server side and browser side.

[![CircleCI](https://img.shields.io/circleci/project/github/kouhin/with-query.svg)](https://circleci.com/gh/kouhin/with-query/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/kouhin/with-query/badge.svg?branch=master)](https://coveralls.io/github/kouhin/with-query?branch=master)
[![npm](https://img.shields.io/npm/v/with-query.svg)](https://www.npmjs.com/package/with-query)
[![dependency status](https://david-dm.org/kouhin/with-query.svg?style=flat-square)](https://david-dm.org/kouhin/with-query)
[![airbnb style](https://img.shields.io/badge/code_style-airbnb-blue.svg)](https://github.com/airbnb/javascript)

``` javascript
const withQuery = require('with-query');

fetch(withQuery('https://api.github.com/search/repositories', {
  q: 'query',
  sort: 'stars',
  order: 'asc',
}))
.then(res => res.json())
.then((json) => {
  console.info(json);
})
.catch((err) => {
  console.error(err);
});
```

## Installation

- npm

``` shell
npm install with-query --save
```

- yarn

``` shell
yarn add with-query
```

## Usage

``` javascript
var withQuery = require('with-query');
var assert = require('assert');

const result1 = withQuery('http://example.com', {
  a: 1,
  b: 'hello',
});
assert.equal(result1, 'http://example.com?a=1&b=hello');

// Append and override the query in url
const result2 = withQuery('http://example.com?a=3&c=4&d=5', {
  a: 1,
  b: 'hello',
});
assert.equal(result2, 'http://example.com?a=1&c=4&d=5&b=hello');

// Hash is also supported
const result3 = withQuery('http://example.com?a=3&c=4&d=5#Append', {
  a: 1,
  b: 'hello',
});
assert.equal(result3, 'http://example.com?a=1&c=4&d=5&b=hello#Append');

// Remove hash
const result4 = withQuery('http://example.com?a=3&c=4&d=5#Append', {
  a: 1,
  b: 'hello',
}, { noHash: true });
assert.equal(result4, 'http://example.com?a=1&c=4&d=5&b=hello');

// with the power of qs
const result5 = withQuery('http://example.com?e[]=f', {
  a: {
    b: 'c',
  },
});
assert.equal(result5, 'http://example.com?e%5B0%5D=f&a%5Bb%5D=c');

// parseOpt and stringifyOpt for qs.parse and qs.stringify
// see https://github.com/ljharb/qs
const result6 = withQuery('http://example.com&e[]=f', {
  a: {
    b: 'c',
  },
}, {
  stringifyOpt: {
    encode: false,
  },
  parseOpt: {
    parseArray: false,
  },
});
assert.equal(result6, 'http://example.com&e[]=f?a[b]=c');
```

## License

MIT
