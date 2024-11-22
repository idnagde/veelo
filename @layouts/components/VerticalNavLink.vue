<script setup>
import { useLayoutConfigStore } from "@layouts/stores/config";
import appConfig from "~/static/app.config";
import Badge from "primevue/badge";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
});

const configStore = useLayoutConfigStore();
const shallHideTitleAndBadge = configStore.isVerticalNavUnpinnedUnhoveredXl();

const dynamicIndentation = computed(() => {
  if (props.level >= 1) {
    return { marginLeft: `${props.level * 1}rem` };
  }
});
</script>

<template>
  <li class="nav-item-link">
    <NuxtLink :to="{ name: props.item.to }">
    <!-- <NuxtLink to="#"> -->
      <PrimeIcon
        class="link-icon"
        :style="dynamicIndentation"
        v-bind="
          props.item.icon || appConfig.verticalNav.defaultNavItemIconProps
        "
      />

      <TransitionGroup name="nav-item-link">
        <span v-show="!shallHideTitleAndBadge" key="title" class="link-title">
          {{ props.item.title }}
        </span>

        <Badge
          v-if="item.badge"
          v-show="!shallHideTitleAndBadge"
          key="badge"
          class="link-badge"
          v-bind="{
            value: props.item.badge.value,
            severity: props.item.badge.severity || 'danger',
          }"
        />
      </TransitionGroup>
    </NuxtLink>
  </li>
</template>

<style>
.nav-item-link-enter-active,
.nav-item-link-leave-active {
  transition: opacity 0.1s ease-in-out, transform 0.12s ease-in-out;
}

.nav-item-link-enter-from,
.nav-item-link-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
