const { merge } = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = require('@nextcloud/webpack-vue-config')
const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except')

const isTesting = !!process.env.TESTING

const config = {
	module: {
		rules: [
			{
				// vue-plyr uses .mjs file
				test: /\.m?js$/,
				loader: 'babel-loader',
				exclude: BabelLoaderExcludeNodeModulesExcept([
					'@nextcloud/dialogs',
					'@nextcloud/event-bus',
					'camelcase',
					'fast-xml-parser',
					'hot-patcher',
					'semver',
					'vue-plyr',
					'webdav',
					'toastify-js',
				]),
			},
			{
				// for cypress roboto import
				test: /\.(woff2?)$/,
				loader: 'url-loader',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({ isTesting }),
	],
}

const mergedConfigs = merge(config, webpackConfig)

// Remove default js rule
const jsRuleIndex = mergedConfigs.module.rules.findIndex(rule => rule.test.toString() === '/\\.js$/')
mergedConfigs.module.rules.splice(jsRuleIndex, 1)

// Merge rules by replacing existing tests
module.exports = mergedConfigs
