var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge'); 

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
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {
		devtool: 'source-map'
	});
}