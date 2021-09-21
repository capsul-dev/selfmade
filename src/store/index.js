import { createStore, createLogger } from "vuex";

import layout from "./modules/layout";
import business from "./modules/business";
import modal from "./modules/modal";

export default createStore({
  modules: {
    layout,
    business,
    modal,
  },
  plugins: [
    ...(process.env.NODE_ENV === "development" ? [createLogger()] : []),
  ],
  strict: process.env.NODE_ENV === "production",
});
