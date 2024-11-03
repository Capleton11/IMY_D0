const path = require("path");
module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, 'frontend', 'public'),
        filename: "bundle.js",
        publicPath: '/',
    },
    devServer: {
        contentBase: path.join(__dirname, 'frontend/public'),
        compress: true,
        port: 3000,
        hot: true, // Enable HMR
        historyApiFallback: true, // For client-side routing
      },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                      },

                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    devServer: {
        historyApiFallback: true,
      },
}
