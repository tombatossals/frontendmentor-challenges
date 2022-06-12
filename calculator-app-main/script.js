const app = Vue.createApp({
  template: `
  <div
  class="calculator"
  :class="{'main-theme': theme === 1, 'secondary-theme': theme === 2, 'third-theme': theme === 3}"
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
          :class="{left: theme === 1, center: theme === 2, right: theme === 3}"
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
    <div @click="equal" class="button equal">=</div>
  </div>
</div>
`,
  data() {
    return {
      theme: 1,
      actual: "0",
      operator: null,
      stack: "0",
    };
  },
  methods: {
    switchTheme(ev) {
      const t = ev.target;

      if (isNaN(t.innerHTML)) {
        const rect = t.getBoundingClientRect();
        const width = rect.width;
        const pos = ev.clientX - rect.left;

        if (pos < width / 3) {
          this.theme = 1;
        } else if (pos > (width / 3) * 2) {
          this.theme = 3;
        } else {
          this.theme = 2;
        }
        localStorage.theme = this.theme;
        return;
      }
      this.theme = parseInt(t.innerHTML);
    },
    reset() {
      this.actual = "0";
      this.result = "0";
    },
    del() {
      this.actual = this.actual.substr(1, this.actual.length - 1);
      if (this.actual === "") {
        this.actual = "0";
      }
    },
    stackNumber(ev) {
      const n = ev.target.innerHTML;
      if (`${this.actual}${n}`.length > 8) {
        return;
      }
      if (this.actual === "0") {
        this.actual = `${n}`;
        return;
      }
      this.actual = `${this.actual}${n}`;
    },
    equal() {
      if (!this.operator) {
        return;
      }
      this.stack = eval(`${this.actual} ${this.operator} ${this.stack}`);
      this.actual = "0";
      this.operator = null;
    },
    stackOperator(ev) {
      let op = ev.target.innerHTML;
      if (op === "x") {
        op = "*";
      }
      if (!this.operator) {
        this.operator = op;
        this.stack = this.actual;
        this.actual = "0";
        return;
      }
      this.stack = eval(`${this.actual} ${this.operator} ${this.stack}`);
      this.actual = "0";
      this.operator = op;
    },
  },
  mounted() {
    if (localStorage.theme) {
      this.theme = parseInt(localStorage.theme);
    }
  },
});

app.mount("#app");
