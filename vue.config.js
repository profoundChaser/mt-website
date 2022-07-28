const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy:'http://localhost:3000'
    // hot:true,
    // https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器  // 配置跨域处理,只有一个代理
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     // ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       '^/api': '/',
    //     },
    //   },
    // },
  },
})
