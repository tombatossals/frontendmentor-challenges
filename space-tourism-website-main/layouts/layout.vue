<template>
  <div>
    <Head>
      <Meta charset="UTF-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/assets/favicon-32x32.png"
      />

      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Bellefair&display=swap"
        rel="stylesheet"
      />

      <Title>Frontend Mentor | Space tourism website</Title>
    </Head>

    <div class="layout__main">
      <div class="header">
        <div class="header__logo">
          <img alt="Logo" src="@/static/assets/shared/logo.svg" />
        </div>
        <div class="header__line"></div>
        <div class="header__menu navtext">
          <div class="header__menu__background"></div>
          <NuxtLink class="header__menuitem" to="/"
            ><span class="header__menuitem__number">00</span> Home</NuxtLink
          >
          <NuxtLink
            class="header__menuitem"
            to="/destination/moon"
            :class="
              $route.path.search('destination') !== -1 && 'router-link-active'
            "
            ><span class="header__menuitem__number">01</span>
            Destination</NuxtLink
          >
          <NuxtLink class="header__menuitem" to="/crew/moon"
            ><span class="header__menuitem__number">02</span> Crew</NuxtLink
          >
          <NuxtLink class="header__menuitem" to="/technology/moon"
            ><span class="header__menuitem__number">03</span>
            Technology</NuxtLink
          >
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout__main {
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: space-between;
}

.header {
  margin: 40px 0 0 55px;
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
}

.header__line {
  height: 1px;
  width: 100%;
  flex: 1;
  margin-left: 8rem;
  background-color: rgba(255, 255, 255, 0.25);
  z-index: 10;
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
  margin-left: -2rem;
  padding: 0 4rem 0 0;
  backdrop-filter: blur(8px);
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
  padding: 2rem 0;
  border-bottom: 4px solid transparent;
  z-index: 10;
}

.header__menuitem:hover {
  border-bottom: 4px solid rgba(255, 255, 255, 0.25);
}

.header__menuitem__number {
  font-weight: bold;
}
</style>
