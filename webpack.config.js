const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
	stats: 'normal',
	entry: path.resolve(__dirname, './src/index.jsx'),
	output: {
		path: path.resolve(__dirname, './dist'),
		// unfortunately we end up with a useless css-bundle.js
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			// transpile js and jsx files in src/ using config in babel.config.js
			use: 'babel-loader',
			test: /\.(js|jsx)$/,
			include: path.resolve(__dirname, './src')
		}, {
			// compile less to css, remove webpack runtime, and output to css/bundle.css
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader?url=false', // by default css-loader treats url() like @import for some reason
				'less-loader'
			],
			test: /\.(less|css)$/
		}]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: 'static/img',
			to: 'img',
			toType: 'dir',
			ignore: 'favicon.ico'
		}]),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'static/index.html',
			favicon: 'static/img/favicon.ico',
			inject: false
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

module.exports = function(env, options) {
	if (options.mode === 'production') {
		config.plugins.push([
			new BundleAnalyzerPlugin({
				reportFilename: '../bundle-report.html',
				analyzerMode: 'static',
				openAnalyzer: false
			})
		]);
	}
	return config;
};
