// eslint-disable-next-line
import withQuery from '../src';

describe('withQuery()', () => {
  it('Format url with object query', () => {
    expect(
      withQuery('http://www.example.com', {
        a: 123,
        b: 'hello'
      })
    ).toEqual('http://www.example.com?a=123&b=hello');
  });

  it('Format url with string query', () => {
    expect(withQuery('http://www.example.com', 'a=123&b=hello')).toEqual(
      'http://www.example.com?a=123&b=hello'
    );
  });

  it('Append object query to url', () => {
    expect(
      withQuery('http://www.example.com?c=456', {
        a: 123,
        b: 'hello'
      })
    ).toEqual('http://www.example.com?c=456&a=123&b=hello');
  });

  it('Append string query to url', () => {
    expect(withQuery('http://www.example.com?c=456', 'a=123&b=hello')).toEqual(
      'http://www.example.com?c=456&a=123&b=hello'
    );
  });

  it('Append object query to url with hash', () => {
    expect(
      withQuery('http://www.example.com?c=456#Anchor', {
        a: 123,
        b: 'hello'
      })
    ).toEqual('http://www.example.com?c=456&a=123&b=hello#Anchor');
    expect(
      withQuery('http://www.example.com#Anchor?c=456', {
        a: 123,
        b: 'hello'
      })
    ).toEqual('http://www.example.com?c=456&a=123&b=hello#Anchor');
  });

  it('Append string query to url with hash', () => {
    expect(
      withQuery('http://www.example.com?c=456#Anchor', 'a=123&b=hello')
    ).toEqual('http://www.example.com?c=456&a=123&b=hello#Anchor');
    expect(
      withQuery('http://www.example.com#Anchor?c=456', 'a=123&b=hello')
    ).toEqual('http://www.example.com?c=456&a=123&b=hello#Anchor');
  });

  it('When url is null or undefined or empty, return query only', () => {
    expect(withQuery(null, 'a=123&b=hello')).toEqual('?a=123&b=hello');
    expect(withQuery(undefined, 'a=123&b=hello')).toEqual('?a=123&b=hello');
    expect(withQuery('', 'a=123&b=hello')).toEqual('?a=123&b=hello');
  });

  it('When query is a falsey value or empty object, do nothing', () => {
    expect(withQuery('http://www.example.com?c=456#Anchor')).toEqual(
      'http://www.example.com?c=456#Anchor'
    );
    expect(withQuery('http://www.example.com?')).toEqual(
      'http://www.example.com?'
    );
    expect(withQuery('http://www.example.com', undefined)).toEqual(
      'http://www.example.com'
    );
    expect(withQuery('http://www.example.com/', false as any)).toEqual(
      'http://www.example.com/'
    );
    expect(withQuery('http://www.example.com?', {})).toEqual(
      'http://www.example.com?'
    );
  });

  it('opts.parseOpt will be parsed to qs.parse', () => {
    expect(withQuery('http://www.example.com?a=b;c=d', { abc: 123 })).toEqual(
      'http://www.example.com?a=b%3Bc%3Dd&abc=123'
    );
    expect(
      withQuery(
        'http://www.example.com?a=b;c=d',
        { abc: 123 },
        {
          parseOpt: {
            delimiter: /[;,]/
          }
        }
      )
    ).toEqual('http://www.example.com?a=b&c=d&abc=123');
  });
  it('opts.stringifyOpt will be parsed to qs.parse', () => {
    expect(withQuery('http://www.example.com?a=b;c=d', { abc: 123 })).toEqual(
      'http://www.example.com?a=b%3Bc%3Dd&abc=123'
    );
    expect(
      withQuery(
        'http://www.example.com?a=b;c=d',
        { abc: 123 },
        {
          stringifyOpt: {
            encode: false
          }
        }
      )
    ).toEqual('http://www.example.com?a=b;c=d&abc=123');
  });

  it('opts.noHash = true will remove hash', () => {
    expect(
      withQuery('http://www.example.com?c=456#Anchor', 'a=123&b=hello', {
        noHash: true
      })
    ).toEqual('http://www.example.com?c=456&a=123&b=hello');
  });
  it('When url has more than one ?, the string after second ? will be ignored', () => {
    expect(withQuery('http://www.example.com?a=2?ad#abc', { c: 1 })).toEqual(
      'http://www.example.com?a=2&c=1'
    );
  });
  it('When query is a single value, and it is a string, qs will format string as expected', () => {
    expect(withQuery('http://www.example.com?a=2', 'b')).toEqual(
      'http://www.example.com?a=2&b='
    );
  });
  it('When query is a single value, and it is not a string, qs will format string as expected', () => {
    expect(withQuery('http://www.example.com?a=2', 123 as any)).toEqual(
      'http://www.example.com?a=2'
    );
    expect(withQuery('http://www.example.com?a=2', true as any)).toEqual(
      'http://www.example.com?a=2'
    );
    expect(withQuery('http://www.example.com', true as any)).toEqual(
      'http://www.example.com'
    );
  });
});
