<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: String,
  /** 类型
   * @description 1 = 转岗  2 = 不在岗  null = 正常
   */
  type: {
    type: [String, Number],
    default: null,
  },
});

const options = computed(() => {
  if (!props.type) return {};

  switch (+props.type) {
    case 1:
      return {
        class: "transfer-job",
        typeName: "转岗",
        color: "#ec3e35",
      };
    case 2:
      return {
        class: "no-job",
        typeName: "不在岗",
        color: "#f97029",
      };
    default:
      return {};
  }
});
</script>

<template>
  <span v-if="props.type" class="job-tag">
    <span>{{ label }}</span>
    <span class="job" :class="options.class">
      <span
        class="circle"
        :style="{
          backgroundColor: options.color,
        }"
      ></span>
      <span
        class="triangle"
        :style="{
          borderLeftColor: options.color,
        }"
      ></span>
      <span class="tip">{{ options.typeName }}</span>
    </span>
  </span>
  <span v-else>{{ label }}</span>
</template>
<style lang="scss" scoped>
.job {
  width: 34px;
  font-size: 12px;
  color: #ffffff;
  padding: 2px 5px;
  padding-right: 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 0px;
  position: relative;

  top: -8px;
}

.job-tag {
  position: relative;
  padding: 0 8px;
}

.transfer-job {
  background: #ec3e35;
}

.no-job {
  background: #f97029;
}

.circle {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: #ec3e35;
  border-radius: 50%;
  position: absolute;
  right: -9px;
  top: 0px;
}

.triangle {
  width: 0;
  height: 0;
  border: 4px solid;
  border-color: transparent;
  position: absolute;
  left: 0px;
  bottom: -3px;
}

.tip {
  position: relative;
  z-index: 2;
  transform: scale(0.75);
  display: inline-block;
}
</style>
