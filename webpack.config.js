var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge'); 
var clean = require('clean-webpack-plugin');

var pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

var common = {
	entry: PATHS.app,
 	output: {
   	path: PATHS.build,
   	filename: 'bundle.js'
 	},
 	module: {
 		loaders: [
 			{
 				test: /\.css$/,
 				loaders: ['style', 'css'],
 				include: PATHS.app
 			},
 			{
 				test: /\.jsx?$/,
 				loaders: ['babel'],
 				include: PATHS.app
 			}
 		]
 	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Kanban app'
		})
	]
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			historyApiFallback : true,
			hot: true,
			inline: true,
			progress: true,
			status: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development')
			}),
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if (TARGET === 'build' || TARGET == 'deploy') {
	module.exports = merge(common, {
		entry: {
			app: PATHS.app,
			vendor: Object.keys(pkg.dependencies)
		},
	 	output: {
	   	path: PATHS.build,
	   	filename: '[name].[chunkhash].js?'
	 	},
		devtool: 'source-map',
		plugins: [
			new clean(['build']),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js')
		]
	});
}