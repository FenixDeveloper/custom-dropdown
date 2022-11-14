import {RefObject, useEffect} from "react";

const isExists = (refs: RefObject<HTMLElement>[]) => refs.filter(refItem => !!refItem.current).length === refs.length;
const isContains = (refs: RefObject<HTMLElement>[], target: Node) => refs.filter(refItem => refItem.current?.contains(target)).length > 0;

/**
 * Monitors clicks outside the list of tracked items
 *
 * @param {RefObject[]} refs list of tracked refs (mutable ref, not elements!)
 * @param {boolean} isEnabled track or not to track
 * @param {MouseEventHandler} callback fires when clicked outside
 */
export function useClickOutsideObserver(refs: RefObject<HTMLElement>[], isEnabled: boolean, callback: (event: MouseEvent) => void): void {
  useEffect(() => {
    const onClickOutside = (event: MouseEvent): void => {
      if (isExists(refs) && isEnabled && !isContains(refs, event.target as Node)) {
        callback(event);
      }
    };
    if (isExists(refs) && isEnabled) {
      document.addEventListener("mousedown", onClickOutside);
      return () => {
        document.removeEventListener("mousedown", onClickOutside);
      }
    }
  }, [isEnabled, callback, refs]);
}
