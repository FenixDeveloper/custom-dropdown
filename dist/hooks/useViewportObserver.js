"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViewportObserver = useViewportObserver;
var _react = require("react");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Single intersection service provider for all components
 */
var IntersectionService = /*#__PURE__*/function () {
  function IntersectionService() {
    var _this = this;
    _classCallCheck(this, IntersectionService);
    this.nodeMap = new Map();
    this.onIntersection = function (entries) {
      var _iterator = _createForOfIteratorHelper(entries),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          var callback = _this.nodeMap.get(entry.target);
          if (callback) callback(entry.isIntersecting);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
    this.observer = new IntersectionObserver(this.onIntersection, {
      rootMargin: "0px 0px 0px 0px",
      threshold: 1
    });
  }

  /**
   * Add node to track list
   *
   * @param {HTMLElement} node tracked node
   * @param {IntersectionServiceCallback} callback fires when visibility changed
   */
  _createClass(IntersectionService, [{
    key: "observe",
    value: function observe(node, callback) {
      this.nodeMap.set(node, callback);
      this.observer.observe(node);
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
      this.observer.unobserve(node);
    }
  }]);
  return IntersectionService;
}();
var service = new IntersectionService();

/**
 * Tracks the visibility of element within viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ScrollServiceCallback} callback fires when nearest side changed
 */
function useViewportObserver(ref, isEnabled, callback) {
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