<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Page Title",
  },
  subtitle: {
    type: String,
    default: "This is subtitle of the page.",
  },
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-2xl font-semibold mb-1">{{ props.title }}</h1>
    <span class="text-surface-400">{{ props.subtitle }}</span>
  </div>
</template>
