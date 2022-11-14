"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClickOutsideObserver = useClickOutsideObserver;
var _react = require("react");
var isExists = function isExists(refs) {
  return refs.filter(function (refItem) {
    return !!refItem.current;
  }).length === refs.length;
};
var isContains = function isContains(refs, target) {
  return refs.filter(function (refItem) {
    var _refItem$current;
    return (_refItem$current = refItem.current) === null || _refItem$current === void 0 ? void 0 : _refItem$current.contains(target);
  }).length > 0;
};

/**
 * Monitors clicks outside the list of tracked items
 *
 * @param {RefObject[]} refs list of tracked refs (mutable ref, not elements!)
 * @param {boolean} isEnabled track or not to track
 * @param {MouseEventHandler} callback fires when clicked outside
 */
function useClickOutsideObserver(refs, isEnabled, callback) {
  (0, _react.useEffect)(function () {
    var onClickOutside = function onClickOutside(event) {
      if (isExists(refs) && isEnabled && !isContains(refs, event.target)) {
        callback(event);
      }
    };
    if (isExists(refs) && isEnabled) {
      document.addEventListener("mousedown", onClickOutside);
      return function () {
        document.removeEventListener("mousedown", onClickOutside);
      };
    }
  }, [isEnabled, callback, refs]);
}