const path = require('path');

module.exports = {
    entry: './src/SimpleCrypto.ts',
    mode: 'production',
    optimization: {
        minimize: false
    },
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
        filename: 'SimpleCrypto.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'SimpleCrypto',
        libraryExport: 'SimpleCrypto',
        libraryTarget: 'umd',
    }
};
