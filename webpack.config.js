var path = require('path')
var glob = require('glob')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var fileName = process.env.NODE_ENV === 'production' ? "[chunkhash].bundle.js" : "[id].[hash].bundle.js"

//eclipse启动-静态资源路径
//var basePath = "/icp_portal/icp-bbdrive/bibixingche/dist/";
//node启动-静态资源路径
var basePath = "/dist/";

//生成html文件的相关配置
var htmlconfig = {
  removeComments: false,
  collapseWhitespace: false,
  removeAttributeQuotes: false
};
//获得入口js文件
var configEntry = {};
glob.sync('./src/views/**/app.js').forEach(path => {
  const chunk = path.split('./src/views/')[1].split('/app.js')[0];
  configEntry[chunk] = path;
})
var entries = Object.assign(configEntry, {
    //将公用库单独提取打包
    'vendor': ['utils']
});
module.exports = {
  entry: entries,
  output: {
	  path: path.resolve(__dirname, './dist'),
    publicPath: basePath,
    filename: 'assets/js/[name].js?[hash:7]',
    chunkFilename: fileName
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'less': 'vue-style-loader!less-loader',
            'css': "vue-style-loader!css-loader",
            'styl': "vue-style-loader!css-loader!stylus-loader",
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { 
        test: /\.(css|less)$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!less-loader"
            }) 
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'assets/images/[ext]-[sha512:hash:base64:7].[ext]?[hash:7]'
        }
        /*query: {
          name: 'img/[ext]-[sha512:hash:base64:7].[ext]?[hash:7]'
        }*/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[ext]-[sha512:hash:base64:7].[ext]?[hash:7]'
        }
        /*query: {
          name: 'fonts/[ext]-[sha512:hash:base64:7].[ext]?[hash:7]'
        }*/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/style/[name].min.css?[hash:7]'),
    //提取公共JS
    new webpack.optimize.CommonsChunkPlugin({
        name : 'vendor',
        filename : 'assets/js/common/bundle.js?[hash:7]',
        minChunks : Infinity
    }),
    new webpack.DefinePlugin({
      PROCESS_ENV_PRODUCTION: false,
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'utils' : path.resolve(__dirname, './src/assets/js/common/utils.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false;
//module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    //运行环境
    new webpack.DefinePlugin({
      PROCESS_ENV_PRODUCTION: true,
    }),
    //压缩配置
    new webpack.optimize.UglifyJsPlugin({
      //sourceMap: false,   //去掉sourceMap
      sourceMap: true,
      comments: false,        //去掉注释
      compress: {
        warnings: false //去掉警告
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
  htmlconfig = {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  };
}
//生成HTML文件
glob.sync('./src/views/**/app.html').forEach(path => {
  var chunk = path.split('./src/views/')[1].split('/app.html')[0];
  var filename = chunk+'.html';
  var congig = {
    filename: filename,   //生成的文件名
    template: path,       // 模板路径
    inject: true,         // js插入位置
    minify: htmlconfig,   // 生成html文件的相关配置
    chunksSortMode: 'dependency',
    chunks: [ 'vendor',chunk]
  };
  module.exports.plugins.push(new HtmlWebpackPlugin(congig));
})