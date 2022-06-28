const app = Vue.createApp({
  data() {
    return {
      counter: 1,
      modal: false,
      price: 125.0,
      numberOnCart: 0,
      discount: 50,
      originalPrice: 250.0,
      title: "Fall Limited Edition Sneakers",
      actualPhoto: undefined,
      actualModalPhoto: undefined,
      showCart: false,
      photos: [
        {
          thumb: "images/image-product-1-thumbnail.jpg",
          image: "images/image-product-1.jpg",
        },
        {
          thumb: "images/image-product-2-thumbnail.jpg",
          image: "images/image-product-2.jpg",
        },
        {
          thumb: "images/image-product-3-thumbnail.jpg",
          image: "images/image-product-3.jpg",
        },
        {
          thumb: "images/image-product-4-thumbnail.jpg",
          image: "images/image-product-4.jpg",
        },
      ],
    };
  },
  methods: {
    addToCart() {
      if (this.counter > 0) {
        this.numberOnCart = this.numberOnCart + this.counter;
        this.counter = 1;
        this.showCart = true;
      }
    },
    hideModal(ev) {
      if (["photo"].indexOf(ev.target.id)) {
        this.modal = false;
      }
    },
    showModal(photo) {
      this.actualModalPhoto = photo;
      this.modal = true;
    },
    hideCart(ev) {
      const validElements = [
        "addToCart",
        "cartIcon",
        "deleteIcon",
        "plusIcon",
        "minusIcon",
      ];
      if (
        validElements.indexOf(ev.target.id) === -1 &&
        validElements.indexOf(ev.target.parentElement.id) === -1
      ) {
        this.showCart = false;
      }
    },
  },
  async mounted() {
    this.actualPhoto = this.photos[0];
    this.actualModalPhoto = this.photos[0];
  },
});

app.directive("click-outside", {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

app.mount("#app");
