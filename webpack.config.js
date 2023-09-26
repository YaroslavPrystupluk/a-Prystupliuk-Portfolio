const path = require( "path" );
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const multiPages = require("./multiPage.config");
const htmlPlugins = require("./htmlPlugins.config");
const htmlPartialsPlugin = require("./htmPartialsPlugin.config")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const addEslintLoader = () => {
		const loaders = [
				{
						loader: "babel-loader",
						options: {
								presets: [
										["@babel/preset-typescript", { targets: "defaults" } ],
										["@babel/preset-env", { targets: "defaults" }]
								]
						}
				}
		];
		
		if(devMode) loaders.push("eslint-loader");
		return loaders;
};

const plugins = () => {
		const base = [
			...htmlPlugins,
			...htmlPartialsPlugin,
		
			new FaviconsWebpackPlugin({
					logo: "src/img/favicon.png",
					mode: 'webapp',
					devMode: 'webapp',
					prefix: "img/",
					inject: htmlPlugins => {
							return true
							// return basename(htmlPlugins.options.filename) === "src/pages/terminal.html"
					}
			}),
			
				new MiniCssExtractPlugin({
						filename: "style/[name].[contenthash].bundle.css",
				})
		];
		if(!devMode) base.push(new BundleAnalyzerPlugin());
		
		return base;
};

module.exports = {
		mode,
		target,
		devtool,
		devServer: {
				port: 3000,
				open: true,
				hot: true,
		},
		entry: {
				...multiPages.entry
		},
		output: {
				filename: "scripts/[name].[contenthash].bundle.js",
				path: path.resolve(__dirname, "dist"),
				clean: true,
				assetModuleFilename: "img/[name][ext]"
		},
		resolve: {
				extensions: [".js", ".scss", ".html", ".ts", ".css"],
				alias: {
						// "@styles": path.resolve(__dirname, "src/style")
				}
		},
		optimization: {
				minimizer: [
						new CssMinimizerPlugin(),
				],
				splitChunks: {
						chunks: "all"
				}
		},
		plugins: plugins(),
		module: {
				rules: [
						{
								test: /\.html$/i,
								loader: "html-loader",
						},
						{
								test: /\.(c|sa|sc)ss$/i,
								use: [
										devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
										'css-loader',
										{
												loader: 'postcss-loader',
												options: {
														postcssOptions: {
																plugins: [require('postcss-preset-env')],
														},
												},
										},
										'group-css-media-queries-loader',
										{
												loader: 'resolve-url-loader',
										},
										{
												loader: 'sass-loader',
												options: {
														sourceMap: true,
												},
										},
								],
						},
						{
								test: /\.(woff|woff2|eot|ttf|otf)$/i,
								type: "asset/resource",
								generator: {
										filename: "fonts/[name][ext]",
								},
						},
						{
								test: /\.(jpe?g|png|webp|gif|svg)$/i,
								use: devMode
									? []
									: [
											{
													loader: "image-webpack-loader",
													options: {
															mozjpeg: {
																	progressive: true,
															},
															optipng: {
																	enabled: false,
															},
															pngquant: {
																	quality: [0.65, 0.9],
																	speed: 4,
															},
															gifsicle: {
																	interlaced: false,
															},
															webp: {
																	quality: 75,
															},
													},
											},
									],
								type: "asset/resource",
								generator: {
										filename: "img/[name][ext]",
								},
						},
						{
								test: /\.(?:js|ts|mjs|cjs)$/,
								exclude: /node_modules/,
								use: addEslintLoader()
						},
				]
		}
};