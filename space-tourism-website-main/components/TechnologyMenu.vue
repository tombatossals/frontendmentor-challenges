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
  flex: 0;
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

@media only screen and (min-width: 451px) {
  .menu__item {
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.6rem;
    margin: 2rem 1rem;
  }
}

@media only screen and (min-width: 851px) {
  .menu__technology {
    justify-content: space-evenly;
    flex-direction: column;
    align-items: space-around;
    margin: 0;
  }

  .menu__item {
    width: 6rem;
    height: 6rem;
    line-height: 6rem;
    font-size: 2.4rem;
    margin: 1rem 0;
  }
}
</style>
