import { defineComponent, type PropType, type VNode, Transition } from 'vue';
import { createPopper, type Placement, type Instance } from '@popperjs/core';
import './global-tooltip.scss';

let mo: MutationObserver;

export const GlobalTooltip = defineComponent({
  props: {
    content: [String, Number, Object, Array] as PropType<string | number | VNode | VNode[]>,
    target: {
      type: HTMLElement,
      required: true,
    },
    popperClass: String,
    effect: {
      type: String as PropType<'dark' | 'light'>,
      default : 'dark',
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top',
    },
  },
  data: () => ({ popper: {} as Instance }),
  mounted() {
    const { target } = this;
    // 给关联元素添加属性 (attribute) data-value，在属性值变化时触发 tooltip 坐标重新计算
    if (target.nodeType === Node.ELEMENT_NODE && target.hasAttribute('data-value')) {
      // 尝试使tooltip跟随target移动
      if (!mo) {
        mo = new MutationObserver(function(this: void, entries) {
          entries.forEach(entry => {
            (entry.target as HTMLElement & { _tooltipComponent?: any })._tooltipComponent.updatePopper();
          });
        });
      }
      (target as any)._tooltipComponent = this;
      mo.observe(target, { attributeFilter: ['data-value'] });
    }
  },
  beforeUnmount() {
    this.popper.destroy();
    (this.target as any)._tooltipComponent = null;
    mo?.disconnect(); // MutationObserver 不支持 unobserve
  },
  methods: {
    updatePopper() {
      this.popper.update();
    },
    doCreate(el: HTMLElement) {
      this.popper = createPopper(this.target, el, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'arrow',
            options: {
              element: el.firstElementChild,
            },
          },
        ],
      });
    },
  },

  render() {
    return (
      <Transition
        name="fade"
        appear={true}
        onBeforeEnter={this.doCreate}>
        <div
          role="tooltip"
          hidden={this.content == null}
          style={{zIndex: 99999, whiteSpace: 'pre-line'}}
          class={[
            'global-tooltip',
            'is-' + this.effect,
            this.popperClass,
          ]}>
          <div class={[
            'tooltip-arrow',
            'is-' + this.effect,
          ]}/>
          <div class="ant-tooltip-inner">{this.content}</div>
        </div>
      </Transition>
    );
  },
});
