import { RefObject } from "react";
/**
 * Tracks the visibility of element within viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ScrollServiceCallback} callback fires when nearest side changed
 */
export declare function useViewportObserver(ref: RefObject<HTMLElement>, isEnabled: boolean, callback: (isVisible: boolean) => void): void;
