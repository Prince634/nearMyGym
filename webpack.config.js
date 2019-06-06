const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');



let client_config = {

	mode: 'development',
    devtool: 'inline-source-map',

	entry:{
		client: './client.js'
	},

	output: {
		filename:'[name].bundle.js',
		path: path.resolve(__dirname,'dist')
	},

	module: {
		rules: [
			
			{
				test: /\.css$/,
				use:[
					{
			            loader: MiniCssExtractPlugin.loader,
			            options: {
			              // you can specify a publicPath here
			              // by default it uses publicPath in webpackOptions.output
			              publicPath: '../../',
			              hmr: process.env.NODE_ENV === 'development',
			              reloadAll: true,
			            },
			        },
					//'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './dist/[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},

	plugins: [
		
		new CleanWebpackPlugin(),
		/*new HtmlWebpackPlugin({
			title: 'Travel Yarri ClientSide',
			template: 'index.ejs',
			filename: 'index.ejs'
		}),*/
		new MiniCssExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // both options are optional
	      filename: '[name].css',
	      chunkFilename: '[id].css',
	    }),

	],


	optimization: {
	    minimizer: [new UglifyJsPlugin({
	    	uglifyOptions: {
	          output: {
	            comments: false,
	          },
	        }
	    })],
	    splitChunks: {
	    	cacheGroups: {
	    		//vendor chunk
	    		vendor: {
	    			//sync + async chunks
	    			chunks: 'all',
	    			test: /node_modules/
	    		}
	    	}
	    }
	}

}

let server_config = {

	mode: 'development',
    devtool: 'inline-source-map',
    target:'node',

	entry:{
		server : './server.js'
	},

	output: {
		filename:'[name].bundle.js',
		path: path.resolve(__dirname,'server')
	},

	module: {
		rules: [
			
			{
				test: /\.css$/,
				use:[
					{
			            loader: MiniCssExtractPlugin.loader,
			            options: {
			              // you can specify a publicPath here
			              // by default it uses publicPath in webpackOptions.output
			              publicPath: '../../',
			              hmr: process.env.NODE_ENV === 'development',
			              reloadAll: true,
			            },
			        },
					//'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './dist/[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:[
						"@babel/preset-env", "@babel/preset-react",
						]
					}
				}
			}
		]
	}

}

module.exports = env => {

	return [client_config ,server_config]
}