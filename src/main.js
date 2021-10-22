import { createApp, defineAsyncComponent } from "vue";

import App from "./components/views/CMain/CMain.vue";
import store from "./store";
import "./assets/tailwind.css";

// debug
Object.assign(window, {
  _store: store,
});

const app = createApp(App);
app.use(store);

app.mixin({
  components: {
    CButton: defineAsyncComponent(() =>
      import("./components/atoms/CButton/CButton.vue")
    ),
    CInput: defineAsyncComponent(() =>
      import("./components/atoms/CInput/CInput.vue")
    ),
  },
});

app.mount("#app");

// precaches images
import { sections } from "../api-assets/sections.json";
const precacheImage = async (source) => {
  const img = new Image();
  img.src = source;
  console.log(`${source} precached`);
};

sections.forEach((section) => {
  section.styles.forEach((style) => precacheImage(style.image));
});
