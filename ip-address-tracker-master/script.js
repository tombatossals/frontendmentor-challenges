const valid_ip = (value) => {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    value
  );
};

const valid_domain = (value) => {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
    value
  );
};
const app = Vue.createApp({
  data() {
    return {
      map: undefined,
      icon: undefined,
      layerGroup: undefined,
      type: "ip",
      search: "",
      info: {},
    };
  },
  methods: {
    executeSearch() {
      if (isNaN(this.search.slice(0, 1))) {
        if (!valid_domain(this.search.trim())) {
          alert("Invalid domain");
          return;
        }
        this.type = "domain";
      } else {
        if (!valid_ip(this.search.trim())) {
          alert("Invalid IP");
          return;
        }
        this.type = "ip";
      }
      this.updateData();
    },
    async updateData() {
      this.info = {};
      this.layerGroup.clearLayers();
      const filter =
        this.type === "ip"
          ? `ipAddress=${this.search.trim()}`
          : `domain=${this.search.trim()}`;

      const data = await (
        await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_w8zWVBSHpnUJ8f4rZM9KT9eq5N0S2&${filter}`,
          {
            mode: "cors",
          }
        )
      ).json();

      this.info = {
        ip: data.ip,
        location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
        timezone: `UTC ${data.location.timezone}`,
        isp: data.isp,
      };

      const location = [data.location.lat, data.location.lng];
      this.map.setView(location, 13);
      L.marker(location, { icon: this.icon }).addTo(this.layerGroup);
    },
  },
  async mounted() {
    this.icon = L.icon({
      iconUrl: "images/icon-location.svg",
    });
    this.map = L.map("map", { zoomControl: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.updateData();
  },
});

app.component("spinner", {
  template:
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
});

app.directive("debounce", (el, binding) => debounce(el, binding));
app.mount("#app");
