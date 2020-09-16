// https://umijs.org/config/
import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV} = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  define: {
    DOMAIN: 'https://mass.zhihuizhan.net/api'
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
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/open',
      name: '开放平台',
      icon: 'smile',
      routes: [
        {
          name: '小程序管理',
          icon: 'smile',
          path: '/open/mini-app',
          component: './open/MiniApp',
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
      name: '汽车管理',
      icon: 'smile',
      path: '/car',
      routes: [
        {
          name: '物流公司管理',
          icon: 'smile',
          path: '/car/trans',
          component: './car/Trans',
        },
        {
          name: '车辆管理',
          icon: 'smile',
          path: '/car/car',
          component: './car/CarTypes',
        },
        {
          name: '轮播管理',
          icon: 'smile',
          path: '/car/banner',
          component: './car/Banners',
        },
        {
          name: '订单管理',
          icon: 'smile',
          path: '/car/order',
          component: './car/Order',
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
