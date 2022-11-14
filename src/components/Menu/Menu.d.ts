import React, { HTMLAttributes } from "react";
/**
 * Fires only after menu item command executed
 */
export declare type CommandEventHandler = (event: React.MouseEvent<HTMLElement>, item: MenuItemData) => void;
/**
 * Function for render menu item content (inside li tag)
 */
export declare type ItemContentRender = (props: MenuItemData) => JSX.Element;
/**
 * Menu component props
 *
 * @param {MenuItemData[]} items array of menu items
 * @param {string} className menu root element class name
 * @param {CommandEventHandler} onCommand callback passed to items for controllable close of parent
 */
export interface MenuProps extends HTMLAttributes<HTMLElement> {
    items: MenuItemData[];
    className?: string;
    onCommand?: CommandEventHandler;
}
/**
 * Menu item data model props
 * @param {string} label item text (inside span tag)
 * @param {JSX.Element | string} icon item icon as valid react element or class name (on span tag)
 * @param {string} className item root class name
 * @param {string} labelClassName item text element (span tag) class name
 * @param {CommandEventHandler} command item click action
 * @param {ItemContentRender} content render function for custom item content
 */
export interface MenuItemData extends HTMLAttributes<HTMLElement> {
    label: string;
    icon?: JSX.Element | string;
    className?: string;
    labelClassName?: string;
    command?: CommandEventHandler;
    content?: ItemContentRender;
}
/**
 * MenuItem component props
 *
 * @see MenuItemData
 * @param {CommandEventHandler} onCommand command event callback
 */
interface MenuItemProps extends MenuItemData {
    onCommand?: CommandEventHandler;
}
/**
 * MenuIcon component props
 *
 * @param {JSX.Element | string} icon item icon as valid react element or class name (on span tag)
 */
export interface MenuIconProps extends HTMLAttributes<HTMLElement> {
    icon?: JSX.Element | string;
}
/**
 * Abstract icon renderer, support class based icons and JSX elements
 *
 * @example with fontawesome icon class
 * <MenuIcon icon="fa-solid fa-user" />
 *
 * @example with fontawesome icon element
 * <MenuIcon icon={<FasUser />} />
 */
export declare function MenuIcon({ icon }: MenuIconProps): JSX.Element | null;
/**
 * One menu item, can be customized by classes or content renderer function. Marked as disabled if no command supplied.
 *
 * @see MenuItemData
 * @see MenuIcon
 * @example props with label and icon
 * {label: "first item", icon: "fa-solid fa-user"}
 *
 * @example props with custom renderer
 * {content: ({label, labelClassName, icon}) => <React.Fragment>
 *   <span className={labelClassName}>{label}</span>
 *   {icon ? <i className={icon} /> : null}
 * </React.Fragment>}
 *
 * @example default item component structure
 * <li className={className} onClick={command}>
 *   <span className={labelClassName}>{label}</span>
 *   <MenuIcon icon={icon} />
 * <li>
 */
export declare function MenuItem({ content, ...props }: MenuItemProps): JSX.Element;
/**
 * Simple flat menu component
 *
 * @see MenuItem
 * @example internal structure
 * <ul className={className}>
 *   <MenuItem />
 *   ...
 * </ul>
 *
 * @example how to use
 * <Menu items={[
 *   {label: "first", command: () => {}},
 *   {label: "second", icon: "fa-solid fa-user", command: () => {}}
 * ]} />
 */
export declare function Menu({ items, className, onCommand }: MenuProps): JSX.Element;
export {};
