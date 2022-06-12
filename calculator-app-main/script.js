const app = Vue.createApp({
  data() {
    return {
      theme: {},
      actual: 0,
      decimal: false,
      operator: null,
      stack: 0,
    };
  },
  methods: {
    reset() {
      this.actual = 0;
      this.result = 0;
    },
    del() {
      this.actual = parseInt(this.actual / 10);
    },
    showActual() {
      if (this.decimal && Number.isInteger(this.actual)) {
        return `${this.actual}.`;
      }
      return this.actual;
    },
    stackNumber(ev) {
      const n = ev.target.innerHTML;
      if (isNaN(this.actual)) {
        this.actual = 0;
      }
      if (
        parseInt(this.actual.toString().replace(".", "")) * 10 + parseInt(n) >
        Math.pow(10, 8)
      ) {
        return;
      }
      if (this.decimal && Number.isInteger(this.actual)) {
        this.actual = parseInt(`${this.actual.toString()}.${n}`);
      } else {
        this.actual = parseInt(`${this.actual.toString()}${n}`);
      }
    },
    equal() {
      if (!this.operator) {
        return;
      }
      this.stack = eval(`${this.actual} ${this.operator} ${this.stack}`);
      this.actual = 0;
      this.operator = null;
    },
    dot() {
      this.decimal = true;
    },
    stackOperator(ev) {
      const op = ev.target.innerHTML;
      if (isNaN(this.actual)) {
        return;
      }
      if (!this.operator) {
        this.operator = op;
        this.stack = this.actual;
        this.actual = 0;
        return;
      }
      this.stack = eval(`${this.actual} ${this.operator} ${this.stack}`);
      this.actual = 0;
      this.operator = op;
    },
  },
  mounted() {},
});

app.mount("#app");
