const app = Vue.createApp({
  template: `
<div class="advice" v-if="slip">
    <h1 class="advice__title">Advice #{{ slip.id }}</h1>
    <div class="advice__content">"{{slip.advice}}"</div>
    <div class="advice__quote">
        <div class="quote__line"></div>
        <div class="quote__quote quote1"></div>
        <div class="quote__quote quote2"></div>
        <div class="quote__line"></div>
    </div>
    <div class="advice__dice" v-on:click="fetchAdvice">
        <img class=" advice__image__dice" alt="dice" src="images/icon-dice.svg" />
    </div>
</div>`,
  data() {
    return {
      slip: {},
    };
  },
  methods: {
    async fetchAdvice() {
      const req = await fetch(
        "https://api.adviceslip.com/advice?id=" + Date.now()
      );
      const { slip } = await req.json();
      this.slip = slip;
    },
  },
  mounted() {
    this.fetchAdvice();
  },
});

app.mount("#app");
