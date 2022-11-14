import {RefObject, useEffect} from "react";

/**
 * @param {boolean} isVisible is element visible in viewport or not
 */
type IntersectionServiceCallback = (isVisible: boolean) => void;

/**
 * Single intersection service provider for all components
 */
class IntersectionService {
  nodeMap: Map<HTMLElement, IntersectionServiceCallback>;
  onIntersection: IntersectionObserverCallback;
  observer: IntersectionObserver;

  constructor() {
    this.nodeMap = new Map();

    this.onIntersection = (entries) => {
      for (let entry of entries) {
        const callback = this.nodeMap.get(entry.target as HTMLElement);
        if (callback) callback(entry.isIntersecting);
      }
    }

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
  observe(node: HTMLElement, callback: IntersectionServiceCallback) {
    this.nodeMap.set(node, callback);
    this.observer.observe(node);
  }

  /**
   * Remove node from track list
   *
   * @param {HTMLElement} node tracked node
   */
  unobserve(node: HTMLElement) {
    this.nodeMap.delete(node);
    this.observer.unobserve(node);
  }
}

const service = new IntersectionService();

/**
 * Tracks the visibility of element within viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ScrollServiceCallback} callback fires when nearest side changed
 */
export function useViewportObserver(ref: RefObject<HTMLElement>, isEnabled: boolean, callback: (isVisible: boolean) => void): void {
  useEffect(() => {
    if (ref.current && isEnabled) {
      const node = ref.current;
      service.observe(node, callback);
      return () => {
        service.unobserve(node);
      }
    }
  }, [isEnabled, callback, ref])
}
