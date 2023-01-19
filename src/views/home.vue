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
  onHandleDel,
  onHandleAdd,
} = testAutoAnimate();
</script>

<template>
  <div>
    <el-button type="primary" size="default" @click="onHandleAdd">添加一个元素</el-button>
    <el-button type="primary" size="default" @click="length.sort((a, b) => a.id - b.id)"
      >升序</el-button
    >
    <el-button type="primary" size="default" @click="length.sort((a, b) => b.id - a.id)"
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
      text-white
      cursor-pointer
      v-for="(item, index) in length"
      :key="item.id"
      class="box-item"
      :class="[item.id === isSelected ? 'selected' : null]"
      v-memo="[item.id === isSelected]"
      @click="onHandleClick(item)"
    >
      <el-dropdown trigger="contextmenu" type="primary" placement="top">
        {{ "第" + item.id + "个元素" }}

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onHandleDel(index)"> 删除 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* global style it work */
:global(body) {
  background-color: rgb(233, 232, 232);
}

.box-item.selected {
  background: rgb(245, 214, 36);
  color: black;
}
</style>
