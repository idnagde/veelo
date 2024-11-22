<script setup>
import { useLayoutConfigStore } from "@layouts/stores/config";
import appConfig from "~/static/app.config";
import PrimeIcon from "~/components/PrimeIcon.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const configStore = useLayoutConfigStore();
const shallRenderIcon = configStore.isVerticalNavUnpinnedUnhoveredXl();
</script>

<template>
  <li class="nav-item-heading">
    <div class="heading-wrapper">
      <Transition name="nav-item-heading" mode="out-in">
        <component
          :is="shallRenderIcon ? PrimeIcon : 'span'"
          :class="shallRenderIcon ? 'heading-placeholder-icon' : 'heading-text'"
          v-bind="appConfig.icons.headingPlaceholder"
        >
          {{ !shallRenderIcon ? props.item?.heading : null }}
        </component>
      </Transition>
    </div>
  </li>
</template>

<style>
.nav-item-heading-enter-active,
.nav-item-heading-leave-active {
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.nav-item-heading-enter-from,
.nav-item-heading-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
