<script setup lang="ts">
import { testAutoAnimate, testPromise } from "@/utils";

defineOptions({
  name: "Home",
});

const { promiseTest } = testPromise();
promiseTest();

const {
  length,
  isEnable,
  isSelected,
  animateRef,

  toggle,
  onHandleClick,
  reDisruptSort,
} = testAutoAnimate();
</script>

<template>
  <div>
    <el-button
      type="primary"
      size="default"
      @click="() => length.push(Math.max(...length) + 1)"
      >点击添加一行</el-button
    >
    <el-button type="primary" size="default" @click="length.sort((a, b) => a - b)"
      >生序</el-button
    >
    <el-button type="primary" size="default" @click="length.sort((a, b) => b - a)"
      >降序</el-button
    >
    <el-button type="primary" size="default" @click="reDisruptSort(length)"
      >打乱排序</el-button
    >
    <el-button type="primary" size="default" @click="toggle">{{
      isEnable ? "开启动画" : "禁用动画"
    }}</el-button>
  </div>

  <div ref="animateRef" grid="~ gap-12px cols-6 lg:cols-10" p-20>
    <div
      w-100px
      h-100px
      flex="~"
      justify-center
      items-center
      bg-blue
      v-for="item in length"
      :key="item"
      :class="[item === isSelected ? 'selected' : null]"
      v-memo="[item === isSelected]"
      @click="onHandleClick(item)"
    >
      {{ "第" + item + "个元素" }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* global style it work */
:global(body) {
  background-color: rgb(233, 232, 232);
}

.selected {
  background: skyblue;
}
</style>
