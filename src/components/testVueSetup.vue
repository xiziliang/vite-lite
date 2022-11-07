<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TestVueSetup",

  setup(props, { slots }) {
    const count = ref(0);
    const countRef = ref();
    const label = ref("TestTS++");

    return {
      count,
      countRef,
      label,
    };
  },
});
</script>

<template>
  <div ref="countRef">
    {{ count }}
  </div>
  <slot></slot>
  <div>
    <el-button type="primary" size="default" @click="() => count++">testVue++</el-button>
  </div>
</template>
