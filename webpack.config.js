const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development',
    devtool: 'eval', // 빠른 속도로 해줌
    resolve: {
        extensions: [".js", '.jsx']
    },

    entry: { // 입력
        app: ['./client'],
    },

    module: {
        rules: [{
            test: /\.jsx?/, // jsx 파일과 js 파일에 이 룰을 적용한다.
            loader: 'babel-loader', // js, jsx 파일에 바벨 로더를 적용한다. (최신 문법을 옛날 브라우저에서도 호환가능한 문법으로 적용)
            options: { // babel-loader에 대한 옵션
                presets: [
                    ['@babel/preset-env', { // 이 presets에 대한 설정
                        targets: {
                            browsers: ['> 1% in KR', 'last 2 chrome versions'], // 한국에서 점유율 5% 이상인 브라우저, 크롬 브라우저에만 적용
                        },  // browserslist 사이트에서 확인
                        debug: true,
                    }],
                    '@babel/preset-react'
                ], // 플러그인들의 모음이 preset
                plugins: [
                    'react-refresh/babel',
                ],
            }
        }]
    },

    plugins: [ // 위에 속성 중 Loader인 모듈 속성에 있는 요소들을 모두 debug:true 적용을 시켜줌
        new webpack.LoaderOptionsPlugin({debug: true}),
        new RefreshWebpackPlugin(),
    ],

    output: { // 출력
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        // publicPath: '/dist/',
    },

    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)}, // index.html 처럼 정적 파일들의 경로
        hot: true, // 실시간 변경 가능하도록 함
    },
};