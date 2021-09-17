import { createStore } from "vuex";
import layout from "./modules/layout";
import business from "./modules/business";

export default createStore({
  modules: {
    layout,
    business,
  },
});
