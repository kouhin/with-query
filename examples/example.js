const assert = require('assert');
const withQuery = require('../dist/with-query').default;

const result1 = withQuery('http://example.com', {
  a: 1,
  b: 'hello'
});
assert.equal(result1, 'http://example.com?a=1&b=hello');

// Append and override the query in url
const result2 = withQuery('http://example.com?a=3&c=4&d=5', {
  a: 1,
  b: 'hello'
});
assert.equal(result2, 'http://example.com?a=1&c=4&d=5&b=hello');

// Hash is also supported
const result3 = withQuery('http://example.com?a=3&c=4&d=5#Append', {
  a: 1,
  b: 'hello'
});
assert.equal(result3, 'http://example.com?a=1&c=4&d=5&b=hello#Append');

// Remove hash
const result4 = withQuery(
  'http://example.com?a=3&c=4&d=5#Append',
  {
    a: 1,
    b: 'hello'
  },
  { noHash: true }
);
assert.equal(result4, 'http://example.com?a=1&c=4&d=5&b=hello');

// with the power of qs
const result5 = withQuery('http://example.com?e[]=f', {
  a: {
    b: 'c'
  }
});
assert.equal(result5, 'http://example.com?e%5B0%5D=f&a%5Bb%5D=c');

// parseOpt and stringifyOpt for qs.parse and qs.stringify
const result6 = withQuery(
  'http://example.com&e[]=f',
  {
    a: {
      b: 'c'
    }
  },
  {
    stringifyOpt: {
      encode: false
    },
    parseOpt: {
      parseArray: false
    }
  }
);
assert.equal(result6, 'http://example.com&e[]=f?a[b]=c');
