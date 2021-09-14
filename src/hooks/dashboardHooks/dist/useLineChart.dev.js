"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLineChart = useLineChart;

var _useSecureGraphql = require("@/hooks/useSecureGraphql");

var _graphqlRequest = require("graphql-request");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query RootQuery {\n      getAllOrderSummary {\n        totalAmount\n        date\n        status\n      }\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function useLineChart() {
  var lineChartGraphQuery = (0, _graphqlRequest.gql)(_templateObject());
  return (0, _useSecureGraphql.useSecureGraphql)({
    key: 'lineChart',
    query: lineChartGraphQuery
  });
}