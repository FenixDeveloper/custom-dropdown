/**
 * Side to Display Dropdown Panel relatively to Trigger
 */
export type ScreenSide = "top-left" | "top-right" | "bottom-left" | "bottom-right";
/**
 * Partial side key for calculations mapping
 */
export type Side = "top" | "bottom" | "left" | "right";

/**
 * CSS rules for block position
 */
export interface Position {
  top: number,
  left: number
}

/**
 * Position calculation mapper
 */
export type SideMap<T> = {
  [key in Side]: T;
};

/**
 * Check number more than "from" and less than "to"
 */
function inRange(num: number, from: number, to: number): boolean {
  return num > from && num < to;
}

/**
 * Check both point of the line is in the range
 */
export function sideInRange(start: number, size: number, from: number, to: number): boolean {
  return inRange(start, from, to) && inRange(start + size, from, to);
}

/**
 * Determines the closest sides of the viewport relative to the block
 */
export function getElementSide(el: DOMRect): [Side, Side] {
  return [
    sideInRange(el.y, el.height, 0, (window.innerHeight / 2)) ? 'top' : 'bottom',
    sideInRange(el.x, el.width, 0, (window.innerWidth / 2)) ? 'left' : 'right'
  ];
}

/**
 * Convert side relative to trigger to side relative to viewport
 *
 * @param {ScreenSide} side trigger relative side
 * @return {[Side, Side]} viewport relative side
 */
export function convertManualSide(side: ScreenSide): ScreenSide {
  const [v, h] = side.split("-") as [Side, Side];
  const map: SideMap<Side> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  return [map[v], map[h]].join("-") as ScreenSide;
}

/**
 * Calculates the position of the panel relative to the trigger
 */
export function getPosition(trigger: DOMRect, panel: DOMRect, side?: ScreenSide): Position {
  const [v, h] = side ? (side.split("-") as [Side, Side]) : getElementSide(trigger);
  const map: SideMap<() => number> = {
    left: () => window.scrollX + trigger.x,
    right: () => window.scrollX + trigger.x + trigger.width - panel.width,
    top: () => window.scrollY + trigger.y + trigger.height + 1,
    bottom: () => window.scrollY + trigger.y - panel.height - 1
  };
  return {
    top: map[v](),
    left: map[h]()
  };
}
