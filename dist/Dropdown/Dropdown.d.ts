import React from 'react';
import { ScreenSide } from "../lib/utils";
import { DropdownComponents, DropdownOptions } from "./DropdownComponents";
/**
 * Component children as function
 */
export declare type FunctionChildren = (fn: () => void) => React.ReactNode;
/**
 * @param {ReactNode} trigger trigger button content
 * @param {ScreenSide} side panel position or auto if undefined
 * @param {boolean} hover is hover opening enabled, false by default
 * @param {ReactNode | FunctionChildren} children dropdown content
 * @param {DropdownComponents} components overwrite internal components
 * @param {DropdownOptions} options pass props to internal components
 */
export interface DropdownProps {
    trigger?: React.ReactNode;
    side?: ScreenSide;
    hover?: boolean;
    children: React.ReactNode | FunctionChildren;
    components?: DropdownComponents;
    options?: DropdownOptions;
}
/**
 * Customizable dropdown component for controllable display of nested custom content
 * @example internal components structure
 * <Container>
 *   <Trigger>{trigger}</Trigger>
 *   <Panel>{children | function}</Panel>
 * </Container>
 * @example minimal with default icon
 * <Dropdown>
 *   My Content
 * </Dropdown>
 * @example with close function and custom label
 * <Dropdown trigger="open panel">
 *   {(close) => <p>Content <a onClick={close}>close panel</a></p>}
 * </Dropdown>
 */
export declare function Dropdown({ trigger, children, side, components, options, hover }: DropdownProps): JSX.Element;
