const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
module.exports = {
  publicPath: './',
  devServer: {
    // proxy: {
    //   '/api': {
    //     // target: 'https://api.apiopen.top',
    //     target: 'http://quo.dongjincheng.cn/',
    //     // target: 'https://douban.uieee.com/',
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   '^/api': '' // 将pathRewrite设置为空，
    //     // }
    //   }
    // }
  },

  configureWebpack: config => {
    console.log(config)
    //预编译
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
      // 为生产环境修改配置...
      return {
        plugins: [
          // 预渲染配置
          new PrerenderSPAPlugin({
            //要求-给的WebPack-输出应用程序的路径预渲染。
            staticDir: path.join(__dirname, 'dist'),
            //必需，要渲染的路线。
            routes: ['/','/methods'],
            //必须，要使用的实际渲染器，没有则不能预编译
            renderer: new Renderer({
              inject: {
                foo: 'bar'
              },
              headless: false, //渲染时显示浏览器窗口。对调试很有用。
              //等待渲染，直到检测到指定元素。
              //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))`
              renderAfterDocumentEvent: 'render-event'
            })
          })
        ],
      }
    } else {
        // config.plugin('html').tap(args => {
        //   console.log(args)
        //   args[0].isProd = false
        //   return args
        // })
        // 为开发环境修改配置...
        // CDN引入
        // config.set('externals', {
        //   'vue': 'Vue',
        //   'vuex': 'Vuex',
        //   "view-design": 'iview',
        //   'iview': 'ViewUI',
        //   'element-ui': 'Element-ui'
        // })

    }
  }

}
