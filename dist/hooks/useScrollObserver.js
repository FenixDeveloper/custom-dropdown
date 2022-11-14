"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollObserver = useScrollObserver;
var _react = require("react");
var _utils = require("../lib/utils");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Single scroll service provider for all components
 */
var ScrollService = /*#__PURE__*/function () {
  function ScrollService() {
    var _this = this;
    _classCallCheck(this, ScrollService);
    this.nodeMap = new Map();
    this.onScroll = function () {
      _this.nodeMap.forEach(function (_ref, node) {
        var side = _ref.side,
          callback = _ref.callback;
        var nextSide = (0, _utils.getElementSide)(node.getBoundingClientRect()).join("-");
        if (nextSide !== side) callback(nextSide);
      });
    };
    window.addEventListener('scroll', this.onScroll);
  }

  /**
   * Add node to track list
   *
   * @param {HTMLElement} node tracked node
   * @param {ScrollServiceCallback} callback fires when visibility changed
   */
  _createClass(ScrollService, [{
    key: "observe",
    value: function observe(node, callback) {
      this.nodeMap.set(node, {
        side: (0, _utils.getElementSide)(node.getBoundingClientRect()).join("-"),
        callback: callback
      });
    }

    /**
     * Remove node from track list
     *
     * @param {HTMLElement} node tracked node
     */
  }, {
    key: "unobserve",
    value: function unobserve(node) {
      this.nodeMap.delete(node);
    }
  }]);
  return ScrollService;
}();
var service = new ScrollService();

/**
 * Tracks the change in the position of the element relative to the viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ScrollServiceCallback} callback fires when nearest side changed
 */
function useScrollObserver(ref, isEnabled, callback) {
  (0, _react.useEffect)(function () {
    if (ref.current && isEnabled) {
      var node = ref.current;
      service.observe(node, callback);
      return function () {
        service.unobserve(node);
      };
    }
  }, [isEnabled, callback, ref]);
}