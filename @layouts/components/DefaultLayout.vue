<script setup>
import { useLayoutConfigStore } from "@layouts/stores/config";
import VerticalNav from "./VerticalNav.vue";
import { Preset } from "@layouts/static/enums";

const configStore = useLayoutConfigStore();

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
});

const { width: windowWidth } = useWindowSize();
const isOverlayNavActive = ref(false);
const isOverlayNavVisible = ref(false);
const layoutClasses = computed(() => {
  return [
    ...configStore.layoutClasses,
    { "vertical-nav--overlay-active": isOverlayNavVisible.value },
  ];
});

const toggleIsOverlayNavActive = useToggle(isOverlayNavActive);

syncRef(isOverlayNavActive, isOverlayNavVisible);

watch(windowWidth, () => {
  if (configStore.isScreenXl && isOverlayNavVisible.value) {
    isOverlayNavVisible.value = false;
  }
});
</script>

<template>
  <div class="layout-wrapper" :class="layoutClasses">
    <!-- vertical nav -->
    <VerticalNav
      :nav-items="props.navItems"
      :toggle-is-overlay-nav-active="toggleIsOverlayNavActive"
    />

    <!-- frame -->
    <div class="frame-on-lyra"></div>

    <!-- content-layout -->
    <div class="content-layout-wrapper">
      <!-- content-layout/navbar -->
      <div class="content-layout">
        <div class="navbar-wrapper">
          <div class="navbar">
            <slot
              name="navbar"
              :toggleOverlayNavActive="toggleIsOverlayNavActive"
            />
          </div>
        </div>

        <!-- content-layout/content -->
        <div class="content-wrapper">
          <div class="content">
            <slot />
          </div>
        </div>

        <!-- content-layout/footer -->
        <div class="footer-wrapper">
          <div class="footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
