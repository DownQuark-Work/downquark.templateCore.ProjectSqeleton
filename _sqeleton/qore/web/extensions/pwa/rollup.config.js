import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		// input: 'src/main.ts',
		// input:'atomic/1.atoms/button.ts',
		input:'src/app/index.ts',
		output: {
			name: 'dq',
			file: pkg.transpile,
			// file: '_extension/TRANSPILED/dq.pwa.umd.js',
			format: 'umd'
		},
		plugins: [
			resolve(),   // so Rollup can find `ms`
			commonjs(),  // so Rollup can convert `ms` to an ES module
			typescript() // so Rollup can convert TypeScript to JavaScript
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	// {
	// 	input:'src/app/index.ts',
	// 	external: ['lit','lit/decorators.js'],
	// 	plugins: [
	// 		typescript() // so Rollup can convert TypeScript to JavaScript
	// 	],
	// 	output: [
	// 		// { file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.transpile, format: 'es' }
	// 	]
	// }
];