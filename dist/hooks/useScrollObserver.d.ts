import { RefObject } from "react";
import { ScreenSide } from "../lib/utils";
/**
 * @param {ScreenSide} side current nearest side position of element
 */
declare type ScrollServiceCallback = (side: ScreenSide) => void;
/**
 * Tracks the change in the position of the element relative to the viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {ScrollServiceCallback} callback fires when nearest side changed
 */
export declare function useScrollObserver(ref: RefObject<HTMLElement>, isEnabled: boolean, callback: ScrollServiceCallback): void;
export {};
