/* eslint-disable */
/**
 * Babel will compile modern JavaScript down to a format compatible with older browsers, but it will also increase your
 * final bundle size and build speed. Edit the `browserslist` property in the package.json file to define which
 * browsers Babel should target.
 *
 * Browserslist documentation: https://github.com/browserslist/browserslist#browserslist-
 */
/** ****************************************************************************************************************** */
/** ********                                             Webpack                                             ********* */
/** ****************************************************************************************************************** */

import Webpack from 'webpack';
import WebpackDev from 'webpack-dev-server';
import SveltePreprocess from 'svelte-preprocess';
import Autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
// const CopyPlugin = require('copy-webpack-plugin');

import fs from 'fs';
import path from 'path';

const useBabel = true;

/**
 * This option controls whether or not development builds should be compiled with Babel. Change this to `true` if you
 * intend to test with older browsers during development, but it could significantly impact your build speed.
 */
const useBabelInDevelopment = false;

/**
 * Define paths to any stylesheets you wish to include at the top of the CSS bundle. Any styles compiled from svelte
 * will be added to the bundle after these. In other words, these are global styles for your svelte app. You can also
 * specify paths to LESS or SASS files, and they will be compiled automatically.
 */
const stylesheets = ['./src/shared/styles/reset.less', './src/shared/styles/global.less'];

/**
 * Change this to `true` to generate source maps alongside your production bundle. This is useful for debugging, but
 * will increase total bundle size and expose your source code.
 */
const sourceMapsInProduction = false;

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

const config: Configuration = {
	mode: isProduction ? 'production' : 'development',
	entry: {
		bundle: [...stylesheets, './src/main.ts'],
	},
	resolve: {
		alias: {
			// Note: Later in this config file, we'll automatically add paths from `tsconfig.compilerOptions.paths`
			svelte: path.resolve('node_modules', 'svelte/src/runtime'), // Svelte 4 'svelte' -> 'svelte/src/runtime
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
	},
	output: {
		path: path.resolve(__dirname, 'public/build'),
		publicPath: '/build/',
		filename: '[name].js',
		chunkFilename: '[name].[id].js',
		clean: true,
		// environment: {
		// 	arrowFunction: false
		// },
		// iife: false
	},
	module: {
		rules: [
			// Rule: Svelte
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							// Dev mode must be enabled for HMR to work!
							dev: isDevelopment,
						},
						emitCss: isProduction,
						hotReload: isDevelopment,
						hotOptions: {
							// List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
							noPreserveState: false,
							optimistic: true,
						},
						preprocess: SveltePreprocess({
							less: true,
							postcss: {
								plugins: [Autoprefixer],
							},
						}),
						onwarn: (warning: { code: string }, handler: (config: { code: string }) => void) => {
							if (warning.code === 'css-unused-selector') {
								return;
							}
							handler(warning);
						},
					},
				},
			},
			{
				test: /\.(png|gif|jpg|jpeg|svg|mov|mp4)$/,
				type: 'asset',                                  // can be asset/resource, asset/inline, asset or asset/source
				parser: {
					dataUrlCondition: {
						maxSize: 1024 * 2                           // to change the maxsize of the asset to be inlined
					}
				}
			},
			// Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
			// See: https://github.com/sveltejs/svelte-loader#usage
			{
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false,
				},
			},
			// Rule: LESS | CSS
			{
				test: /\.(le|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader", options: {
							sourceMap: true, url: {
								filter: (url: string, resourcePath: string) => {
									// resourcePath - path to css file

									// We are disabling import resolves for png found in css. Svelte doesn't allow imported images to be used in url
									// Don't handle 'png' urls
									if (url.includes(".png")) {
										return false;
									}

									// If path to url contains /build/ then don't resolve
									// Don't handle images under root-relative /build/
									// if (/^\/build\//.test(resourcePath)) {
									// 	return false;
									// }

									return true;
								}
							}
						}
					},
					{ loader: "less-loader", options: { sourceMap: true } },
				],
			},

			// Rule: TypeScript
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		hot: true,
		devMiddleware: {
			stats: 'errors-only',
			writeToDisk: true,
		},
		static: {
			directory: path.join(__dirname, "public"),
			watch: true
		},
	},
	target: isDevelopment ? 'web' : 'browserslist',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',                                         // The default - relative to the path specified in output property
				// path.join(process.cwd(), 'additional_dir_contents_to_be_removed/**/*')   // process.cwd() current working directory
			]
		}),
		new CopyPlugin({                                    // Works perfectly with the hot reload feature. Automatically replaces any files modified in the 'from' folder when server is running  
			patterns: [
				{ from: path.resolve(__dirname, 'src/app/assets'), to: path.resolve(__dirname, 'public/build/src/app/assets') },
			],
		}),
	],
	devtool: isProduction && !sourceMapsInProduction ? false : 'source-map',
	stats: {
		chunks: false,
		chunkModules: false,
		modules: false,
		assets: true,
		entrypoints: false,
	},
};

/**
 * This interface combines configuration from `webpack` and `webpack-dev-server`. You can add or override properties
 * in this interface to change the config object type used above.
 */
export interface Configuration extends Webpack.Configuration, WebpackDev.Configuration { }

/** ****************************************************************************************************************** */
/** ********                                             Advanced                                            ********* */
/** ****************************************************************************************************************** */

// Configuration for production bundles
if (isProduction) {
	// Clean the build directory for production builds
	// config.plugins?.push(new CleanWebpackPlugin());

	// Minify CSS files
	config.optimization?.minimizer?.push(
		new CSSMinimizerPlugin({
			parallel: true,
			minimizerOptions: {
				preset: [
					'default',
					{
						discardComments: { removeAll: !sourceMapsInProduction },
					},
				],
			},
		})
	);

	// Minify and treeshake JS
	if (config.optimization === undefined) {
		config.optimization = {};
	}

	config.optimization.minimize = true;
}

// Parse as JSON5 to add support for comments in tsconfig.json parsing.
require('require-json5').replace();

// Load path aliases from the tsconfig.json file
const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = fs.existsSync(tsconfigPath) ? require(tsconfigPath) : {};

if ('compilerOptions' in tsconfig && 'paths' in tsconfig.compilerOptions) {
	const aliases = tsconfig.compilerOptions.paths;

	for (const alias in aliases) {
		const paths = aliases[alias].map((p: string) => path.resolve(__dirname, p));

		// Our tsconfig uses glob path formats, whereas webpack just wants directories
		// We'll need to transform the glob format into a format acceptable to webpack

		const wpAlias = alias.replace(/(\\|\/)\*$/, '');
		const wpPaths = paths.map((p: string) => p.replace(/(\\|\/)\*$/, ''));

		if (config.resolve && config.resolve.alias) {
			if (!(wpAlias in config.resolve.alias) && wpPaths.length) {
				// @ts-ignore
				config.resolve.alias[wpAlias] = wpPaths.length > 1 ? wpPaths : wpPaths[0];
			}
		}
	}
}

// Babel
if (useBabel && (isProduction || useBabelInDevelopment)) {
	const loader = {
		loader: 'babel-loader',
		options: {
			sourceType: 'unambiguous',
			presets: [
				[
					// Docs: https://babeljs.io/docs/en/babel-preset-env
					'@babel/preset-env',
					{
						debug: false,
						corejs: { version: 3 },
						useBuiltIns: 'usage',
					},
				],
			],
			plugins: ['@babel/plugin-transform-runtime'],
		},
	};

	config.module?.rules?.unshift({
		test: /\.(?:m?js|ts)$/,
		include: [path.resolve(__dirname, 'src'), path.resolve('node_modules', 'svelte')],
		exclude: [/node_modules[/\\](css-loader|core-js|webpack|regenerator-runtime)/],
		use: loader,
	});

	const svelte = config.module?.rules?.find((rule) => {
		if (typeof rule !== 'object' || rule == null) return false;
		if (Array.isArray(rule.use))
			return rule.use.includes(
				(e: any) => typeof e.loader === 'string' && e.loader.startsWith('svelte-loader')
			);
		if (typeof rule.use === 'object')
			return rule.use.loader?.startsWith('svelte-loader') ?? false;
		return false;
	}) as Webpack.RuleSetRule;

	if (!svelte) {
		console.error('ERR: Could not find svelte-loader for babel injection!');
		process.exit(1);
	}

	if (!Array.isArray(svelte.use)) {
		svelte.use = [svelte.use as any];
	}

	svelte.use.unshift(loader);
}

export default config;
