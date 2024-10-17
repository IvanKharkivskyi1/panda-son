const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/bootstrap.js',
  mode: 'development',
  output: {
    publicPath: 'auto', // Allows Webpack to dynamically determine the public path
    clean: true, // Ensures output directory is cleaned before build
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  devServer: {
    port: 3001, // Or whichever port you prefer
    static: './dist', // Replace '/app/dist' if it doesn’t exist
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Ensures CSS is processed and injected
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // Use an appropriate name for each container
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
