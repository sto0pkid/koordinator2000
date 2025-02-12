import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);



const aliases = alias({
  resolve: ['.svelte', '.js'], //optional, by default this will just look for .js files or folders
  entries: [
    { find: 'srcs', replacement: 'src' },
    { find: 'cmps', replacement: 'src/components' },
  ]
});





export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [

			aliases,
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				compilerOptions: {
					dev,
					hydratable: true
				}
			}),
			json(),
			url({
				sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
				publicPath: '/client/'
			}),
			
			resolve({
				preferBuiltins: false,
				browser: true,
				extensions: ['.js', '.svelte', '.jsx', '.mjs'],
				dedupe: ['svelte']
			}),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
			
		],

		preserveEntrySignatures: false,
		onwarn

	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			aliases,
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				compilerOptions: {
					dev,
					generate: 'ssr',
					hydratable: true
				},
				emitCss: false
			}),
			url({
				sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
				publicPath: '/client/',
				emitFiles: false // already emitted by client build
			}),
			resolve({
				preferBuiltins: false,
				dedupe: ['svelte'],
   				extensions: ['.js', '.svelte', '.jsx', '.mjs'],
			}),
			json(),
			commonjs()
		],
		//external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),

		preserveEntrySignatures: 'strict',
		onwarn,
	}
};
