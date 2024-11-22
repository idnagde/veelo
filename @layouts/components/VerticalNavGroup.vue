<script setup>
import { useLayoutConfigStore } from "@layouts/stores/config";
import { injectionKeyIsVerticalNavHovered } from "@layouts/static/keys";
import appConfig from "~/static/app.config";
import VerticalNavLink from "./VerticalNavLink.vue";
import TransitionWipe from "./TransitionWipe.vue";
import VerticalNavGroup from "./VerticalNavGroup.vue";

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

const route = useRoute();
const configStore = useLayoutConfigStore();
const shallHideTitleAndBadge = configStore.isVerticalNavUnpinnedUnhoveredXl();
const isVerticalNavHovered = inject(
  injectionKeyIsVerticalNavHovered,
  ref(false),
);
const isGroupActive = ref(false);
const isGroupOpen = ref(false);

const dynamicIndentation = computed(() => {
  if (props.level >= 1) {
    return { marginLeft: `${props.level * 1}rem` };
  }
});

const collapseChildren = (children) => {
  children.forEach((child) => {
    if ("children" in child) collapseChildren(child.children);

    configStore.openedVerticalNavGroup =
      configStore.openedVerticalNavGroup.filter(
        (group) => group !== child.title,
      );
  });
};

const isAnyChildOpen = (children) => {
  return children.some((child) => {
    let result = configStore.openedVerticalNavGroup.includes(child.title);
    if ("children" in child) result = isAnyChildOpen(child.children) || result;

    return result;
  });
};

const hasActiveChild = (items) => {
  const route = useRoute();

  return items.children.some((child) => {
    if (!child.children) return child.to === route.name;

    return hasActiveChild(child);
  });
};

watch(
  () => route.name,
  () => {
    isGroupActive.value = hasActiveChild(props.item);
    isGroupOpen.value =
      isGroupActive.value &&
      !configStore.isVerticalNavUnpinnedUnhoveredXl(isVerticalNavHovered).value;
  },
  { immediate: true },
);

watch(
  isGroupOpen,
  (val) => {
    const groupIndex = configStore.openedVerticalNavGroup.indexOf(
      props.item.title,
    );

    if (val && groupIndex !== -1) {
      configStore.openedVerticalNavGroup.push(props.item.title);
    } else if (!val && groupIndex !== -1) {
      configStore.openedVerticalNavGroup.splice(groupIndex, 1);
      collapseChildren(props.item.children);
    }
  },
  { immediate: true },
);

watch(
  () => configStore.openedVerticalNavGroup,
  (val) => {
    const lastOpenedGroup = val.at(-1);

    if (lastOpenedGroup === props.item.title) return;

    const isActive = hasActiveChild(props.item);

    if (isActive) return;

    if (isAnyChildOpen(props.item.children)) return;

    isGroupOpen.value = isActive;
    isGroupActive.value = isActive;
  },
  { deep: true },
);

watch(
  configStore.isVerticalNavUnpinnedUnhoveredXl(isVerticalNavHovered),
  (val) => {
    isGroupOpen.value = val ? false : isGroupActive.value;
  },
);
</script>

<template>
  <li class="nav-item-group" :class="{ active: hasActiveChild(props.item) }">
    <div
      class="group-label"
      tabindex="0"
      @click="isGroupOpen = !isGroupOpen"
      @keydown="if ($event.key === 'Enter') $event.target.click();"
    >
      <PrimeIcon
        class="group-icon"
        :style="dynamicIndentation"
        v-bind="
          props.item.icon || appConfig.verticalNav.defaultNavItemIconProps
        "
      />

      <TransitionGroup name="nav-item-group">
        <span v-show="!shallHideTitleAndBadge" key="title" class="group-title">
          {{ item.title }}
        </span>

        <Badge
          v-if="item.badge"
          v-show="!shallHideTitleAndBadge"
          key="badge"
          class="group-badge"
          v-bind="{
            value: item.badge.value,
            severity: item.badge.severity || 'danger',
          }"
        />

        <PrimeIcon
          v-show="!shallHideTitleAndBadge"
          class="group-chevron"
          :class="{ 'rotate-90': isGroupOpen }"
          key="chevron"
          v-bind="appConfig.icons.chevronRight"
        />
      </TransitionGroup>
    </div>

    <TransitionWipe>
      <ul v-show="isGroupOpen" class="group-children">
        <component
          v-for="child in props.item.children"
          :is="'children' in child ? VerticalNavGroup : VerticalNavLink"
          :key="child"
          :item="child"
          :level="props.level + 1"
        />
      </ul>
    </TransitionWipe>
  </li>
</template>

<style>
.nav-item-group-enter-active,
.nav-item-group-leave-active {
  transition:
    opacity 0.1s ease-in-out,
    transform 0.12s ease-in-out;
}
.nav-item-group-enter-from,
.nav-item-group-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.group-chevron {
  transition: all ease 0.12s;
}
</style>
