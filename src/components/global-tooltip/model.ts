import type { VNode } from 'vue';

export interface TooltipPropModel {
  content: string | number | VNode | VNode[];
  target: HTMLElement;
  popperClass?: string;
  effect?: 'dark' | 'light';
  placement?: any;
  overflowOnly?: 'x' | 'y' | 'both';
}
