import React, { HTMLAttributes, PropsWithChildren } from "react";
/**
 * Props for Container and Panel components
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    replaceClassName?: string;
}
/**
 * Props for Trigger component
 */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    replaceClassName?: string;
    onClick?: React.MouseEventHandler;
}
/**
 * Default trigger content
 */
export declare function TriggerIcon(): JSX.Element;
/**
 * Default container for dropdown
 */
export declare const DropdownContainer: React.ForwardRefExoticComponent<ContainerProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
/**
 * Default control element
 */
export declare const DropdownTrigger: React.ForwardRefExoticComponent<ButtonProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
/**
 * Default content container
 */
export declare const DropdownPanel: React.ForwardRefExoticComponent<ContainerProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
/**
 * Component with forwarded ref
 */
export declare type ForwardedComponent<C, E> = React.ForwardRefExoticComponent<PropsWithChildren<C> & React.RefAttributes<E>>;
/**
 * @param {ForwardedComponent} Container dropdown root element
 * @param {ForwardedComponent} Trigger control element for opening and closing the panel
 * @param {ForwardedComponent} Panel content container positioned relative to Trigger
 */
export interface DropdownComponents {
    Container: ForwardedComponent<ContainerProps, HTMLElement>;
    Trigger: ForwardedComponent<ButtonProps, HTMLElement>;
    Panel: ForwardedComponent<ContainerProps, HTMLElement>;
}
/**
 * You can pass "className" and other HTMLAttributes, class name will be extended with defaults
 *
 * @param {ContainerProps} container props for Container
 * @param {ButtonProps} trigger props for Trigger except "onClick"
 * @param {ContainerProps} panel props for Panel except "style"
 */
export interface DropdownOptions {
    container?: ContainerProps;
    trigger?: ButtonProps;
    panel?: ContainerProps;
}
export declare const DEFAULT_COMPONENTS: DropdownComponents;
export declare const DEFAULT_OPTIONS: DropdownOptions;
