const multiPages = require("./multiPage.config");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

const htmlPartialsPlugin = multiPages.pagesPart.map(pagePart => {
		return new HtmlWebpackPartialsPlugin({
				template_filename: pagePart.template_filename,
				location: pagePart.location,
				path: pagePart.path
		});
});

module.exports = htmlPartialsPlugin;