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
    {{ this.stack.length > 1 && this.stack[0] === 0 ? this.stack[1]: this.stack[0] }}
  </div>
  <div class="calculator__controlpad">
    <div @click="accumNumber" class="button 7">7</div>
    <div @click="accumNumber" class="button 8">8</div>
    <div @click="accumNumber" class="button 9">9</div>
    <div @click="del" class="button del">DEL</div>
    <div @click="accumNumber" class="button 4">4</div>
    <div @click="accumNumber" class="button 5">5</div>
    <div @click="accumNumber" class="button 6">6</div>
    <div @click="accumOperator" class="button plus">+</div>
    <div @click="accumNumber" class="button 1">1</div>
    <div @click="accumNumber" class="button 2">2</div>
    <div @click="accumNumber" class="button 3">3</div>
    <div @click="accumOperator" class="button minus">-</div>
    <div @click="accumNumber" class="button dot">.</div>
    <div @click="accumNumber" class="button 0">0</div>
    <div @click="accumOperator" class="button slash">/</div>
    <div @click="accumOperator" class="button x">x</div>
    <div @click="reset" class="button reset">RESET</div>
    <div @click="accumOperator" class="button equal">=</div>
  </div>
</div>
</main>
`,
  data() {
    return {
      theme: "main-theme",
      stack: [0],
      dot: false,
      operator: "",
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
      this.stack = [];
      this.dot = false;
    },
    del() {
      if (this.stack.length === 0) {
        return;
      }
      const n = this.stack[0].toString();
      this.stack[0] = Number(n.slice(0, -1));
    },
    accumNumber(ev) {
      const letter = ev.target.innerHTML;
      if (letter === ".") {
        this.dot = true;
        return;
      }

      const n = this.stack[this.stack.length - 1];
      if (this.dot) {
        this.stack[this.stack.length - 1] = Number(`${n}.${letter}`);
        this.dot = false;
        return;
      }
      this.stack[this.stack.length - 1] = Number(`${n}${letter}`);
      console.log(this.stack);
    },
    accumOperator(ev) {
      let op = ev.target.innerHTML;
      if (op === "x") {
        op = "*";
      }

      console.log(this.stack);

      if (this.stack.length === 1) {
        this.stack.push(op);
        return;
      } else if (this.stack.length === 2) {
        this.stack[1] = op;
        return;
      }

      if (this.stack.length < 3) {
        return;
      }
      this.stack = [
        0,
        Number(
          eval(`${this.stack[0]} ${this.stack[1]} ${this.stack[2]}`).toFixed(6)
        ),
      ];
      console.log(this.stack);
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
