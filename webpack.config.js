const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    devtool: 'eval-source-map',
    entry:'./main.js',
    output:{
        path:path.join(__dirname,'/bundle'),
        filename:'index_bundle.js'
    },
    devServer:{
        inline:true,
        port:8080
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ],

}
