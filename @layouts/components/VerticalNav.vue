<script setup>
import { useLayoutConfigStore } from "@layouts/stores/config";
import { Theme, Preset } from "@layouts/static/enums";
import { injectionKeyIsVerticalNavHovered } from "@layouts/static/keys";
import { VNodeRenderer } from "./VNodeRenderer";
import appConfig from "~/static/app.config";
import VerticalNavHeading from "./VerticalNavHeading.vue";
import VerticalNavLink from "./VerticalNavLink.vue";
import VerticalNavGroup from "./VerticalNavGroup.vue";

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
  toggleIsOverlayNavActive: {
    type: Function,
    required: true,
  },
});

const configStore = useLayoutConfigStore();

const verticalNavRef = ref();
const isVerticalNavScrolled = ref(false);

const isHovered = useElementHover(verticalNavRef);
const hideTitleAndIcon =
  configStore.isVerticalNavUnpinnedUnhoveredXl(isHovered);

const verticalNavClasses = computed(() => {
  // let classes = [];
  // if (
  //   configStore.appTheme === Theme.Mixed ||
  //   configStore.appPreset === Preset.Lyra
  // )
  //   classes = ["mode-dark"];

  // return classes;

  return {
    "mode-dark":
      configStore.appTheme === Theme.Mixed ||
      configStore.appPreset === Preset.Lyra,
    scrolled: isVerticalNavScrolled.value,
  };
});

const resolveNavItemComponent = (item) => {
  if ("heading" in item) return VerticalNavHeading;
  if ("children" in item) return VerticalNavGroup;

  return VerticalNavLink;
};

const toggleVerticalNav = () => {
  configStore.isVerticalNavUnpinned = !configStore.isVerticalNavUnpinned;
};

const handleScroll = (event) => {
  // console.log(event);
  isVerticalNavScrolled.value = event.target.scrollTop > 0;
};

provide(injectionKeyIsVerticalNavHovered, isHovered);
</script>

<template>
  <div class="vertical-nav-wrapper" :class="verticalNavClasses">
    <div ref="verticalNavRef" class="vertical-nav">
      <!-- Header -->
      <div class="vertical-nav-header">
        <!-- vertical-nav header -->
        <NuxtLink to="/">
          <div class="app-title">
            <div class="logo">
              <VNodeRenderer :nodes="appConfig.app.logo" />
            </div>

            <Transition name="vertical-nav-header">
              <div
                v-show="!hideTitleAndIcon"
                class="title text-primary-500 dark:text-primary-400"
              >
                {{ appConfig.app.title }}
              </div>
            </Transition>
          </div>
        </NuxtLink>

        <!-- vertical-nav action-btn -->
        <Transition name="vertical-nav-header">
          <div
            v-show="!hideTitleAndIcon"
            class="header-action hidden"
            :class="configStore.isVerticalNavUnpinned && 'xl:block'"
          >
            <Button
              v-bind="appConfig.icons.unpinned"
              severity="secondary"
              rounded
              @click="toggleVerticalNav"
            />
          </div>
        </Transition>
        <div
          v-show="!hideTitleAndIcon"
          class="header-action hidden"
          :class="!configStore.isVerticalNavUnpinned && 'xl:block'"
        >
          <Button
            v-bind="appConfig.icons.pinned"
            severity="secondary"
            rounded
            @click="toggleVerticalNav"
          />
        </div>
        <div class="header-action xl:hidden">
          <Button
            v-bind="appConfig.icons.close"
            severity="secondary"
            rounded
            @click="props.toggleIsOverlayNavActive(false)"
          />
        </div>
      </div>

      <!-- Fade -->
      <div class="fade-effect"></div>

      <!-- Nav Items -->
      <PerfectScrollbar
        tag="ul"
        class="nav-items"
        :options="{ wheelPropagation: false }"
        @ps-scroll-y="handleScroll"
      >
        <component
          :is="resolveNavItemComponent(item)"
          v-for="item in [...props.navItems]"
          :key="item"
          :item="item"
        />
      </PerfectScrollbar>
    </div>
  </div>
</template>

<style>
.ps__thumb-y {
  inline-size: 0.3rem;
  inset-inline-end: 0.15rem;
  opacity: 0.5;
}
.mode-dark .ps__thumb-y {
  opacity: 0.3;
}
.ps__rail-y {
  z-index: 1;
  background: transparent !important;
  inline-size: 0.5rem;
  inset-inline-end: 0.125rem;
  inset-inline-start: unset;
}
.ps__rail-y.ps--clicking .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y:hover > .ps__thumb-y {
  inline-size: 0.375rem;
}

.vertical-nav-header-enter-active,
.vertical-nav-header-leave-active {
  transition:
    opacity 0.1s ease-in-out,
    transform 0.12s ease-in-out;
}

.vertical-nav-action-enter-active,
.vertical-nav-action-leave-active {
  transition:
    opacity 0.1s ease-in-out 0.5s,
    transform 0.12s ease-in-out 0.5s;
}

.vertical-nav-header-enter-from,
.vertical-nav-header-leave-to,
.vertical-nav-action-enter-from,
.vertical-nav-action-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
