import qs from 'qs';
import objectAssign from 'object-assign';

function parseQuery(q, opt) {
  if (typeof q === 'object') {
    return q;
  }
  return q ? qs.parse(q, opt) : {};
}

export default function withQuery(url, query, opts) {
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
    [baseUrl, baseQuery] = parts;
  }

  // hash
  if (originalUrl.indexOf('#') !== -1) {
    if (baseUrl.indexOf('#') !== -1) {
      const parts = baseUrl.split('#');
      [baseUrl, baseHash] = parts;
    } else if (baseQuery && baseQuery.indexOf('#') !== -1) {
      const parts = baseQuery.split('#');
      [baseQuery, baseHash] = parts;
    } else {
      // noop
    }
  }

  const baseQueryObj = parseQuery(baseQuery, parseOpt);
  const queryObj = parseQuery(query, parseOpt);
  const finalQuery = qs.stringify(
    objectAssign({}, baseQueryObj, queryObj),
    stringifyOpt
  );
  return `${baseUrl}${finalQuery ? `?${finalQuery}` : ''}${
    !noHash && baseHash ? `#${baseHash}` : ''
  }`;
}
