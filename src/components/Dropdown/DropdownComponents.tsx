import React, {HTMLAttributes, PropsWithChildren, RefObject} from "react";
import styles from "./Dropdown.module.scss";

/**
 * Props for Container and Panel components
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string,
  replaceClassName?: string
}

/**
 * Props for Trigger component
 */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string,
  replaceClassName?: string,
  onClick?: React.MouseEventHandler
}

/**
 * Default trigger content
 */
export function TriggerIcon(): JSX.Element {
  return <div className={styles.defaultTrigger}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
      <path
        d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/>
    </svg>
  </div>;
}

/**
 * Default container for dropdown
 */
export const DropdownContainer = React.forwardRef<HTMLElement, PropsWithChildren<ContainerProps>>((props, ref): JSX.Element => {
  const {children, ...rest} = props;
  return <div {...rest} ref={ref as RefObject<HTMLDivElement>}>{children}</div>;
});

/**
 * Default control element
 */
export const DropdownTrigger = React.forwardRef<HTMLElement, PropsWithChildren<ButtonProps>>((props, ref): JSX.Element => {
  const {children, ...rest} = props;
  return <button {...rest} ref={ref as RefObject<HTMLButtonElement>}>{children}</button>;
});

/**
 * Default content container
 */
export const DropdownPanel = React.forwardRef<HTMLElement, PropsWithChildren<ContainerProps>>((props, ref): JSX.Element => {
  const {children, ...rest} = props;
  return <div {...rest} ref={ref as RefObject<HTMLDivElement>}>{children}</div>;
});

/**
 * Component with forwarded ref
 */
export type ForwardedComponent<C, E> = React.ForwardRefExoticComponent<PropsWithChildren<C> & React.RefAttributes<E>>;

/**
 * @param {ForwardedComponent} Container dropdown root element
 * @param {ForwardedComponent} Trigger control element for opening and closing the panel
 * @param {ForwardedComponent} Panel content container positioned relative to Trigger
 */
export interface DropdownComponents {
  Container: ForwardedComponent<ContainerProps, HTMLElement>,
  Trigger: ForwardedComponent<ButtonProps, HTMLElement>,
  Panel: ForwardedComponent<ContainerProps, HTMLElement>,
}

/**
 * You can pass "className" and other HTMLAttributes, class name will be extended with defaults
 *
 * @param {ContainerProps} container props for Container
 * @param {ButtonProps} trigger props for Trigger except "onClick"
 * @param {ContainerProps} panel props for Panel except "style"
 */
export interface DropdownOptions {
  container?: ContainerProps,
  trigger?: ButtonProps,
  panel?: ContainerProps
}

export const DEFAULT_COMPONENTS: DropdownComponents = {
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  Panel: DropdownPanel
};

export const DEFAULT_OPTIONS: DropdownOptions = {
  container: {},
  trigger: {},
  panel: {}
};
