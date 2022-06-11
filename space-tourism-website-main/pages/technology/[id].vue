<template>
  <main class="main">
    <div class="main__title heading5">
      <span class="main__title__number">03</span>Space launch 101
    </div>
    <div class="technology__description">
      <div class="main__technology">
        <img class="landscape" :alt="technology.name" :src="technology.images.landscape" />
        <img class="portrait" :alt="technology.name" :src="technology.images.portrait" />
      </div>
      <TechnologyMenu class="technology__menu" v-if="technologies" :items="technologies"></TechnologyMenu>

      <div class="technology__text">
        <h2 class="navtext">the terminology...</h2>
        <h1 class="heading3">{{ technology.name }}</h1>
        <p class="normaltext">{{ technology.description }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import { slugify } from "../../helpers";
export default {
  props: ["data"],
  created() {
    this.technologies = this.data.technology.map((el) => slugify(el.name));
    const technology = slugify(this.$route.path.replace("/technology/", ""));
    this.technology = this.data.technology.find(
      (el) => slugify(el.name) === technology
    );
  },
  beforeCreate() {
    if (process.client) {
      document.body.className = "technology";
    }
  },
};
</script>
<style>
@media only screen and (max-width: 450px) {
  body.technology {
    background: url(/static/assets/technology/background-technology-mobile.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (max-width: 850px) {
  body.technology {
    background: url(/static/assets/technology/background-technology-tablet.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (min-width: 851px) {
  body.technology {
    background: url(/static/assets/technology/background-technology-desktop.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}
</style>
<style scoped>
.main__content {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main__technology {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 0;
}

.main__technology img {
  width: 100%;
  max-height: 10rem;
}

.technology__description {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin: 0;
}

.heading4 {
  color: var(--light-blue);
  margin-bottom: 0.5rem;
}

.heading3 {
  white-space: nowrap;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  flex: 1;
}


.main__title__number {
  margin-right: 1rem;
  opacity: 0.25;
}

.main__title {
  width: 100%;
}

.landscape {
  display: inline;
}

.portrait {
  display: none;
}

.navtext {
  color: var(--light-blue);
  margin-bottom: 1rem;
}

@media only screen and (max-width: 450px) {

  .normaltext {
    margin: 2rem;
  }
}

@media only screen and (min-width: 451px) {
  .main__title {
    padding-bottom: 4rem;
    padding-left: 5rem;
  }

  .main {
    align-items: center;
    flex-direction: column;
    margin: 0;
    text-align: left;
  }

  .main__content {
    flex: 0;
  }

  .main__technology {
    flex: 0;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .main__technology img {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
  }

  .technology__description {
    text-align: center;
    margin: 0;
  }

  .technology__text {
    margin: 0 6rem;
  }

  .technology__border {
    display: none;
  }
}

@media only screen and (min-width: 1150px) {
  .main {
    flex-direction: column;
    text-align: left;
    margin: 0 0 0 12rem;
  }

  .technology__menu {
    order: 1;
    flex: 0;
  }

  .heading3 {
    font-size: 64px;
  }

  .main__title {
    margin: 0 0;
    display: flex;
    align-items: flex-end;
    flex: 1;
  }

  .technology__description {
    margin: 0 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex: 3;
  }

  .main__content {
    flex: 1;
  }

  .main__technology {
    flex: 1;
    align-items: center;
    display: flex;
  }

  .main__technology img {
    max-width: 100%;
    object-fit: cover;
    min-height: 36rem;
  }

  .technology__text {
    text-align: left;
    justify-content: space-between;
    align-items: space-between;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 4rem 0 2rem;
  }

  .portrait {
    display: inline;
  }

  .landscape {
    display: none;
  }
}
</style>
