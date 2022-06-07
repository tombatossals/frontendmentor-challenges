<template>
  <div class="main">
    <div class="main__title heading5">
      <span class="main__title__number">03</span>Space launch 101
    </div>
    <div class="technology__description">
      <div class="main__technology">
        <img :alt="technology.name" :src="technology.images.landscape" />
      </div>
      <TechnologyMenu
        v-if="technologies"
        :items="technologies"
      ></TechnologyMenu>

      <div class="technology__text">
        <h2 class="heading4">the terminology...</h2>
        <h1 class="heading3">{{ technology.name }}</h1>
      </div>
    </div>
  </div>
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
    background: url(/static/assets/technology/background-technology-mobile.jpg)
      no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (max-width: 850px) {
  body.technology {
    background: url(/static/assets/technology/background-technology-tablet.jpg)
      no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (min-width: 851px) {
  body.technology {
    background: url(/static/assets/technology/background-technology-desktop.jpg)
      no-repeat center center fixed;
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
  max-height: 10rem;
}
.technology__description {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin: 0 2rem;
}

.heading4 {
  color: var(--light-blue);
  margin-bottom: 0.5rem;
}

.heading3  {
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

.technology__description {
  flex: 1;
}
.main__title__number {
  margin-right: 1rem;
  opacity: 0.25;
}

.main__title {
  width: 100%;
}

@media only screen and (min-width: 451px) {
  .main__title {
    margin-bottom: 4rem;
    margin-left: 8rem;
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
    flex: 1;
    justify-content: center;
    text-align: center;
    width: 100%;
    background: red;
  }
  .main__technology img {
    object-fit: cover;
    width: 100%;
  }

  .technology__description {
    text-align: center;
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

  .main__title {
    flex: 1;
    margin: 2rem 6rem;
  }

  .technology__description {
    display: flex;
    flex-direction: row-reverse;
  }
  .main__content {
    flex: 1;
  }
  .main__technology {
    align-items: flex-end;
    justify-content: stretch;
    flex: 1;
  }
  .main__technology img {
    max-height: 38rem;
  }

  .technology__text {
    width: 28rem;
    text-align: left;
  }

  .main__technology img {
    width: auto;
  }
}
</style>
