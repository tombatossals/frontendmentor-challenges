<template>
  <div class="main__destination">
    <div class="main__title heading5">
      <span class="main__title__number">01</span>Pick your destination
    </div>
    <div class="main__content">
      <div class="main__planet">
        <img :src="planet.images.png" />
      </div>
      <div class="destination__description">
        <div class="destination__text">
          <DestinationMenu v-if="planets" :items="planets"></DestinationMenu>
          <h1 class="heading2">{{ planet.name }}</h1>
          <p class="normaltext">{{ planet.description }}</p>
          <div class="destination__border"></div>
          <div class="destination__info">
            <div class="destination__distance">
              <div class="subheading2">Avg. Distance</div>
              <p class="nomargin subheading1">{{ planet.distance }}</p>
            </div>
            <div class="destination__travel">
              <div class="subheading2">Est. Travel Time</div>
              <p class="nomargin subheading1">{{ planet.travel }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export default {
  props: ["data"],
  created() {
    this.planets = this.data.destinations.map((el) => el.name);
    const planet_name = capitalize(
      this.$route.path.replace("/destination/", "")
    );
    this.planet = this.data.destinations.find((el) => el.name === planet_name);
  },
  beforeCreate() {
    if (process.client) {
      document.body.className = "destination";
    }
  },
};
</script>
<style>
body.destination {
  background: url(/static/assets/destination/background-destination-desktop.jpg)
    no-repeat center center fixed;
  background-size: cover;
}
</style>
<style scoped>
.main__title {
  flex: 1;
  margin: 4rem 0 2rem;
}

.main__content {
  display: flex;
  width: 100%;
  flex: 1;
}

.main__planet {
  flex: 1;
  margin-top: 3rem;
}

.destination__description {
  flex: 1;
  display: flex;
  justify-content: left;
}

.destination__text {
  width: 28rem;
  text-align: left;
}

.destination__full {
  color: var(--light-blue) !important;
}

.main__destination {
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10rem;
}

.destination__border {
  height: 1px;
  width: 100%;
  flex: 1;
  background-color: rgba(255, 255, 255, 0.25);
}

.destination__info {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
}

.destination__distance,
.destination__travel {
  flex: 1;
}

.nomargin {
  margin: 0.5rem 0 0 0;
}
.main__title__number {
  margin-right: 1rem;
  opacity: 0.25;
}
</style>
