<template>
  <div class="main__title">
    <span class="number">01</span>Pick your destination
  </div>
  <div class="main__content">
    <div class="main__planet">
      <img :src="planet_img" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  created() {
    console.log(this.data.destinations[0]);
    this.planet_img = this.data.destinations[0].images.png;
    console.log(this.planet_img);
  },
};
</script>
<style scoped>
body {
  background: url(/static/assets/home/background-home-desktop.jpg) no-repeat
    center center fixed;
  background-size: cover;
}

.main__title {
  flex: 1;
}

.main__content {
  display: flex;
}
</style>
