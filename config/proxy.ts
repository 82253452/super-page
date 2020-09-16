/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/userLogin/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    }, '/user/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    }, '/busiAppPage/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    }, '/busiApp/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/order/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/car/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/banner/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/mini/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/trans/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
    '/common/': {
      target: 'https://mass.zhihuizhan.net/api',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
};
