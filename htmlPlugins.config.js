const multiPages = require("./multiPage.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const htmlPlugins = multiPages.pages.map(page => {
		return new HTMLWebpackPlugin({
				template: page.template,
				filename: page.filename,
				chunks: [...page.chunks]
		});
});

module.exports = htmlPlugins;
