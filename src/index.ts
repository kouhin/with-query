import * as qs from 'qs';

export interface WithQueryOptions {
  stringifyOpt?: qs.IStringifyOptions;
  parseOpt?: qs.IParseOptions;
  noHash?: boolean;
}

function parseQuery(q: object | string, opt?: qs.IParseOptions): object {
  if (typeof q === 'object') {
    return q;
  }
  return q ? qs.parse(q, opt) : {};
}

export function withQuery(
  url: string | null = '',
  query?: object | string,
  opts?: WithQueryOptions
): string {
  if (
    !query ||
    (typeof query !== 'object' && typeof query !== 'string') ||
    (typeof query === 'object' && Object.keys(query).length < 1)
  ) {
    return url || '';
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
  const queryObj = parseQuery(query || '', parseOpt);
  const finalQuery = qs.stringify(
    {
      ...baseQueryObj,
      ...queryObj
    },
    stringifyOpt
  );
  return `${baseUrl}${finalQuery ? `?${finalQuery}` : ''}${
    !noHash && baseHash ? `#${baseHash}` : ''
  }`;
}
export default withQuery;
