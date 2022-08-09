import { createStore, createLogger } from "vuex";

import modals from "./modules/modals";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    modals
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
