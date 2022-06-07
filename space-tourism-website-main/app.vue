<script setup>
import data from "./static/data.json";
</script>

<template>
  <NuxtLayout name="layout">
    <NuxtPage :data="data" />
  </NuxtLayout>
</template>
