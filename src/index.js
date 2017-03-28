const qs = require('qs');
const objectAssign = require('object-assign');

function parseQuery(q, opt) {
  if (typeof q === 'object') {
    return q;
  }
  return q ? qs.parse(q, opt) : {};
}

function withQuery(url, query, opts) {
  if (!query || (typeof query === 'object' && Object.keys(query).length < 1)) {
    return url;
  }
  const parseOpt = (opts && opts.parseOpt) || {};
  const stringifyOpt = (opts && opts.stringifyOpt) || {};
  const noHash = (opts && opts.noHash) || false;

  const originalUrl = url || '';
  let baseUrl = originalUrl;
  let baseQuery = '';
  let baseHash = '';

  // query
  if (originalUrl.indexOf('?') !== -1) {
    const parts = baseUrl.split('?');
    baseUrl = parts[0];
    baseQuery = parts[1];
  }

  // hash
  if (originalUrl.indexOf('#') !== -1) {
    if (baseUrl.indexOf('#') !== -1) {
      const parts = baseUrl.split('#');
      baseUrl = parts[0];
      baseHash = parts[1];
    } else if (baseQuery && baseQuery.indexOf('#') !== -1) {
      const parts = baseQuery.split('#');
      baseQuery = parts[0];
      baseHash = parts[1];
    } else {
      // noop
    }
  }

  const baseQueryObj = parseQuery(baseQuery, parseOpt);
  const queryObj = parseQuery(query, parseOpt);
  const finalQuery = qs.stringify(objectAssign({}, baseQueryObj, queryObj), stringifyOpt);
  return `${baseUrl}${finalQuery ? `?${finalQuery}` : ''}${!noHash && baseHash ? `#${baseHash}` : ''}`;
}
exports = withQuery;
module.exports = exports;
