import React from "react";
/**
 * Contain current opened dropdown trigger dom element or null
 */
declare type DropdownSyncState = HTMLElement | null;
/**
 * Contains the DOM element of currently opened dropdown trigger
 *
 * @param {DropdownSyncState} current active dropdown
 * @param {React.SetStateAction} setCurrent set active dropdown
 */
interface DropdownContextState {
    current: DropdownSyncState;
    setCurrent: React.Dispatch<React.SetStateAction<DropdownSyncState>>;
}
/**
 * Context for dropdown state synchronization
 */
export declare const DropdownContext: React.Context<DropdownContextState | null>;
/**
 * Context provider for multiple Dropdown synchronization
 * @example only one can be opened
 * <DropdownSync>
 *   <Dropdown>FIRST</Dropdown>
 *   <Dropdown>SECOND</Dropdown>
 * </DropdownSync>
 */
export declare function DropdownSync({ children }: React.PropsWithChildren): JSX.Element;
export {};
