<template>
  <div>
    <Head>
      <Meta charset="UTF-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="static/assets/favicon-32x32.png"
      />

      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed&family=Bellefair&display=swap"
        rel="stylesheet"
      />

      <Title>Frontend Mentor | Space tourism website</Title>
    </Head>
    <div class="header">
      <div class="header__logo">
        <img alt="Logo" src="@/static/assets/shared/logo.svg" />
      </div>
      <ul class="header__menu navtext">
        <li><span class="number">00</span> Home</li>
        <li><span class="number">01</span> Destination</li>
        <li><span class="number">02</span> Crew</li>
        <li><span class="number">03</span> Technology</li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<style>
.header {
  margin: 40px 0 0 55px;
  color: var(--white);
  display: flex;
  justify-content: space-between;
}

.header__logo {
  flex: 1;
}

.header__menu {
  display: flex;
  list-style: none;
  flex: 1;
  justify-content: space-around;
  backdrop-filter: blur(48px);
  padding: 2rem;
}
</style>
