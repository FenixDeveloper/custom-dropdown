"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertManualSide = convertManualSide;
exports.getElementSide = getElementSide;
exports.getPosition = getPosition;
exports.sideInRange = sideInRange;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Side to Display Dropdown Panel relatively to Trigger
 */

/**
 * Partial side key for calculations mapping
 */

/**
 * CSS rules for block position
 */

/**
 * Position calculation mapper
 */

/**
 * Check number more than "from" and less than "to"
 */
function inRange(num, from, to) {
  return num > from && num < to;
}

/**
 * Check both point of the line is in the range
 */
function sideInRange(start, size, from, to) {
  return inRange(start, from, to) && inRange(start + size, from, to);
}

/**
 * Determines the closest sides of the viewport relative to the block
 */
function getElementSide(el) {
  return [sideInRange(el.y, el.height, 0, window.innerHeight / 2) ? 'top' : 'bottom', sideInRange(el.x, el.width, 0, window.innerWidth / 2) ? 'left' : 'right'];
}

/**
 * Convert side relative to trigger to side relative to viewport
 *
 * @param {ScreenSide} side trigger relative side
 * @return {[Side, Side]} viewport relative side
 */
function convertManualSide(side) {
  var _ref = side.split("-"),
    _ref2 = _slicedToArray(_ref, 2),
    v = _ref2[0],
    h = _ref2[1];
  var map = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  return [map[v], map[h]].join("-");
}

/**
 * Calculates the position of the panel relative to the trigger
 */
function getPosition(trigger, panel, side) {
  var _ref3 = side ? side.split("-") : getElementSide(trigger),
    _ref4 = _slicedToArray(_ref3, 2),
    v = _ref4[0],
    h = _ref4[1];
  var map = {
    left: function left() {
      return window.scrollX + trigger.x;
    },
    right: function right() {
      return window.scrollX + trigger.x + trigger.width - panel.width;
    },
    top: function top() {
      return window.scrollY + trigger.y + trigger.height + 1;
    },
    bottom: function bottom() {
      return window.scrollY + trigger.y - panel.height - 1;
    }
  };
  return {
    top: map[v](),
    left: map[h]()
  };
}