"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = Dropdown;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _utils = require("../lib/utils");
var _DropdownContext = require("./DropdownContext");
var _useViewportObserver = require("../hooks/useViewportObserver");
var _useClickOutsideObserver = require("../hooks/useClickOutsideObserver");
var _useScrollObserver = require("../hooks/useScrollObserver");
var _merge = _interopRequireDefault(require("../lib/merge"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DropdownComponents = require("./DropdownComponents");
var _useResizeObserver = require("../hooks/useResizeObserver");
var _DropdownModule = _interopRequireDefault(require("./Dropdown.module.scss"));
var _excluded = ["replaceClassName"],
  _excluded2 = ["replaceClassName"],
  _excluded3 = ["replaceClassName"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Customizable dropdown component for controllable display of nested custom content
 * @example internal components structure
 * <Container>
 *   <Trigger>{trigger}</Trigger>
 *   <Panel>{children | function}</Panel>
 * </Container>
 * @example minimal with default icon
 * <Dropdown>
 *   My Content
 * </Dropdown>
 * @example with close function and custom label
 * <Dropdown trigger="open panel">
 *   {(close) => <p>Content <a onClick={close}>close panel</a></p>}
 * </Dropdown>
 */
function Dropdown(_ref) {
  var _mergedOptions$contai, _mergedOptions$trigge, _mergedOptions$panel, _position$left, _position$top;
  var trigger = _ref.trigger,
    children = _ref.children,
    side = _ref.side,
    components = _ref.components,
    options = _ref.options,
    _ref$hover = _ref.hover,
    hover = _ref$hover === void 0 ? false : _ref$hover;
  //internal state
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setVisible = _useState2[1]; //visibility state when panel is opened
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpened = _useState4[0],
    setOpened = _useState4[1]; //panel opening state
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    position = _useState6[0],
    setPosition = _useState6[1]; //panel css position
  var sync = (0, _react.useContext)(_DropdownContext.DropdownContext); //to have only one dropdown open
  var containerRef = (0, _react.useRef)(null);
  var triggerRef = (0, _react.useRef)(null);
  var panelRef = (0, _react.useRef)(null);

  //customization section
  var _Object$assign = Object.assign({}, _DropdownComponents.DEFAULT_COMPONENTS, components !== null && components !== void 0 ? components : {}),
    Container = _Object$assign.Container,
    Trigger = _Object$assign.Trigger,
    Panel = _Object$assign.Panel;
  var mergedOptions = (0, _merge.default)(_DropdownComponents.DEFAULT_OPTIONS, options !== null && options !== void 0 ? options : {});

  //internal api
  /**
   * Open panel and close others if context used
   */
  var open = (0, _react.useCallback)(function () {
    if (sync) {
      sync.setCurrent(triggerRef.current);
    }
    setOpened(true);
    setVisible(true);
  }, [sync]);
  /**
   * Close panel
   */
  var close = (0, _react.useCallback)(function () {
    if (sync) {
      sync.setCurrent(null);
    }
    setOpened(false);
    setVisible(false);
  }, [sync]);
  /**
   * Recalculate panel position in auto mode or by side value
   * @param {ScreenSide} nextSide where to place panel, auto if undefined
   */
  var reposition = (0, _react.useCallback)(function (nextSide) {
    if (triggerRef.current && panelRef.current) {
      setPosition((0, _utils.getPosition)(triggerRef.current.getBoundingClientRect(), panelRef.current.getBoundingClientRect(), nextSide ? (0, _utils.convertManualSide)(nextSide) : undefined));
    }
  }, []);
  //event handlers
  /**
   * Event handler for trigger click, can not be customized
   */
  var onTriggerClick = function onTriggerClick() {
    if (isOpened) close();else open();
  };

  //effects section
  (0, _useViewportObserver.useViewportObserver)(triggerRef, isOpened, setVisible);
  (0, _useClickOutsideObserver.useClickOutsideObserver)([containerRef, panelRef], isVisible, function (event) {
    event.stopPropagation();
    close();
  });
  (0, _useScrollObserver.useScrollObserver)(triggerRef, !side && isOpened && isVisible, function () {
    reposition(side);
  });
  (0, _useResizeObserver.useResizeObserver)(panelRef, isVisible, function () {
    reposition(side);
  });
  (0, _react.useLayoutEffect)(function () {
    //calculate position before paint
    reposition(side);
  }, [isVisible, side, reposition]);
  (0, _react.useEffect)(function () {
    if (sync !== null && sync !== void 0 && sync.current && (sync === null || sync === void 0 ? void 0 : sync.current) !== triggerRef.current) {
      close();
    }
  }, [sync, close]);
  var _ref2 = mergedOptions.container,
    containerReplaceClassName = _ref2.replaceClassName,
    containerOptions = _objectWithoutProperties(_ref2, _excluded);
  var _ref3 = mergedOptions.trigger,
    triggerReplaceClassName = _ref3.replaceClassName,
    triggerOptions = _objectWithoutProperties(_ref3, _excluded2);
  var _ref4 = mergedOptions.panel,
    panelReplaceClassName = _ref4.replaceClassName,
    panelOptions = _objectWithoutProperties(_ref4, _excluded3);
  var hoverOptions = hover ? {
    onMouseEnter: open,
    onMouseLeave: close
  } : {};
  return /*#__PURE__*/_react.default.createElement(Container, _extends({}, containerOptions, {
    className: containerReplaceClassName !== null && containerReplaceClassName !== void 0 ? containerReplaceClassName : (0, _classnames.default)(_DropdownModule.default.dropdown, (_mergedOptions$contai = mergedOptions.container) === null || _mergedOptions$contai === void 0 ? void 0 : _mergedOptions$contai.className),
    ref: containerRef
  }), /*#__PURE__*/_react.default.createElement(Trigger, _extends({}, triggerOptions, hoverOptions, {
    className: triggerReplaceClassName !== null && triggerReplaceClassName !== void 0 ? triggerReplaceClassName : (0, _classnames.default)(_DropdownModule.default.trigger, (_mergedOptions$trigge = mergedOptions.trigger) === null || _mergedOptions$trigge === void 0 ? void 0 : _mergedOptions$trigge.className),
    ref: triggerRef,
    onClick: onTriggerClick
  }), trigger !== null && trigger !== void 0 ? trigger : /*#__PURE__*/_react.default.createElement(_DropdownComponents.TriggerIcon, null)), isOpened && isVisible && /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement(Panel, _extends({}, panelOptions, {
    className: panelReplaceClassName !== null && panelReplaceClassName !== void 0 ? panelReplaceClassName : (0, _classnames.default)(_DropdownModule.default.panel, (_mergedOptions$panel = mergedOptions.panel) === null || _mergedOptions$panel === void 0 ? void 0 : _mergedOptions$panel.className),
    ref: panelRef,
    style: {
      position: 'absolute',
      left: "".concat((_position$left = position === null || position === void 0 ? void 0 : position.left) !== null && _position$left !== void 0 ? _position$left : 0, "px"),
      top: "".concat((_position$top = position === null || position === void 0 ? void 0 : position.top) !== null && _position$top !== void 0 ? _position$top : 0, "px")
    }
  }), typeof children === 'function' ? children(close) : children), document.body));
}