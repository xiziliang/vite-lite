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
    <el-button type="primary" size="default" @click="toggle">{{
      isEnable ? "开启动画" : "禁用动画"
    }}</el-button>
  </div>

  <div ref="animateRef">
    <div
      v-for="item in length"
      :key="item"
      :class="[item === isSelected ? 'selected' : null]"
      v-memo="[item === isSelected]"
      @click="onHandleClick(item)"
    >
      {{ item + "我是列表" }}
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
