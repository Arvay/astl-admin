let domain = 'http://47.94.146.245:11010/'
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/userinfo': {
                target: domain,
                changOrigin: true
            },
            '/comment': {
                target: domain,
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/comment': '/'
                }
            },
            '/user': {
                target: domain,
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/user': '/'
                }
            },
            '/link': {
                target: domain,
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/link': '/'
                }
            },
            '/activity': {
                target: domain,
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/activity': '/'
                }
            },
            '/vote': {
                target: domain,
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/vote': '/'
                }
            }
        }
    }
}
