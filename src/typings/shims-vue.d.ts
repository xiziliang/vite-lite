import type { PiniaCustomStateProperties } from 'pinia';

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// pinia
declare module 'pinia' {
  interface PiniaCustomStateProperties {
    /** 
     * reset
     * 
     * @description 只适应于组合式Api写法的重制功能
     */
    $setup_reset: () => void,
  }
}
