/**
 * Side to Display Dropdown Panel relatively to Trigger
 */
export declare type ScreenSide = "top-left" | "top-right" | "bottom-left" | "bottom-right";
/**
 * Partial side key for calculations mapping
 */
export declare type Side = "top" | "bottom" | "left" | "right";
/**
 * CSS rules for block position
 */
export interface Position {
    top: number;
    left: number;
}
/**
 * Position calculation mapper
 */
export declare type SideMap<T> = {
    [key in Side]: T;
};
/**
 * Check both point of the line is in the range
 */
export declare function sideInRange(start: number, size: number, from: number, to: number): boolean;
/**
 * Determines the closest sides of the viewport relative to the block
 */
export declare function getElementSide(el: DOMRect): [Side, Side];
/**
 * Convert side relative to trigger to side relative to viewport
 *
 * @param {ScreenSide} side trigger relative side
 * @return {[Side, Side]} viewport relative side
 */
export declare function convertManualSide(side: ScreenSide): ScreenSide;
/**
 * Calculates the position of the panel relative to the trigger
 */
export declare function getPosition(trigger: DOMRect, panel: DOMRect, side?: ScreenSide): Position;
