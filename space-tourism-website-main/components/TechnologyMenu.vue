<template>
  <div class="menu__technology navtext">
    <div v-for="(item, index) in items">
      <NuxtLink class="menu__item" :to="`/technology/${item}`">{{
        index + 1
      }}</NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
};
</script>
<style scoped>
.menu__technology {
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 2rem;
  flex: 1;
}

.menu__item {
  display: block;
  margin-right: 1rem;
  border-radius: 50%;
  text-align: center;
  width: 2.2rem;
  line-height: 2.2rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  text-decoration: none;
  color: var(--white);
}

.router-link-active {
  background-color: var(--white);
  color: #0b0d17;
}

@media only screen and (min-width: 851px) {
  .menu__technology {
    justify-content: stretch;
  }
}
</style>
