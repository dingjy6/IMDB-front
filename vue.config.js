module.exports = {
    devServer: {
        port: 8080,
        proxy: {
          '/api': {
            //本地服务接口地址
            target: 'http://localhost:5000',
            ws: true,
            pathRewrite: {
              '^/api': '/'
            }
          }
        }
      }
}