// https://umijs.org/config/
import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV} = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  history: {type: 'hash'},
  dva: {
    hmr: true,
  },
  define: {
    'process.env.DOMAIN': 'http://localhost:8080'
  },
  layout: {
    name: 'Super Car',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/welcome',
      name: '首页',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/open',
      name: '开放平台',
      icon: 'smile',
      access: 'admin',
      routes: [
        {
          name: '小程序管理',
          icon: 'smile',
          path: '/open/mini-app',
          component: './open/MiniApp',
        },
        {
          name: '公众号管理',
          icon: 'smile',
          path: '/open/mini-wxopen-app',
          component: './open/MiniWxopenApp',
        },
        {
          name: '草稿箱',
          icon: 'smile',
          path: '/open/trafts',
          component: './open/MiniAppTraft',
        },
        {
          name: '代码库',
          icon: 'smile',
          path: '/open/templates',
          component: './open/MiniAppTemplate',
        },
      ]
    },
    {
      name: 'Super Car',
      icon: 'smile',
      path: '/car',
      routes: [
        {
          name: '用户管理',
          icon: 'smile',
          path: '/car/user',
          component: './car/User',
          access: 'transManager',
        },
        {
          name: '司机管理',
          icon: 'smile',
          path: '/car/transUser',
          component: './car/TransCompanyUser',
          access: 'transManager',
        },
        {
          name: '物流公司管理',
          icon: 'smile',
          path: '/car/trans',
          component: './car/Trans',
          access: 'admin',
        },
        {
          name: '企业管理',
          icon: 'smile',
          path: '/car/company',
          component: './car/Company',
          access: 'admin',
        },
        {
          name: '车型管理',
          icon: 'smile',
          path: '/car/car',
          component: './car/CarTypes',
          access: 'admin',
        },
        {
          name: '轮播管理',
          icon: 'smile',
          path: '/car/banner',
          component: './car/Banners',
          access: 'admin',
        },
        {
          name: '订单管理',
          icon: 'smile',
          path: '/car/order',
          component: './car/Order',
          access: 'orderManager',
        },
        {
          name: '商品管理',
          icon: 'smile',
          path: '/car/Product',
          component: './car/Product',
          access: 'admin',
        },
      ]
    },
    {
      path: '/data',
      name: '数据管理',
      icon: 'smile',
      access: 'admin',
      routes: [
        {
          name: '文章管理',
          icon: 'smile',
          path: '/data/article',
          component: './data/Article',
        },
        {
          name: '文章流',
          icon: 'smile',
          path: '/data/articleList',
          component: './data/ArticleList',
        },
        {
          name: '分类管理',
          icon: 'smile',
          path: '/data/columns',
          component: './data/Column',
        },
        {
          name: '人才库',
          icon: 'smile',
          path: '/data/talent',
          component: './data/Talent',
        },
      ]
    },

    {
      path: '/',
      redirect: '/welcome',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
