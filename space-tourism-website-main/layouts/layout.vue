<template>
  <div>

    <Head>
      <Meta charset="UTF-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Link rel="icon" type="image/png" sizes="32x32" href="@/static/assets/favicon-32x32.png" />

      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Bellefair&display=swap"
        rel="stylesheet" />

      <Title>Frontend Mentor | Space tourism website</Title>
    </Head>

    <div class="layout">
      <header class="header">
        <div class="header__logo">
          <img alt="Logo" src="@/static/assets/shared/logo.svg" />
        </div>
        <div class="header__line"></div>
        <div class="header__menu__burger" v-click-outside="() => showMenu = false">
          <img @click="showMenu = true" alt="Menu" src="@/static/assets/shared/icon-hamburger.svg" />
          <div class="header__menu__small" :class="{ showMenu: showMenu }">
            <img @click="showMenu = false" class="icon__close" alt="Menu" src="@/static/assets/shared/icon-close.svg" />

            <NuxtLink class="header__menuitem__small" to="/"><span class="header__menuitem__number">00</span> Home
            </NuxtLink>
            <NuxtLink class="header__menuitem__small" to="/destination/moon" :class="
              $route.path.search('destination') !== -1 && 'router-link-active'
            "><span class="header__menuitem__number">01</span>
              Destination</NuxtLink>
            <NuxtLink class="header__menuitem__small" to="/crew/commander"
              :class="$route.path.search('crew') !== -1 && 'router-link-active'"><span
                class="header__menuitem__number">02</span> Crew</NuxtLink>
            <NuxtLink class="header__menuitem__small" to="/technology/launch-vehicle" :class="
              $route.path.search('technology') !== -1 && 'router-link-active'
            "><span class="header__menuitem__number">03</span>
              Technology</NuxtLink>
          </div>
        </div>


        <div class="header__menu navtext">
          <div class="header__menu__background"></div>
          <NuxtLink class="header__menuitem" to="/"><span class="header__menuitem__number">00</span> Home</NuxtLink>
          <NuxtLink class="header__menuitem" to="/destination/moon" :class="
            $route.path.search('destination') !== -1 && 'router-link-active'
          "><span class="header__menuitem__number">01</span>
            Destination</NuxtLink>
          <NuxtLink class="header__menuitem" to="/crew/commander"
            :class="$route.path.search('crew') !== -1 && 'router-link-active'"><span
              class="header__menuitem__number">02</span> Crew</NuxtLink>
          <NuxtLink class="header__menuitem" to="/technology/launch-vehicle" :class="
            $route.path.search('technology') !== -1 && 'router-link-active'
          "><span class="header__menuitem__number">03</span>
            Technology</NuxtLink>
        </div>
      </header>
      <slot />
    </div>
  </div>
</template>
<script >
export default {
  data() {
    return {
      showMenu: false
    }
  },
  directives: {
    "click-outside": {
      beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = (evt) => {
          evt.stopPropagation();
          if (!(el === evt.target || el.contains(evt.target))) {
            binding.value(evt, el);
          }
        }
        // Wait 1 frame otherwise a potential click that mounted the element will immediately trigger a click-outside event:
        window.requestAnimationFrame(() => { document.addEventListener('click', el.clickOutsideEvent) });
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      },
    }
  }
}</script>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  flex: 1;
  min-height: 100vh;
  min-width: 370px;
}

.header {
  flex: 0;
  margin: 0 1.5rem 2rem;
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__menu__small.showMenu {
  display: flex;
}

.header__menu__small {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 70%;
  min-height: 100vh;
  backdrop-filter: blur(28px);
  z-index: 100;
  display: none;
  flex-direction: column;
  padding: 2rem 0 2rem 2rem;
}

.header__menu__small a {
  color: var(--white);
  font: 16px "Barlow Condensed", sans-serif;
  text-transform: uppercase;
  letter-spacing: 2.7px;
}

.header__menuitem__small.router-link-active {
  border-right: 4px solid var(--white);
}

.icon__close {
  width: 2rem;
  align-self: flex-end;
  margin-bottom: 3rem;
  margin-right: 2rem;
}

.header__menuitem__small {
  padding: 0.5rem 0 0.5rem 0.5rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  text-decoration: none;
}

.header__line {
  height: 1px;
  width: 100%;
  flex: 1;
  margin-left: 8rem;
  background-color: rgba(255, 255, 255, 0.25);
  z-index: 10;
  display: none;
}

.header__menuitem.router-link-active {
  border-bottom: 4px solid var(--white);
}

.header__menu {
  position: relative;
  display: flex;
  list-style: none;
  flex: 2;
  justify-content: space-evenly;
  backdrop-filter: blur(8px);
  margin-left: 0;
  padding: 0;
}

.header__menu__background {
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.header__menuitem {
  color: var(--white);
  text-decoration: none;
  display: block;
  padding: 3rem 0;
  border-bottom: 4px solid transparent;
  z-index: 10;
}

.header__menuitem:hover {
  border-bottom: 4px solid rgba(255, 255, 255, 0.25);
}

.header__menuitem__number {
  font-weight: bold;
  display: none;
}

.header__menu__burger {
  justify-self: flex-end;
  flex: 1;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 450px) {
  .header__menu {
    display: none;
  }

  .menu__burger__icon {
    display: block;
  }

  .header {
    margin: 1.5rem;
    display: flex;
    justify-content: flex-start;
  }

  .header__logo {
    flex: 1;
  }

  .header__logo img {
    width: 2.5rem;
  }

  .header__line {
    display: none;
  }
}

@media only screen and (min-width: 451px) {
  .header {
    margin-right: 0;
    margin-left: 4rem;
  }

  .header__menu__burger {
    display: none;
  }

  .header__logo {
    flex: 1;
  }

  .header__logo img {
    flex: 1;
    width: 3.5rem;
  }
}

@media only screen and (min-width: 851px) {
  .header__menuitem {
    padding: 2rem 0;
  }

  .header {
    margin: 40px 0 0 55px;
  }

  .header__menuitem__number {
    display: inline;
  }

  .header__line {
    display: inline;
  }

  .header__logo {
    flex: 0;
    margin-left: 0;
  }

  .header__menu {
    margin-left: -2rem;
    padding: 0 4rem 0 0;
  }
}
</style>
