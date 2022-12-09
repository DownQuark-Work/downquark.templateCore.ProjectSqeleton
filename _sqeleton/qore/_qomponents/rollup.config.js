import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss'
import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

const componentFiles = Object.fromEntries(
	glob.sync('atomic/**/*.ts').map(file => [
		path.relative('atomic', file.slice(0, file.length - path.extname(file).length)),
		fileURLToPath(new URL(file, import.meta.url))
	])
)

const outputUMD = {
	name: 'dq',
	// dir:'_dist/umd/atoms',
	format: 'umd',
	assetFileNames: '[name][extname]', // Removes the hash from the asset filename
}
const pluginsUMD = [
	resolve(),   // so Rollup can find `mjs`
	commonjs(),  // so Rollup can convert `mjs` to an ES module
	typescript(), // so Rollup can convert TypeScript to JavaScript
]

const umdBuildConfig = Object.entries(componentFiles).map((cmpnt,indx) => {
	const outputPath  = cmpnt[0].replace(/^\d\./i,'').split('/').shift()
	outputUMD.dir = '_dist/umd/'+outputPath
	const mutatedpluginsUMD = [...pluginsUMD]
	mutatedpluginsUMD.unshift(scss({ insert: true }))
	return {
		input: 'atomic/'+cmpnt[0]+'.ts',
		output: outputUMD,
		plugins: mutatedpluginsUMD
	}
})

const commonEcmaBuildConfig = {
	input:'atomic/1.atoms/button.ts',
	external: ['lit','lit/decorators.js'],
	plugins: [
		scss({ output: false, }), // output created with UMD compilation 
		typescript(), // so Rollup can convert TypeScript to JavaScript
	],
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' }
	]
}
/* if needed: make a new component that imports all css files being imported by all other
  components. Export _only_ the bundled css. This will allow a single file to import that
	contains tree-shaken styles. */
// scss({fileName: '_assets/styles/component-import.css'})

export default [...umdBuildConfig, commonEcmaBuildConfig]
// 	// CommonJS (for Node) and ES module (for bundlers) build.
// 	// (We could have three entries in the configuration array
// 	// instead of two, but it's quicker to generate multiple
// 	// builds from a single configuration where possible, using
// 	// an array for the `output` option, where we can specify 
// 	// `file` and `format` for each target)

	// {
	// 	input:'atomic/1.atoms/button.ts',
	// 	external: ['lit','lit/decorators.js'],
	// 	plugins: [
	// 		scss({ output: false, }), // output created with UMD compilation 
	// 		typescript(), // so Rollup can convert TypeScript to JavaScript
	// 	],
	// 	output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' }
	// 	]
	// }
// ];