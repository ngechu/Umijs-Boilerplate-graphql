"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogin = useLogin;

var _reactQuery = require("react-query");

var _graphqlRequest = require("graphql-request");

var _antd = require("antd");

var _umi = require("umi");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    mutation LoginMutations($loginUsername: String, $loginPassword: String) {\n      login(username: $loginUsername, password: $loginPassword) {\n        bearer_token\n        name\n      }\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useLogin() {
  var _useModel = (0, _umi.useModel)('@@initialState'),
      initialState = _useModel.initialState,
      setInitialState = _useModel.setInitialState;

  return (0, _reactQuery.useMutation)(loginMutation, {
    onMutate: function onMutate(variables) {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      return {
        id: 1
      };
    },
    onError: function onError(error, variables, context) {
      // An error happened!
      console.log("rolling back optimistic update with id ".concat(context.id));

      _antd.notification['error']({
        message: 'Login Failed',
        description: 'Invalid Username/Password'
      });
    },
    onSuccess: function onSuccess(data, variables, context) {
      var currentUser, query, redirect;
      return regeneratorRuntime.async(function onSuccess$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _antd.notification['success']({
                message: 'Login Successful',
                description: 'Login success, redirecting...'
              }); //Save token to local storage


              localStorage.setItem('token', data.login.bearer_token);
              _context.next = 4;
              return regeneratorRuntime.awrap(initialState.fetchUserInfo());

            case 4:
              currentUser = _context.sent;
              setInitialState(_objectSpread({}, initialState, {
                currentUser: currentUser
              }));
              _context.next = 8;
              return regeneratorRuntime.awrap(initialState.fetchUserInfo());

            case 8:
              if (_umi.history) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return");

            case 10:
              query = _umi.history.location.query;
              redirect = query.redirect;

              _umi.history.replace(redirect || '/'); // Boom baby!


              console.log('Login success, redirecting...');

            case 14:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    onSettled: function onSettled(data, error, variables, context) {// Error or success... doesn't matter!
    }
  });
}

var loginMutation = function loginMutation(values) {
  var config, endpoint, loginMutation, client;
  return regeneratorRuntime.async(function loginMutation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          config = {};
          endpoint = "".concat(BASE_URL);
          loginMutation = (0, _graphqlRequest.gql)(_templateObject());
          client = new _graphqlRequest.GraphQLClient("".concat(endpoint, "/graphql"));
          _context2.next = 6;
          return regeneratorRuntime.awrap(client.request(loginMutation, {
            loginUsername: values.username,
            loginPassword: values.password
          }));

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};