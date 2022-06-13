const app = Vue.createApp({
  template: `
  <main id="app"
  :class="[theme]"
  >
  <div
  class="calculator"
>
  <div class="calculator__header">
    <div class="header__logo">calc</div>
    <div class="header__theme-selector">
      <div></div>
      <div @click="switchTheme" class="theme-selector__number">1</div>
      <div @click="switchTheme" class="theme-selector__number">2</div>
      <div @click="switchTheme" class="theme-selector__number">3</div>
      <div class="theme-selector__text">theme</div>
      <div @click="switchTheme" class="theme-selector__switch">
        <div
          class="theme-selector__circle"
          :class="[theme]"
        ></div>
      </div>
    </div>
  </div>
  <div class="calculator__screen">
    {{ actual === "0" ? stack : actual }}
  </div>
  <div class="calculator__controlpad">
    <div @click="stackNumber" class="button 7">7</div>
    <div @click="stackNumber" class="button 8">8</div>
    <div @click="stackNumber" class="button 9">9</div>
    <div @click="del" class="button del">DEL</div>
    <div @click="stackNumber" class="button 4">4</div>
    <div @click="stackNumber" class="button 5">5</div>
    <div @click="stackNumber" class="button 6">6</div>
    <div @click="stackOperator" class="button plus">+</div>
    <div @click="stackNumber" class="button 1">1</div>
    <div @click="stackNumber" class="button 2">2</div>
    <div @click="stackNumber" class="button 3">3</div>
    <div @click="stackOperator" class="button minus">-</div>
    <div @click="stackNumber" class="button dot">.</div>
    <div @click="stackNumber" class="button 0">0</div>
    <div @click="stackOperator" class="button slash">/</div>
    <div @click="stackOperator" class="button x">x</div>
    <div @click="reset" class="button reset">RESET</div>
    <div @click="stackOperator" class="button equal">=</div>
  </div>
</div>
</main>
`,
  data() {
    return {
      theme: "main-theme",
      actual: "0",
      operator: null,
      stack: "0",
    };
  },
  methods: {
    switchTheme(ev) {
      const themes = { 1: "main-theme", 2: "light-theme", 3: "dark-theme" };
      const t = ev.target;

      if (isNaN(t.innerHTML)) {
        const rect = t.getBoundingClientRect();
        const width = rect.width;
        const pos = ev.clientX - rect.left;

        if (pos < width / 3) {
          this.theme = "main-theme";
        } else if (pos > (width / 3) * 2) {
          this.theme = "dark-theme";
        } else {
          this.theme = "light-theme";
        }
        localStorage.theme = this.theme;
        console.log(this.theme);
        return;
      }
      this.theme = themes[parseInt(t.innerHTML)];
    },
    reset() {
      console.log(this.actual, this.result, this.operator);
      this.actual = "0";
      this.result = "0";
      this.operator = null;
    },
    del() {
      this.actual = this.actual.slice(0, -1);
      if (this.actual === "") {
        this.actual = "0";
      }
    },
    stackNumber(ev) {
      const n = ev.target.innerHTML;
      if (n === ".") {
        this.actual = `${this.actual}${n}`;
        return;
      }
      this.actual = Number(`${this.actual}${n}`).toString();
    },
    stackOperator(ev) {
      let op = ev.target.innerHTML;
      if (op === "x") {
        op = "*";
      } else if (op === "=") {
        op = this.operator;
      } else if (!this.operator) {
        this.operator = op;
        this.stack = this.actual;
        this.actual = "0";
        return;
      }

      console.log(`${this.actual} ${this.operator} ${this.stack}`);

      if (this.operator) {
        this.stack = eval(
          `${this.stack} ${this.operator} ${this.actual}`
        ).toFixed(8);
      }
      this.actual = "0";
      this.operator = op;
    },
  },
  mounted() {
    if (localStorage.theme) {
      this.theme = localStorage.theme;
      return;
    }
    const lightMode = window.matchMedia("prefers-color-scheme: light");
    if (false && lightMode) {
      this.theme = "light-theme";
      return;
    }

    this.theme = "main-theme";
  },
});

app.mount("#app");
