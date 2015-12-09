var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

module.exports = {
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
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'Kanban app'
		})
	]
};