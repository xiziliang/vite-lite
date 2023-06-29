import type { VNode } from 'vue';
import { type Placement } from '@popperjs/core';


export interface TooltipPropModel {
  content: string | number | VNode | VNode[];
  target: HTMLElement;
  popperClass?: string;
  effect?: 'dark' | 'light';
  placement?: Placement;
  overflowOnly?: 'x' | 'y' | 'both';
}
