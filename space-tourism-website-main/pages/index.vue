<template>
  <div class="main__wrapper">
    <div class="main__margin"></div>
    <div class="main">
      <div class="main__content">
        <div class="main__description">
          <h3 class="heading5">So, you want to travel to</h3>
          <h1 class="heading1">Space</h1>
          <p class="normaltext">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
      </div>
      <div class="main__explore">
        <NuxtLink to="/destination/moon" class="main__circle heading4">Explore</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (process.client) {
      document.body.className = "home";
    }
  },
};
</script>
<style>
@media only screen and (max-width: 450px) {
  body.home {
    background: url(/static/assets/home/background-home-mobile.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (max-width: 850px) {
  body.home {
    background: url(/static/assets/home/background-home-tablet.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}

@media only screen and (min-width: 851px) {
  body.home {
    background: url(/static/assets/home/background-home-desktop.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}
</style>
<style scoped>
.main {
  margin-top: 2rem;
  display: flex;
  flex: 1;
  align-items: stretch;
  flex-direction: column;
}

.main__wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main__explore {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.main__circle:hover {
  box-shadow: 0 0 0 80px rgba(255, 255, 255, 0.25);
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
  transition: box-shadow 0.3s ease-in-out;
  text-decoration: none;
}

.main__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}

.main__description {
  color: var(--light-blue);
}

@media only screen and (max-width: 450px) {
  .main {
    padding: 0 1rem;
  }

  .main__content {
    text-align: center;
  }

  .main__explore {
    margin: 2rem 0;
  }

  .main__circle {
    width: 9rem;
    height: 9rem;
  }
}

@media only screen and (min-width: 451px) {
  .main__description {
    width: 28rem;
  }

  .main__content {
    text-align: center;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .main__description {
    text-align: center;
  }

  .main {
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .main__circle {
    width: 12rem;
    height: 12rem;

  }
}

@media only screen and (min-width: 1150px) {
  .main {
    flex-direction: row;
    align-items: stretch;
  }

  .main__margin {
    flex: 1;
  }
}
</style>
