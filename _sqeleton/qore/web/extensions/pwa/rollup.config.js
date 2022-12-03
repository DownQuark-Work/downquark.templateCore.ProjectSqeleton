import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
	{ // browser-friendly UMD build
		input:'src/app/index.ts',
		output: {
			name: 'dq',
			file: pkg.transpile,
			format: 'umd'
		},
		plugins: [
			resolve(),   // so Rollup can find entrypoint
			commonjs(),  // so Rollup can convert `entrypoint to an ES module
			typescript() // so Rollup can convert TypeScript to JavaScript
		]
	},
];