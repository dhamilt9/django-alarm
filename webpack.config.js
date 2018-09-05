var webpack = require('webpack');

module.exports = {
  plugins: [
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery"
     })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
	  }
    ],
  }
};
