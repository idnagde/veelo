<script setup>
import appConfig from "~/static/app.config";
import navItems from "~/static/navigations";

const DefaulLayout = defineAsyncComponent(
  () => import("@layouts/components/DefaultLayout.vue"),
);

const isAppSettingsDialogVisible = ref(false);
const search = ref();

const openAppSettingsDialog = () => {
  isAppSettingsDialogVisible.value = true;
};
</script>

<template>
  <DefaulLayout :nav-items="navItems">
    <!-- navbar -->
    <template v-slot:navbar="{ toggleOverlayNavActive }">
      <div class="flex w-full items-center justify-between gap-4 xl:gap-10">
        <div>
          <Button
            icon="pi pi-bars"
            severity="secondary"
            text
            rounded
            @click="toggleOverlayNavActive(true)"
          />
        </div>

        <IconField class="w-full">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="search"
            placeholder="Search"
            class="w-full max-w-96"
          />
        </IconField>

        <div class="flex gap-4">
          <OverlayBadge value="2" severity="danger" size="small" class="mr-1">
            <Button icon="pi pi-bell" severity="secondary" rounded />
          </OverlayBadge>

          <Button
            icon="pi pi-palette"
            severity="secondary"
            rounded
            @click="openAppSettingsDialog"
          />

          <Button icon="pi pi-user" severity="secondary" rounded />
        </div>
      </div>
    </template>

    <!-- content -->
    <template v-slot:default>
      <slot />
    </template>

    <!-- footer -->
    <template v-slot:footer>
      <div>
        <span class="text-surface-400">
          {{ appConfig.app.title }} &copy; Copyright
          {{ new Date().getFullYear() }} Gede Wahyu. All rights reserved.
        </span>
      </div>
    </template>
  </DefaulLayout>

  <AppSettingsDialog v-model:visible="isAppSettingsDialogVisible" />
</template>
