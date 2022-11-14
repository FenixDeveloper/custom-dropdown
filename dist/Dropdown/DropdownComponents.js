"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownTrigger = exports.DropdownPanel = exports.DropdownContainer = exports.DEFAULT_OPTIONS = exports.DEFAULT_COMPONENTS = void 0;
exports.TriggerIcon = TriggerIcon;
var _react = _interopRequireDefault(require("react"));
var _DropdownModule = _interopRequireDefault(require("./Dropdown.module.scss"));
var _excluded = ["children"],
  _excluded2 = ["children"],
  _excluded3 = ["children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Default trigger content
 */
function TriggerIcon() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _DropdownModule.default.defaultTrigger
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 128 512"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
  })));
}

/**
 * Default container for dropdown
 */
var DropdownContainer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    rest = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
    ref: ref
  }), children);
});

/**
 * Default control element
 */
exports.DropdownContainer = DropdownContainer;
var DropdownTrigger = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    rest = _objectWithoutProperties(props, _excluded2);
  return /*#__PURE__*/_react.default.createElement("button", _extends({}, rest, {
    ref: ref
  }), children);
});

/**
 * Default content container
 */
exports.DropdownTrigger = DropdownTrigger;
var DropdownPanel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    rest = _objectWithoutProperties(props, _excluded3);
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
    ref: ref
  }), children);
});

/**
 * Component with forwarded ref
 */
exports.DropdownPanel = DropdownPanel;
var DEFAULT_COMPONENTS = {
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  Panel: DropdownPanel
};
exports.DEFAULT_COMPONENTS = DEFAULT_COMPONENTS;
var DEFAULT_OPTIONS = {
  container: {},
  trigger: {},
  panel: {}
};
exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;