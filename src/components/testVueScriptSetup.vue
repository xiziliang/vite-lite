<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { useCounterStore } from "@/store";

defineOptions({
  name: "TestVueScriptSetup",
});

defineProps<{ msg: string }>();

const count = ref(0);
const $count = $ref(0);

const counter = useCounterStore();

const frameworks = shallowRef([
  {
    title: "Angular",
    href: "https://angular.io/",
    icon: "i-logos-angular-icon",
  },
  {
    title: "Svelte",
    href: "https://svelte.dev/",
    icon: "i-logos-svelte-icon",
  },
  {
    title: "Solid",
    href: "https://www.solidjs.com/",
    icon: "i-logos-solidjs-icon",
  },
  {
    title: "React",
    href: "https://reactjs.org/",
    icon: "i-logos-react",
  },
  {
    title: "Vue",
    href: "https://vuejs.org/",
    icon: "i-logos-vue",
  },
  {
    title: "GitHub",
    href: "https://github.com/xiziliang/vite-lite",
    icon: "i-logos:github-icon",
  },
]);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="btns" flex="~ gap4" items-center>
      <el-button @click="count++">count is {{ count }}</el-button>
      <el-button @click="$count++">$count is {{ $count }}</el-button>
      <div flex-1 text-center>
        {{ counter.name }} --- {{ counter.count }} ----- {{ counter.doubleCount }}
      </div>
      <el-button type="primary" size="default" @click="counter.increment">加一</el-button>
      <el-button type="primary" size="default" @click="counter.$setup_reset()"
        >reset</el-button
      >
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

  <nav class="frameworks" text-xl mt-6>
    <a
      v-for="item in frameworks"
      class="icon-btn mx-2"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      target="_blank"
    >
      <div :class="item.icon" />
    </a>
  </nav>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
