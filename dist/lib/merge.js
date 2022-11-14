"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Generic object
 */

// istanbul ignore next
var isObject = function isObject(obj) {
  if (_typeof(obj) === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      var prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  return false;
};

/**
 * Deep merge of multiple objects
 *
 * @param {...IObject} objects array of objects to merge
 */
var merge = function merge() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }
  return objects.reduce(function (result, current) {
    if (Array.isArray(current)) {
      throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
    }
    Object.keys(current).forEach(function (key) {
      if (["__proto__", "constructor", "prototype"].includes(key)) {
        return;
      }
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = merge.options.mergeArrays ? Array.from(new Set(result[key].concat(current[key]))) : current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });
    return result;
  }, {});
};
var defaultOptions = {
  mergeArrays: true
};
merge.options = defaultOptions;
merge.withOptions = function (options) {
  merge.options = _objectSpread({
    mergeArrays: true
  }, options);
  for (var _len2 = arguments.length, objects = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    objects[_key2 - 1] = arguments[_key2];
  }
  var result = merge.apply(void 0, objects);
  merge.options = defaultOptions;
  return result;
};
var _default = merge;
exports.default = _default;