<template>
  <div class="main">
    <div class="main__title heading5">
      <span class="main__title__number">02</span>Meet your crew
    </div>
    <div class="main__content">
      <div class="main__crew">
        <img :alt="role.name" :src="role.images.png" />
      </div>
      <div class="crew__border"></div>
      <div class="crew__description">
        <div class="crew__text">
          <h2 class="heading5">{{ role.role }}</h2>
          <h1 class="heading4">{{ role.name }}</h1>
          <p class="normaltext">{{ role.bio }}</p>
          <CrewMenu v-if="crew" :items="crew"></CrewMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slugify } from "../../helpers";
export default {
  props: ["data"],
  created() {
    this.crew = this.data.crew.map((el) => slugify(el.role));
    const crew_role = slugify(this.$route.path.replace("/crew/", ""));
    this.role = this.data.crew.find((el) => slugify(el.role) === crew_role);
  },
  beforeCreate() {
    if (process.client) {
      document.body.className = "crew";
    }
  },
};
</script>
<style>
body.crew {
  background: url(/static/assets/crew/background-crew-desktop.jpg) no-repeat
    center center fixed;
  background-size: cover;
}
</style>
<style scoped>
.main__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.main__crew img {
  width: 11rem;
}
.crew__description {
  flex: 1;
  display: flex;
  justify-content: left;
  margin-bottom: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.heading2 {
  text-align: center;
}
.crew__full {
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

.crew__description {
  flex: 1;
}
.crew__border {
  height: 1px;
  width: 100%;
  flex: 1;
  background-color: rgba(255, 255, 255, 0.25);
}

.crew__info {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.crew__distance {
  margin-bottom: 2rem;
}

.crew__info .subheading2 {
  color: var(--light-blue);
}
.crew__distance,
.crew__travel {
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

  .main__crew img {
    width: 20rem;
  }

  .crew__info {
    flex-direction: row;
  }
}

@media only screen and (min-width: 1150px) {
  .main__content {
    flex-direction: row-reverse;
  }

  .main__crew {
    position: relative;
  }

  .main__crew img {
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: 30rem;
  }

  .crew__border {
    display: none;
  }
  .main__title {
    margin: 2rem 10rem;
  }

  .main__crew {
    flex: 1;
    margin-top: 3rem;
  }

  .crew__text {
    width: 28rem;
    text-align: left;
  }

  .main__crew img {
    width: auto;
  }

  .heading2 {
    text-align: left;
  }
}
</style>
