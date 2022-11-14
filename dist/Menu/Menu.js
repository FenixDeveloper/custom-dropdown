"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = Menu;
exports.MenuIcon = MenuIcon;
exports.MenuItem = MenuItem;
var _react = _interopRequireDefault(require("react"));
var _MenuModule = _interopRequireDefault(require("./Menu.module.scss"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["content"],
  _excluded2 = ["onCommand"],
  _excluded3 = ["label", "command", "className", "labelClassName"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Abstract icon renderer, support class based icons and JSX elements
 *
 * @example with fontawesome icon class
 * <MenuIcon icon="fa-solid fa-user" />
 *
 * @example with fontawesome icon element
 * <MenuIcon icon={<FasUser />} />
 */
function MenuIcon(_ref) {
  var icon = _ref.icon;
  if ( /*#__PURE__*/_react.default.isValidElement(icon)) return icon;else if (typeof icon === "string") {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)(icon, _MenuModule.default.icon)
    });
  } else {
    return null;
  }
}

/**
 * One menu item, can be customized by classes or content renderer function. Marked as disabled if no command supplied.
 *
 * @see MenuItemData
 * @see MenuIcon
 * @example props with label and icon
 * {label: "first item", icon: "fa-solid fa-user"}
 *
 * @example props with custom renderer
 * {content: ({label, labelClassName, icon}) => <React.Fragment>
 *   <span className={labelClassName}>{label}</span>
 *   {icon ? <i className={icon} /> : null}
 * </React.Fragment>}
 *
 * @example default item component structure
 * <li className={className} onClick={command}>
 *   <span className={labelClassName}>{label}</span>
 *   <MenuIcon icon={icon} />
 * <li>
 */
function MenuItem(_ref2) {
  var content = _ref2.content,
    props = _objectWithoutProperties(_ref2, _excluded);
  var _ref3 = props,
    onCommand = _ref3.onCommand,
    itemProps = _objectWithoutProperties(_ref3, _excluded2); //separate item props
  var _ref4 = itemProps,
    label = _ref4.label,
    command = _ref4.command,
    className = _ref4.className,
    labelClassName = _ref4.labelClassName,
    rest = _objectWithoutProperties(_ref4, _excluded3);
  var onItemClick = function onItemClick(event) {
    if (command) command(event, itemProps);
    if (onCommand) onCommand(event, itemProps);
  };
  return /*#__PURE__*/_react.default.createElement("li", _extends({}, rest, {
    onClick: onItemClick,
    className: (0, _classnames.default)(className, _MenuModule.default.item, _defineProperty({}, _MenuModule.default.disabled, !command))
  }), typeof content === "function" ? content(props) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)(labelClassName, _MenuModule.default.label)
  }, label), /*#__PURE__*/_react.default.createElement(MenuIcon, {
    icon: props.icon
  })));
}

/**
 * Simple flat menu component
 *
 * @see MenuItem
 * @example internal structure
 * <ul className={className}>
 *   <MenuItem />
 *   ...
 * </ul>
 *
 * @example how to use
 * <Menu items={[
 *   {label: "first", command: () => {}},
 *   {label: "second", icon: "fa-solid fa-user", command: () => {}}
 * ]} />
 */
function Menu(_ref5) {
  var items = _ref5.items,
    className = _ref5.className,
    onCommand = _ref5.onCommand;
  return /*#__PURE__*/_react.default.createElement("ul", {
    className: (0, _classnames.default)(className, _MenuModule.default.menu)
  }, items.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement(MenuItem, _extends({}, item, {
      onCommand: onCommand,
      key: ['item', index, item.label].join("-")
    }));
  }));
}