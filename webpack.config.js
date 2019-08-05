const path = require('path');

module.exports = {
    entry: './src/SimpleCrypto.ts',
    devtool: 'inline-source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'SimpleCrypto.min.js',
        path: path.resolve(__dirname, 'dist')
    }
};
