"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _umi = require("umi");

var _path = require("path");

var _defaultSettings = _interopRequireDefault(require("./defaultSettings"));

var _proxy = _interopRequireDefault(require("./proxy"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REACT_APP_ENV = process.env.REACT_APP_ENV;

var _default = (0, _umi.defineConfig)({
  hash: true,
  antd: {},
  dva: {
    hmr: true
  },
  define: {
    BASE_URL: 'https://api-gpg-dev.k8s.tracom.co.ke:2021'
  },
  layout: _objectSpread({
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208
  }, _defaultSettings["default"]),
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default en-US
    "default": 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading'
  },
  targets: {
    ie: 11
  },
  // umi routes: https://umijs.org/docs/routing
  routes: _routes["default"],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': _defaultSettings["default"].primaryColor
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: _proxy["default"][REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/'
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [{
    requestLibPath: "import { request } from 'umi'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
    schemaPath: (0, _path.join)(__dirname, 'oneapi.json'),
    mock: false
  } // {
  //   requestLibPath: "import { request } from 'umi'",
  //   schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //   projectName: 'swagger',
  // },
  ],
  nodeModulesTransform: {
    type: 'none'
  },
  // mfsu: {},
  webpack5: {},
  exportStatic: {}
});

exports["default"] = _default;