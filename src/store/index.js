import { createStore, createLogger } from "vuex";

import layout from "./modules/layout";
import business from "./modules/business";
import overlay from "./modules/overlay";

export default createStore({
  modules: {
    layout,
    business,
    overlay,
  },
  plugins: [
    ...(process.env.NODE_ENV === "development" ? [createLogger()] : []),
  ],
  strict: process.env.NODE_ENV === "production",
});
