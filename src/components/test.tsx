import { ref, defineComponent, Fragment } from 'vue';

export const Test = defineComponent({
  setup(props, { slots }) {
    const count = ref(0);
    const countRef = ref();
    const defaultSlot = slots.default?.();

    return () => (
      <Fragment>
        <div ref={countRef}>
          {count.value}
        </div>
          {defaultSlot}
        <div>
          <el-button type="primary" size="default" onClick={() => count.value++}>test++</el-button>
        </div>
      </Fragment>
    )
  }
})
