import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: './src/midiplex.ts',
    //external: ['webmidi'],
    output: {
        sourcemap: true,
        file: './dist/midiplex.min.js',
        format: 'umd',
        name: 'Midiplex',
        plugins: [terser({
            compress: true,
            mangle: false //When true, seems to break imports of minified lib
        })],
        // globals: {
        //     webmidi: 'WebMidi'
        // }
    },
    plugins: [typescript(), nodeResolve(), babel({ babelHelpers: 'bundled', extensions: ['.ts', '.tsx'] })],
};