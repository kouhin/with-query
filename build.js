/* eslint  @typescript-eslint/no-var-requires:0, @typescript-eslint/camelcase: 0, import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const autoExternal = require('rollup-plugin-auto-external');

const pkg = require('./package.json');

const NAME = pkg.name
  .split(/-|_/)
  .filter((x) => x)
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function createOptions(format, outputPath, minify) {
  return {
    inputOptions: {
      input: pkg.source,
      plugins: [
        resolve({
          extensions,
        }),
        autoExternal(),
        babel({
          exclude: 'node_modules/**',
          extensions,
        }),
        commonjs({
          include: /node_modules/,
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),

        minify
          ? uglify({
              compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
              },
            })
          : null,
      ].filter((x) => x),
    },
    outputOptions: {
      file: outputPath,
      format,
      name: NAME,
      indent: false,
      exports: 'named',
      globals: {
        qs: 'qs',
      },
    },
  };
}

function generateMinPath(p) {
  const min = '.min';
  const pos = p.lastIndexOf('.');
  if (pos === -1) return `${p}${min}`;
  return `${p.substr(0, pos)}${min}${p.substr(pos)}`;
}

(async () => {
  const { module, main, 'umd:main': umd } = pkg;
  await Promise.all(
    [
      { format: 'es', outputPath: module },
      { format: 'cjs', outputPath: main },
      { format: 'umd', outputPath: umd },
      { format: 'umd', outputPath: generateMinPath(umd), minify: true },
    ]
      .filter((o) => o.outputPath)
      .map(async (build) => {
        const { format, outputPath, minify } = build;
        const { inputOptions, outputOptions } = createOptions(
          format,
          outputPath,
          minify
        );
        const bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
      })
  );
})();
