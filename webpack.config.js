const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        index: "./src/index.ts",
        background: "./src/background.ts",
        play: "./src/play.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: { "@": path.resolve(__dirname) },
        extensions: ['.tsx', '.ts', '.js'],
    }
};
