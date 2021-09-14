"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStatements = useStatements;

var _useSecureGraphql = require("@/hooks/useSecureGraphql");

var _graphqlRequest = require("graphql-request");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query RootQuery {\n      getAllTransaction {\n        postingSerialNumber\n        narrative\n        date\n        debit\n        credit\n        balance\n        id\n      }\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function useStatements() {
  var statementsQuery;
  return regeneratorRuntime.async(function useStatements$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          statementsQuery = (0, _graphqlRequest.gql)(_templateObject());
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _useSecureGraphql.secureQueryAsync)({
            key: 'statements',
            query: statementsQuery
          }));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}