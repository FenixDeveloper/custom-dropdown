import { RefObject } from "react";
/**
 * @param {DOMRect} node element size after change
 */
declare type ResizeServiceCallback = (node: DOMRect) => void;
/**
 * Monitors element resize
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ResizeServiceCallback} callback fires when element size changed
 */
export declare function useResizeObserver(ref: RefObject<HTMLElement>, isEnabled: boolean, callback: ResizeServiceCallback): void;
export {};
