const expect = require('chai').expect;
const withQuery = require('./index');

describe('withQuery()', () => {
  it('Format url with object query', () => {
    expect(withQuery('http://www.example.com', {
      a: 123,
      b: 'hello',
    })).to.equal('http://www.example.com?a=123&b=hello');
  });

  it('Format url with string query', () => {
    expect(withQuery('http://www.example.com', 'a=123&b=hello'))
      .to.equal('http://www.example.com?a=123&b=hello');
  });

  it('Append object query to url', () => {
    expect(withQuery('http://www.example.com?c=456', {
      a: 123,
      b: 'hello',
    })).to.equal('http://www.example.com?c=456&a=123&b=hello');
  });

  it('Append string query to url', () => {
    expect(withQuery('http://www.example.com?c=456', 'a=123&b=hello'))
      .to.equal('http://www.example.com?c=456&a=123&b=hello');
  });

  it('Append object query to url with hash', () => {
    expect(withQuery('http://www.example.com?c=456#Anchor', {
      a: 123,
      b: 'hello',
    })).to.equal('http://www.example.com?c=456&a=123&b=hello#Anchor');
    expect(withQuery('http://www.example.com#Anchor?c=456', {
      a: 123,
      b: 'hello',
    })).to.equal('http://www.example.com?c=456&a=123&b=hello#Anchor');
  });

  it('Append string query to url with hash', () => {
    expect(withQuery('http://www.example.com?c=456#Anchor', 'a=123&b=hello'))
      .to.equal('http://www.example.com?c=456&a=123&b=hello#Anchor');
    expect(withQuery('http://www.example.com#Anchor?c=456', 'a=123&b=hello'))
      .to.equal('http://www.example.com?c=456&a=123&b=hello#Anchor');
  });

  it('When url is null or undefined or empty, return query only', () => {
    expect(withQuery(null, 'a=123&b=hello'))
      .to.equal('?a=123&b=hello');
    expect(withQuery(undefined, 'a=123&b=hello'))
      .to.equal('?a=123&b=hello');
    expect(withQuery('', 'a=123&b=hello'))
      .to.equal('?a=123&b=hello');
  });

  it('When query is a falsey value or empty object, do nothing', () => {
    expect(withQuery('http://www.example.com?c=456#Anchor'))
      .to.equal('http://www.example.com?c=456#Anchor');
    expect(withQuery('http://www.example.com?', null))
      .to.equal('http://www.example.com?');
    expect(withQuery('http://www.example.com', undefined))
      .to.equal('http://www.example.com');
    expect(withQuery('http://www.example.com/', false))
      .to.equal('http://www.example.com/');
    expect(withQuery('http://www.example.com?', {}))
      .to.equal('http://www.example.com?');
  });

  it('opts.parseOpt will be parsed to qs.parse', () => {
    expect(withQuery('http://www.example.com?a=b;c=d', { abc: 123 }))
      .to.equal('http://www.example.com?a=b%3Bc%3Dd&abc=123');
    expect(withQuery('http://www.example.com?a=b;c=d', { abc: 123 }, {
      parseOpt: {
        delimiter: /[;,]/,
      },
    })).to.equal('http://www.example.com?a=b&c=d&abc=123');
  });
  it('opts.stringifyOpt will be parsed to qs.parse', () => {
    expect(withQuery('http://www.example.com?a=b;c=d', { abc: 123 }))
      .to.equal('http://www.example.com?a=b%3Bc%3Dd&abc=123');
    expect(withQuery('http://www.example.com?a=b;c=d', { abc: 123 }, {
      stringifyOpt: {
        encode: false,
      },
    })).to.equal('http://www.example.com?a=b;c=d&abc=123');
  });

  it('opts.noHash = true will remove hash', () => {
    expect(withQuery('http://www.example.com?c=456#Anchor', 'a=123&b=hello', { noHash: true }))
      .to.equal('http://www.example.com?c=456&a=123&b=hello');
  });
  it('When url has more than one ?, the string after second ? will be ignored', () => {
    expect(withQuery('http://www.example.com?a=2?ad#abc', { c: 1 }))
      .to.equal('http://www.example.com?a=2&c=1');
  });
  it('When query is a single value, and it is a string, qs will format string as expected', () => {
    expect(withQuery('http://www.example.com?a=2', 'b'))
      .to.equal('http://www.example.com?a=2&b=');
  });
  it('When query is a single value, and it is not a string, qs will format string as expected', () => {
    expect(withQuery('http://www.example.com?a=2', 123))
      .to.equal('http://www.example.com?a=2');
    expect(withQuery('http://www.example.com?a=2', true))
      .to.equal('http://www.example.com?a=2');
    expect(withQuery('http://www.example.com', true))
      .to.equal('http://www.example.com');
  });
});
