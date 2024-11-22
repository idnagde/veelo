import appConfig from "~/static/app.config";
import { defineStore } from "pinia";
import { useMediaQuery } from "@vueuse/core";
import { localStorageRef } from "@layouts/utils/helper";
import { injectionKeyIsVerticalNavHovered } from "@layouts/static/keys";
import {
  updatePrimaryColor,
  updateSurfaceColor,
  updateTheme,
} from "@layouts/utils/primevue";

export const useLayoutConfigStore = defineStore("layoutConfig", () => {
  const appPreset = localStorageRef("appPreset", appConfig.app.preset);

  const appPrimaryColor = localStorageRef(
    "appPrimaryColor",
    appConfig.app.primaryColor
  );

  const appSurfaceColor = localStorageRef(
    "appSurfaceColor",
    appConfig.app.surfaceColor
  );

  const appTheme = localStorageRef("appTheme", appConfig.app.theme);

  const isVerticalNavUnpinned = localStorageRef(
    "isVerticalNavUnpinned",
    appConfig.verticalNav.isVerticalNavUnpinned
  );

  const layoutClasses = computed(() => {
    const isUnpinned = isVerticalNavUnpinned.value && isScreenXl.value;

    return [
      `preset--${appPreset.value}`,
      {
        "vertical-nav--unpinned": isUnpinned,
        "vertical-nav--pinned": !isUnpinned,
      },
      {
        "vertical-nav--overlay": !isScreenXl.value,
      },
      [
        `theme--${appTheme.value}`,
        `primary--${appPrimaryColor.value}`,
        `surface--${appSurfaceColor.value}`,
      ],
    ];
  });

  const openedVerticalNavGroup = ref([]);

  const isScreenXl = computed(
    () =>
      useMediaQuery(`(min-width: ${appConfig.app.verticalNavBreakpoint}px)`)
        .value
  );

  const isVerticalNavUnpinnedUnhoveredXl = (isVerticalNavHovered = null) => {
    const isVerticalNavHoveredLocal =
      isVerticalNavHovered ||
      inject(injectionKeyIsVerticalNavHovered) ||
      ref(false);

    return computed(
      () =>
        isScreenXl.value &&
        isVerticalNavUnpinned.value &&
        !isVerticalNavHoveredLocal.value
    );
  };

  watch(appPrimaryColor, updatePrimaryColor, { immediate: true });

  watch(appSurfaceColor, updateSurfaceColor, { immediate: true });

  watch([appPreset, appTheme, usePreferredColorScheme()], updateTheme, {
    immediate: true,
  });

  return {
    appPreset,
    appPrimaryColor,
    appSurfaceColor,
    appTheme,
    isVerticalNavUnpinned,
    layoutClasses,
    openedVerticalNavGroup,
    isScreenXl,
    isVerticalNavUnpinnedUnhoveredXl,
  };
});
