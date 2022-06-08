<template>
  <div>

    <Head>
      <Meta charset="UTF-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Link rel="icon" type="image/png" sizes="32x32" href="/static/assets/favicon-32x32.png" />

      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Bellefair&display=swap"
        rel="stylesheet" />

      <Title>Frontend Mentor | Space tourism website</Title>
    </Head>

    <div class="layout">
      <div class="header">
        <div class="header__logo">
          <img alt="Logo" src="@/static/assets/shared/logo.svg" />
        </div>
        <div class="header__line"></div>
        <div class="header__menu__burguer">
          <div class="menu__burguer__icon"></div>
          <div class="menu__burguer__icon"></div>
          <div class="menu__burguer__icon"></div>
        </div>
        <div class="header__menu__small">
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
      </div>
      <slot />
    </div>
  </div>
</template>

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

.header__menu__small {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 70%;
  min-height: 100vh;
  backdrop-filter: blur(8px);
  z-index: 100;
  background: red;
  display: flex;
  flex-direction: column;
}

.header__menuitem__small {}

.header__line {
  height: 1px;
  width: 100%;
  flex: 1;
  margin-left: 8rem;
  background-color: rgba(255, 255, 255, 0.25);
  z-index: 10;
  display: none;
}

.router-link-active {
  border-bottom: 4px solid var(--white) !important;
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

.header__menu__burguer {
  justify-self: flex-end;
  cursor: pointer;
}

.menu__burguer__icon {
  width: 1.5rem;
  height: 0.2rem;
  background-color: var(--light-blue);
  margin: 6px 0;
  transition: 0.4s;
  display: none;
}

@media only screen and (max-width: 450px) {
  .header__menu {
    display: none;
  }

  .menu__burguer__icon {
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
