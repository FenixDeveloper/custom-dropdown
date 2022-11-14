import React, {createContext, useState} from "react";

/**
 * Contain current opened dropdown trigger dom element or null
 */
type DropdownSyncState = HTMLElement | null;

/**
 * Contains the DOM element of currently opened dropdown trigger
 *
 * @param {DropdownSyncState} current active dropdown
 * @param {React.SetStateAction} setCurrent set active dropdown
 */
interface DropdownContextState {
  current: DropdownSyncState,
  setCurrent: React.Dispatch<React.SetStateAction<DropdownSyncState>>
}

/**
 * Context for dropdown state synchronization
 */
export const DropdownContext = createContext<DropdownContextState | null>(null);

/**
 * Context provider for multiple Dropdown synchronization
 * @example only one can be opened
 * <DropdownSync>
 *   <Dropdown>FIRST</Dropdown>
 *   <Dropdown>SECOND</Dropdown>
 * </DropdownSync>
 */
export function DropdownSync({children}: React.PropsWithChildren): JSX.Element {
  const [current, setCurrent] = useState<DropdownSyncState>(null);

  return <DropdownContext.Provider value={{current, setCurrent}}>
    {children}
  </DropdownContext.Provider>
}
