<template>
  <div class="menu__crew navtext">
    <div v-for="item in items">
      <NuxtLink class="menu__item" :to="`/crew/${item}`"></NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
};
</script>
<style scoped>
.menu__crew {
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 1rem;
  flex: 1;
}

.menu__item {
  display: block;
  margin-right: 1rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
}

.router-link-active {
  background-color: var(--white);
}

.menu__item:hover {
  border-bottom: 4px solid rgba(255, 255, 255, 0.25);
}

@media only screen and (min-width: 851px) {
  .menu__crew {
    justify-content: stretch;
  }
}
</style>
