import {RefObject, useEffect} from "react";
import {getElementSide, ScreenSide} from "../lib/utils";

/**
 * @param {ScreenSide} side current nearest side position of element
 */
type ScrollServiceCallback = (side: ScreenSide) => void;

/**
 * @param {ScreenSide} side previous element position
 * @param {ScrollServiceCallback} callback fires when position changed and not equal to previous
 */
type ScrollNodeMapItem = {
  side: ScreenSide,
  callback: ScrollServiceCallback
};

/**
 * Single scroll service provider for all components
 */
class ScrollService {
  nodeMap: Map<HTMLElement, ScrollNodeMapItem>;
  onScroll: () => void;

  constructor() {
    this.nodeMap = new Map();

    this.onScroll = () => {
      this.nodeMap.forEach(({side, callback}, node) => {
        const nextSide = getElementSide(node.getBoundingClientRect()).join("-") as ScreenSide;
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
  observe(node: HTMLElement, callback: ScrollServiceCallback) {
    this.nodeMap.set(node, {
      side: getElementSide(node.getBoundingClientRect()).join("-") as ScreenSide,
      callback
    });
  }

  /**
   * Remove node from track list
   *
   * @param {HTMLElement} node tracked node
   */
  unobserve(node: HTMLElement) {
    this.nodeMap.delete(node);
  }
}

const service = new ScrollService();

/**
 * Tracks the change in the position of the element relative to the viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ScrollServiceCallback} callback fires when nearest side changed
 */
export function useScrollObserver(ref: RefObject<HTMLElement>, isEnabled: boolean, callback: ScrollServiceCallback): void {
  useEffect(() => {
    if (ref.current && isEnabled) {
      const node = ref.current;
      service.observe(node, callback);
      return () => {
        service.unobserve(node);
      }
    }
  }, [isEnabled, callback, ref]);
}
