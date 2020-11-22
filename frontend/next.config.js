const path = require('path')
module.exports = {
	trailingSlash: true,
	env: {
		customKey: 'my-value',
	},
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		}
		return config
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
}
