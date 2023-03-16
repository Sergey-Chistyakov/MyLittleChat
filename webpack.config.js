const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		authorization: {import:'./src/authorization/authorization.tsx', filename: '[name].[contenthash].bundle.js'},
		// test: {import: './src/test/main.jsx'},
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development - MLC',
			template: path.resolve(__dirname, 'src/authorization/index.html'),
		}),
	],
	output: {
		filename: '[name].[contenthash].bundle.js',
		// path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {

		splitChunks: {
			maxInitialRequests: Infinity,
			minSize: 0,
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx$|\.ts$|\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		]
	}
};