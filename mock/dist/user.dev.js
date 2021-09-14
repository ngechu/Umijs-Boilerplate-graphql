"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var waitTime = function waitTime() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(true);
    }, time);
  });
};

function getFakeCaptcha(req, res) {
  return regeneratorRuntime.async(function getFakeCaptcha$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(waitTime(2000));

        case 2:
          return _context.abrupt("return", res.json('captcha-xxx'));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

var ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION = process.env.ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION;
/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */

var access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

var getAccess = function getAccess() {
  return access;
}; // 代码中会兼容本地 service mock 以及部署站点的静态数据


var _default = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': function GETApiCurrentUser(req, res) {
    if (false) {
      res.status(401).send({
        data: {
          isLogin: false
        },
        errorCode: '401',
        errorMessage: 'Errror 401 no user exists',
        success: true
      });
      return;
    }

    res.send({
      success: true,
      data: {
        "id": "60885987-1b61-4247-94c7-dff348347f93",
        "login": "admin",
        "name": "Administrator",
        "firstName": null,
        "middleName": null,
        "lastName": null,
        "position": null,
        "email": null,
        "timeZone": null,
        "language": null,
        "_instanceName": "Administrator [admin]",
        "locale": "en"
      }
    });
  },
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }],
  'POST /api/login/account': function POSTApiLoginAccount(req, res) {
    var _req$body, password, username, type;

    return regeneratorRuntime.async(function POSTApiLoginAccount$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, password = _req$body.password, username = _req$body.username, type = _req$body.type;
            _context2.next = 3;
            return regeneratorRuntime.awrap(waitTime(2000));

          case 3:
            if (!(password === 'ant.design' && username === 'admin')) {
              _context2.next = 7;
              break;
            }

            res.send({
              status: 'ok',
              type: type,
              currentAuthority: 'admin'
            });
            access = 'admin';
            return _context2.abrupt("return");

          case 7:
            if (!(password === 'ant.design' && username === 'user')) {
              _context2.next = 11;
              break;
            }

            res.send({
              status: 'ok',
              type: type,
              currentAuthority: 'user'
            });
            access = 'user';
            return _context2.abrupt("return");

          case 11:
            if (!(type === 'mobile')) {
              _context2.next = 15;
              break;
            }

            res.send({
              status: 'ok',
              type: type,
              currentAuthority: 'admin'
            });
            access = 'admin';
            return _context2.abrupt("return");

          case 15:
            res.send({
              status: 'error',
              type: type,
              currentAuthority: 'guest'
            });
            access = 'guest';

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  'POST /api/login/outLogin': function POSTApiLoginOutLogin(req, res) {
    access = '';
    res.send({
      data: {},
      success: true
    });
  },
  'POST /api/register': function POSTApiRegister(req, res) {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
      success: true
    });
  },
  'GET /api/500': function GETApi500(req, res) {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list'
    });
  },
  'GET /api/404': function GETApi404(req, res) {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212'
    });
  },
  'GET /api/403': function GETApi403(req, res) {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list'
    });
  },
  'GET /api/401': function GETApi401(req, res) {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha
};
exports["default"] = _default;