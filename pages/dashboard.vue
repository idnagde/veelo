<script setup>
definePageMeta({
  alias: "/",
});

const config = useRuntimeConfig();

console.log({ apiBaseUrl: config.public.apiBaseUrl });
</script>

<template>
  <Filler title="Dashboard" />
</template>
