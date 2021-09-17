import { createApp, defineAsyncComponent } from "vue";
import App from "./views/main.vue";
import store from "./store";

const app = createApp(App);
app.use(store);
app.mixin({
  components: {
    CButton: defineAsyncComponent(() =>
      import("./components/atoms/button.vue")
    ),
    CInput: defineAsyncComponent(() => import("./components/atoms/input.vue")),
  },
});

app.mount("#app");

// debug
Object.assign(window, {
  _store: store,
});
