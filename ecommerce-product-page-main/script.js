const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      price: 125.0,
      discount: 50,
      originalPrice: 250.0,
      title: "Fall Limited Edition Sneakers",
      actualPhoto: undefined,
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
        this.showCart = true;
      }
    },
  },
  async mounted() {
    this.actualPhoto = this.photos[0];
    this.showCart = true;
    this.counter = 1;
  },
});

app.mount("#app");
