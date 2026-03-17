// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },

  mock: {},

  layout: {
    locale: true,
    ...defaultSettings,
  },

  locale: {
    default: 'vi-VN',
    antd: true,
    baseNavigator: false,
  },

  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },

  targets: {
    ie: 11,
  },

  routes,

  theme: {
    'primary-color': defaultSettings.primaryColor,
    'border-radius-base': defaultSettings.borderRadiusBase,
  },

  esbuild: {},
  title: false,
  ignoreMomentLocale: true,

  manifest: {
    basePath: '/',
  },

  fastRefresh: {},

  nodeModulesTransform: {
    type: 'none',
  },

  webpack5: {},
//   exportStatic: {},

  define: Object.entries(process.env).reduce((result, [key, value]) => {
    if (key.startsWith('APP_CONFIG_')) {
      return {
        ...result,
        [key]: value,
      };
    }
    return result;
  }, {}),
});