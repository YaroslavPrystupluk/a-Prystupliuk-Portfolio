const path = require( "path" );

const result = {};

result.entry = {
		index: path.resolve( __dirname, "src/scripts/index.js" ),
		terminal: path.resolve( __dirname, "src/pages/scripts/terminal.js" )
};

result.pages = [
		{
				chunks: [ "index" ],
				filename: "index.html",
				template: path.resolve( __dirname, "src/index.html" )
		},
		{
				chunks: [ "terminal" ],
				filename: "pages/terminal.html",
				template: path.resolve( __dirname, "src/pages/terminal.html" )
		}
];

result.pagesPart = [
		{
				template_filename: ["index.html"],
				path: path.resolve(__dirname, "src/html/footer.html"),
				location: "footer",
		},
		{
				path: path.join(__dirname, "src/html/header.html"),
				location: "header",
				template_filename: ["index.html"]
		}
];

module.exports = result;