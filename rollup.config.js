import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: "dist/koinos-pb-to-proto.js",
      format: "umd",
      name: 'KoinosPbToProto',
      exports: 'named'
    },
    {
      file: "dist/koinos-pb-to-proto.min.js",
      format: "umd",
      name: 'KoinosPbToProto',
      exports: 'named',
      plugins: [
        terser(
          {
            output: {
              ascii_only: true
            }
          }
        ),
      ]
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonJS(),
    nodePolyfills({ include: null }),
  ]
};