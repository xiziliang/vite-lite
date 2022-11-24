import { ref, defineComponent, Fragment } from 'vue';

// tsx的render函数中不会自动结构ref，需要带.value
export const TestTsx = defineComponent({
  name: 'TestTsx',

  setup(props, { slots }) {
    const count = ref(0);
    const countRef = ref();
    const defaultSlot = slots.default?.();
    const showBtn = ref(false);

    return () => (
      <Fragment>
        <div ref={countRef}>
          {count.value}
        </div>
          {defaultSlot}
        <div>
          {showBtn.value && <el-button type="primary" size="default" onClick={() => count.value++}>testTsx++</el-button>}
        </div>
      </Fragment>
    )
  }
})
