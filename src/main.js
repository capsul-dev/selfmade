import { createApp, defineAsyncComponent } from "vue";

import App from "./views/CMain/CMain.vue";
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
    CInput: defineAsyncComponent(() => import("./components/atoms/CInput/CInput.vue")),
  },
});

app.mount("#app");
