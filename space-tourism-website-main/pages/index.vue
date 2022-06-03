<script setup>
const { error, data } = await useFetch("/static/data.json");
console.log(error);
</script>

<template>
  <div class="main">
    <div class="main__content">
      <div class="main__description">
        <h3 class="heading5">So, you want to travel to</h3>
        <h1 class="heading1">Space</h1>
        <p class="normaltext">
          {{ data }}
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
          {{ data && data.destinations }}
        </p>
      </div>
    </div>
    <div class="main__explore">
      <div class="main__bigcircle"></div>
      <div class="main__circle heading4">Explore</div>
    </div>
  </div>
</template>

<style>
body {
  background: url(/static/assets/home/background-home-desktop.jpg) no-repeat
    center center fixed;
  background-size: cover;
}

.main {
  display: flex;
}

.main__explore {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2.5rem;
  position: relative;
}

.main__bigcircle {
  position: absolute;
  top: calc(50% - 22rem / 2);
  left: calc(50% - 25rem / 2);
  border-radius: 50%;
  width: 25rem;
  height: 25rem;
  background-color: var(--white);
  opacity: 0;
}

.main__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  color: var(--black);
  padding: 0;
  z-index: 10;
}

.main__content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
}

.main__description {
  width: 27.8rem;
}
</style>
