<template>
  <div class="menu__destination navtext">
    <div v-for="item in items">
      <NuxtLink class="menu__item" :to="`/destination/${item.toLowerCase()}`">
        {{ item }}</NuxtLink
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
};
</script>
<style scoped>
.menu__destination {
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
}

.router-link-active {
  border-bottom: 4px solid var(--white) !important;
}

.menu__item {
  color: var(--white);
  text-decoration: none;
  display: block;
  padding: 0.8rem 0;
  margin-right: 2rem;
  border-bottom: 4px solid transparent;
  z-index: 10;
}

.menu__item:hover {
  border-bottom: 4px solid rgba(255, 255, 255, 0.25);
}
</style>
