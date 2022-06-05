<script setup>
const data = await import("/static/data.json");
</script>

<template>
  <NuxtLayout name="layout">
    <NuxtPage :data="data" />
  </NuxtLayout>
</template>
