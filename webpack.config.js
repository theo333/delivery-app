module.exports = {
	entry: './client/index.js',
	output: {
		path: __dirname,
		filename: './public/main.js',
	},
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
