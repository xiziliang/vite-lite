<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/store'

defineProps<{ msg: string }>()

const count = ref(0)
const counter = useCounterStore()

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="btns" flex="~ gap4" items-center>
      <el-button @click="count++">count is {{ count }}</el-button>
      <div flex-1 text-center>{{ counter.count }} ----- {{ counter.doubleCount }}</div> 
      <el-button type="primary" size="default" @click="counter.increment">加一</el-button>
    </div>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p>
    <a href="https://github.com/xiziliang/vite-lite" target="_blank"
      >npx degit xiziliang/vite-lite my-vite-lite</a
    >, the official Vue + Vite + Element-Plus + TS
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

  <nav text-xl mt-6>
    <a class="icon-btn mx-2">
      <div i-logos:chrome />
    </a>

    <button class="icon-btn mx-2" >
      <div i="carbon-sun" />
    </button>

    <a class="icon-btn mx-2" href="https://vuejs.org/">
      <div i-logos-vue />
    </a>

    <a class="icon-btn mx-2" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <div i-logos:github-icon />
    </a>
  </nav>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
