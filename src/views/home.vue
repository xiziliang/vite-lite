<script setup lang="ts">
import {
  testAutoAnimate,
  testPromise,
  testGenerator,
  useLoading,
  MusicTypeKeys,
  MusicTypeNameMaps,
  MusicTypeMaps,
} from "@/utils";
import { ref, onMounted } from "vue";
import Sticky from '@/components/sticky.vue';
defineOptions({
  name: "Home",
});

const { promiseTest, returnPromise } = testPromise();

const f = async () => console.log('now');

f().then(() => {
  console.log('next')
});

/**
 * Promise
 * 
 * then -> 如果return 的是一个普通值则会被封装成promise
 *         如果return 的是一个promise，是resolve则会传递到下一个then，是reject则会被传递到下一个catch 
 */
returnPromise()
  .then((res) => {
    return Promise.reject(new Error("failed result")); // 返回一个被拒绝的 Promise
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

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

const data = ref([
  {
    id: 1,
    name: "xzl",
    children: [
      {
        id: 2,
        name: "2--xzll",
        children: [
          {
            id: 4,
            name: "4--xzlll",
          },
        ],
      },
      {
        id: 3,
        name: "3--xzll",
      },
    ],
  },
  {
    id: 11,
    name: "11---xzl",
  },
]);

const { tree, array } = testGenerator(data);

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
  <Sticky :sticky-top="200">
    123
  </Sticky>
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
  <div flex="~ gap-12px">
    <div v-tooltip="'阿西吧是谁是谁'">outsidesdasdadsdsdsdss</div>
    <div v-tooltip="{ effect: 'light', placement: 'top', content: 'sdsdadadasadad' }">你好</div>
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
