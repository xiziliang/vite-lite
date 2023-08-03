<template>
  <div :style="{ height, zIndex }">
    <div
      :class="className"
      :style="styles"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { StyleValue, defineComponent } from 'vue';
export default defineComponent({
  name: "Sticky",
  props: {
    stickyTop: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
      position: undefined,
      width: '',
      height: '',
      isSticky: false,
    };
  },
  computed: {
    styles() {
      const { zIndex, position, width, height } = this
      return {
        top: this.isSticky ? this.stickyTop + 'px' : '',
        zIndex,
        position,
        width,
        height
      } as StyleValue
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height + "px";
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  activated() {
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    sticky() {
      if (this.active) {
        return;
      }
      this.position = "fixed" as any;
      this.active = true;
      this.width = this.width + "px";
      this.isSticky = true;
    },
    handleReset() {
      if (!this.active) {
        return;
      }
      this.reset();
    },
    reset() {
      this.position = undefined;
      this.width = "auto";
      this.active = false;
      this.isSticky = false;
    },
    handleScroll() {
      const width = this.$el.getBoundingClientRect().width;
      this.width = width || "auto";
      const offsetTop = this.$el.getBoundingClientRect().top;
      if (offsetTop < 0) {
        this.sticky();
        return;
      }
      this.handleReset();
    },
    handleResize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + "px";
      }
    },
  },
});
</script>
