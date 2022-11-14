import {RefObject, useEffect} from "react";

/**
 * @param {DOMRect} node element size after change
 */
type ResizeServiceCallback = (node: DOMRect) => void;

/**
 * @param {DOMRect} size previous element size
 * @param {ResizeServiceCallback} callback fires when size changed and not equal to previous
 */
type ResizeNodeMapItem = {
  size: DOMRect,
  callback: ResizeServiceCallback
};

/**
 * Single resize service provider for all components
 */
class ResizeService {
  nodeMap: Map<HTMLElement, ResizeNodeMapItem>;
  observer: ResizeObserver;
  onResize: ResizeObserverCallback;

  constructor() {
    this.nodeMap = new Map();

    this.onResize = (entries) => {
      for (let entry of entries) {
        const {size, callback} = this.nodeMap.get(entry.target as HTMLElement) as ResizeNodeMapItem;
        const nextSize = entry.target.getBoundingClientRect();
        if ((nextSize.width !== size.width || nextSize.height !== size.height) && callback) {
          callback(nextSize);
        }
      }
    }

    this.observer = new ResizeObserver(this.onResize);
  }

  /**
   * Add node to track list
   *
   * @param {HTMLElement} node tracked node
   * @param {ResizeServiceCallback} callback fires when visibility changed
   */
  observe(node: HTMLElement, callback: ResizeServiceCallback) {
    this.nodeMap.set(node, {
      size: node.getBoundingClientRect(),
      callback
    });
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

const service = new ResizeService();

/**
 * Monitors element resize
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ResizeServiceCallback} callback fires when element size changed
 */
export function useResizeObserver(ref: RefObject<HTMLElement>, isEnabled: boolean, callback: ResizeServiceCallback): void {
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
