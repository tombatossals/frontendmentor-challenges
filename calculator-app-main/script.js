const app = Vue.createApp({
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

      console.log(t);
      if (isNaN(t.innerHTML)) {
        console.log(t, t.getBoundingClientRect());
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
      const op = ev.target.innerHTML;
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
  mounted() {},
});

app.mount("#app");
