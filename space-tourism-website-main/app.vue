<script setup>
const { error, data } = await useFetch(
  "https://tombatossals.github.io/frontendmentor-challenges/space-tourism-website-main/static/data.json"
);
</script>

<template>
  <NuxtLayout name="layout">
    <NuxtPage :data="data" />
  </NuxtLayout>
</template>
