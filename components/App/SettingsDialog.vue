<script setup>
import { useLayout } from "@layouts";
import { useLayoutConfigStore } from "@layouts/stores/config";
import originLight from "~/assets/settings/origin-light.svg";
import originDark from "~/assets/settings/origin-dark.svg";
import originMixed from "~/assets/settings/origin-mixed.svg";
import originSystem from "~/assets/settings/origin-system.svg";
import arcLight from "~/assets/settings/arc-light.svg";
import arcDark from "~/assets/settings/arc-dark.svg";
import arcMixed from "~/assets/settings/arc-mixed.svg";
import arcSystem from "~/assets/settings/arc-system.svg";
import classicLight from "~/assets/settings/classic-light.svg";
import classicDark from "~/assets/settings/classic-dark.svg";
import classicMixed from "~/assets/settings/classic-mixed.svg";
import classicSystem from "~/assets/settings/classic-system.svg";

const imageMap = {
  origin: {
    light: originLight,
    dark: originDark,
    mixed: originMixed,
    system: originSystem,
  },
  arc: {
    light: arcLight,
    dark: arcDark,
    mixed: arcMixed,
    system: arcSystem,
  },
  classic: {
    light: classicLight,
    dark: classicDark,
    mixed: classicMixed,
    system: classicSystem,
  },
};

const props = defineProps({
  visible: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:visible"]);

const updateVisible = (val) => emit("update:visible", val);

const layout = useLayout();
const configStore = useLayoutConfigStore();

// const presetOptions = computed(() => layout.getPresetOpt());
// const themeOptions = computed(() => layout.getThemeOpt());
const primaryOptions = computed(() => layout.getPrimaryOpt());
const surfaceOptions = computed(() => layout.getSurfaceOpt());
const themeOptions = computed(() =>
  Object.entries(imageMap[configStore.appPreset] || {}).map(([key, src]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize theme label
    value: key,
    src,
  })),
);
const presetOptions = computed(() =>
  Object.entries(imageMap).map(([presetKey, themes]) => ({
    label: presetKey.charAt(0).toUpperCase() + presetKey.slice(1),
    value: presetKey,
    src: themes[configStore.appTheme],
  })),
);

const updateTheme = (selectedTheme) => {
  configStore.appTheme = selectedTheme;
};
const updatePreset = (selectedPreset) => {
  configStore.appPreset = selectedPreset;
};

const resolveActiveTheme = (theme) => {
  return theme === configStore.appTheme;
};
const resolveActivePreset = (preset) => {
  return preset === configStore.appPreset;
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="updateVisible"
    modal
    header="Appearance Settings"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <h2 class="mb-4 text-lg font-semibold">Theme</h2>
    <div class="mb-8 flex flex-wrap gap-6">
      <div v-for="item in themeOptions" class="flex flex-col gap-2">
        <img
          class="aspect-[16/10] w-56 cursor-pointer rounded-lg border border-surface-300 dark:border-surface-700"
          :class="{
            'ring-2 ring-primary-500 ring-offset-2 dark:ring-primary-400 dark:ring-offset-surface-800':
              resolveActiveTheme(item.value),
          }"
          :src="item.src"
          :alt="item.value"
          @click="updateTheme(item.value)"
        />
        <span class="text-surface-500">{{ item.label }}</span>
      </div>
    </div>

    <h2 class="mb-4 text-lg font-semibold">Primary Color</h2>
    <AppColorsetPicker
      v-model="configStore.appPrimaryColor"
      type="primary"
      :options="primaryOptions"
      :size="7"
      class="mb-8"
    />

    <h2 class="mb-4 text-lg font-semibold">Surface Color</h2>
    <AppColorsetPicker
      v-model="configStore.appSurfaceColor"
      type="surface"
      :options="surfaceOptions"
      :size="7"
      class="mb-8"
    />

    <h2 class="mb-4 text-lg font-semibold">Preset Layout</h2>
    <div class="mb-8 flex flex-wrap gap-6">
      <div v-for="item in presetOptions" class="flex flex-col gap-2">
        <!-- <div
          class="aspect-[16/9] w-56 cursor-pointer rounded-lg border border-surface-300"
          :class="{
            'ring-2 ring-primary-500 ring-offset-2 dark:ring-primary-400 dark:ring-offset-surface-800':
              resolveActivePreset(item.value),
          }"
          @click="updatePreset(item.value)"
        /> -->
        <img
          class="aspect-[16/10] w-56 cursor-pointer rounded-lg border border-surface-300 dark:border-surface-700"
          :class="{
            'ring-2 ring-primary-500 ring-offset-2 dark:ring-primary-400 dark:ring-offset-surface-800':
              resolveActivePreset(item.value),
          }"
          @click="updatePreset(item.value)"
          :src="item.src"
          :alt="item.value"
        />
        <span class="text-surface-500">{{ item.label }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <Button label="OK" class="!w-28" @click="updateVisible(false)" />
      </div>
    </template>
  </Dialog>
</template>
