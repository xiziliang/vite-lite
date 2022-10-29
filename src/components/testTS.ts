import { ref, defineComponent, h } from 'vue';
import { ElButton } from 'element-plus'

export const TestTs = defineComponent({
  setup(props, { slots }) {
    const count = ref(0);
    const countRef = ref();
    const label = ref('TestTS++');

    return ()=> [
      h('div', {
        ref: countRef,
      }, count.value),
      // NOTE: or slots.default ? h(slots.default) : undefined,
      slots.default?.(),
      h('div', h(ElButton, {
        type: 'primary',
        size: 'default',
        onClick: () => count.value++,
      }, () => label.value)),
    ]
  },
})
