import { markRaw, reactive } from 'vue';
import { type VNode, ref, type ObjectDirective } from 'vue';
import type { Placement } from '@popperjs/core';

/**
 * 简单的方式显示tooltip
 *
 * @example
 * v-tooltip="'始终显示'"
 * v-tooltip:overflow="'文字超出时显示'"
 * v-tooltip:overflow-x="'水平方向文字超出时显示'"
 * v-tooltip:overflow-y="'竖直方向文字超出时显示'"
 * v-tooltip:left="'在左边显示'
 * v-tooltip="{ placement: 'left', overflowOnly: true, content: '文字超出时在左边显示' }"
 * v-tooltip="null" // 不显示
 */

interface TooltipPropModel {
  content: string | number | VNode | VNode[];
  target: HTMLElement;
  popperClass?: string;
  effect?: 'dark' | 'light';
  placement?: Placement;
  overflowOnly?: 'x' | 'y' | 'both';
}

export const TooltipsGlobal = ref<TooltipPropModel[]>([]);

export const tooltip: ObjectDirective = {
  mounted(
    el: HTMLElement & { __tooltipModel?: TooltipPropModel },
    { value, arg },
  ) {
    const model: TooltipPropModel = reactive(value != null && typeof value === 'object' ? {
      ...value,
      target: markRaw(el),
    } : {
      content: value,
      target: markRaw(el),
    });

    if (arg) {
      if (arg.startsWith('overflow')) {
        const overflowOnly = arg.slice('overflow'.length + 1);
        model.overflowOnly = ['x', 'y'].includes(overflowOnly)
          ? overflowOnly as 'x' | 'y'
          : 'both';
      } else {
        model.placement = arg as any;
      }
    }

    function onMouseleave() {
      TooltipsGlobal.value.splice(TooltipsGlobal.value.indexOf(model), 1);
    }

    function onMouseenter() {
      let isShow = true;
      if (model.overflowOnly) {
        switch (model.overflowOnly) {
          case 'x': isShow = el.scrollWidth > el.clientWidth; break;
          case 'y': isShow = el.scrollHeight > el.clientHeight; break;
          default: isShow = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight; break;
        }
      }
      if (isShow && model.content != null) {
        TooltipsGlobal.value.push(model);

        el.addEventListener('mouseleave', onMouseleave, { once: true });
      }
    }

    el.addEventListener('mouseenter', onMouseenter);
    el.__tooltipModel = model;
  },
  updated(el: HTMLElement & { __tooltipModel?: any }, { value }) {
    const { __tooltipModel: model } = el;
    if (value != null && typeof value === 'object') {
      Object.assign(model, value);
    } else {
      model.content = value;
    }
  },
  beforeUnmount(el: HTMLElement & { __tooltipModel?: any }) {
    const { __tooltipModel: model } = el;
    const index = TooltipsGlobal.value.indexOf(model);
    if (index >= 0) TooltipsGlobal.value.splice(index, 1);
  },
};
