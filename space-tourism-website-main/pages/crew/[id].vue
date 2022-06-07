<template>
  <div class="main">
    <div class="main__title heading5">
      <span class="main__title__number">02</span>Meet your crew
    </div>

    <div class="main__content">
      <div class="crew__border"></div>

      <div class="crew__description">
        <div class="crew__text">
          <h2 class="heading4">{{ role.role }}</h2>
          <h1 class="heading3">{{ role.name }}</h1>
          <p class="normaltext">{{ role.bio }}</p>
        </div>
      </div>
      <CrewMenu class="crew__menu" v-if="crew" :items="crew"></CrewMenu>
    </div>
    <div class="main__crew">
      <img :alt="role.name" :src="role.images.png" />
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
@media only screen and (max-width: 450px) {
  body.crew {
    background: url(/static/assets/crew/background-crew-mobile.jpg) no-repeat
      center center fixed;
    background-size: cover;
  }

  .crew__menu {
    order: 3;
  }
}

@media only screen and (max-width: 850px) {
  body.crew {
    background: url(/static/assets/crew/background-crew-tablet.jpg) no-repeat
      center center fixed;
    background-size: cover;
  }
}

@media only screen and (min-width: 851px) {
  body.crew {
    background: url(/static/assets/crew/background-crew-desktop.jpg) no-repeat
      center center fixed;
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

.main__crew {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 0;
}
.main__crew img {
  max-height: 14rem;
}
.crew__description {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-bottom: 2rem;
}

.heading4 {
  color: rgba(255, 255, 255, 0.5);
}

.heading3  {
  white-space: nowrap;
}
.main {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin: 0 1.5rem;
  flex: 1;
}

.crew__description {
  flex: 1;
}
.crew__border {
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.25);
}

.main__title__number {
  margin-right: 1rem;
  opacity: 0.25;
}

.main__title {
  width: 100%;
}

@media only screen and (max-width: 451px) {
  .main__title {
    order: 1;
  }
}
@media only screen and (min-width: 451px) {
  .main__title {
    margin-bottom: 4rem;
  }
  .main {
    align-items: center;
    flex-direction: column;
    margin: 0 4rem;
    text-align: left;
  }

  .main__content {
    flex: 0;
  }

  .main__crew {
    flex: 1;
    justify-content: center;
    text-align: center;
  }
  .main__crew img {
    max-height: 40rem;
  }

  .crew__description {
    text-align: center;
    margin: 0 6rem;
  }

  .crew__border {
    display: none;
  }
}

@media only screen and (min-width: 1150px) {
  .main {
    flex-direction: row;
    align-items: flex-end;
    margin: 2rem 0 0 6rem;
    text-align: left;
  }

  .main__title {
    flex: 1;
    margin-bottom: 0;
  }

  .crew__description {
    margin: 0;
  }
  .main__content {
    flex: 1;
  }
  .main__crew {
    align-items: flex-end;
    justify-content: stretch;
    flex: 1;
  }
  .main__crew img {
    max-height: 38rem;
  }

  .crew__text {
    width: 28rem;
    text-align: left;
  }

  .main__crew img {
    width: auto;
  }
}
</style>
