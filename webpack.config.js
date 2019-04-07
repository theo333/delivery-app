module.exports = {
	entry: './client/index.js',
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};
