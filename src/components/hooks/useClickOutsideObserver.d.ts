import { RefObject } from "react";
/**
 * Monitors clicks outside the list of tracked items
 *
 * @param {RefObject[]} refs list of tracked refs (mutable ref, not elements!)
 * @param {boolean} isEnabled track or not to track
 * @param {MouseEventHandler} callback fires when clicked outside
 */
export declare function useClickOutsideObserver(refs: RefObject<HTMLElement>[], isEnabled: boolean, callback: (event: MouseEvent) => void): void;
