<template>
  <main class="main">
    <div class="main__title heading5">
      <span class="main__title__number">01</span>Pick your destination
    </div>
    <div class="main__content">
      <div class="main__planet">
        <picture>
          <source type="image/webp" :srcset="planet.images.webp">
          <source type="image/png" :srcset="planet.images.png">
          <img :alt="planet.name" :src="planet.images.png" />
        </picture>
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
              <p class="subheading1">{{ planet.distance }}</p>
            </div>
            <div class="destination__travel">
              <div class="subheading2">Est. Travel Time</div>
              <p class="subheading1">{{ planet.travel }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
@media only screen and (max-width: 450px) {
  body.destination {
    background: url(/static/assets/destination/background-destination-mobile.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (max-width: 850px) {
  body.destination {
    background: url(/static/assets/destination/background-destination-tablet.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (min-width: 851px) {
  body.destination {
    background: url(/static/assets/destination/background-destination-desktop.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}
</style>
<style scoped>
.main__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.main__planet {
  margin-bottom: 1rem;
}

.main__planet img {
  width: 11rem;
}

.destination__description {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.heading2 {
  text-align: center;
}

.destination__full {
  color: var(--light-blue) !important;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin: 0 1.5rem;
}

.destination__description {
  flex: 1;
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
  flex-direction: column;
  justify-content: flex-start;
}

.destination__info .subheading2 {
  color: var(--light-blue);
}

p.subheading1 {
  margin: 0.5rem 0 2rem;
}

.destination__distance,
.destination__travel {
  flex: 1;
}

.main__title__number {
  margin-right: 1rem;
  opacity: 0.25;
}

@media only screen and (min-width: 451px) {
  .main__title {
    margin-bottom: 4rem;
  }

  .main {
    height: 80vh;
    align-items: flex-start;
    margin: 0 4rem;
  }

  .main__planet img {
    width: 20rem;
  }

  .destination__info {
    flex-direction: row;
  }
}

@media only screen and (min-width: 1150px) {
  .main {
    justify-content: center;
    align-items: flex-start;
  }

  .main__content {
    flex-direction: row;
  }

  .main__title {
    margin: 2rem 8rem;
  }

  .main__planet {
    flex: 1;
    margin-top: 3rem;
  }

  .destination__text {
    width: 28rem;
    text-align: left;
  }

  .main__planet img {
    width: auto;
  }

  .heading2 {
    text-align: left;
  }
}
</style>
