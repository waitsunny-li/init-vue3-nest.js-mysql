import * as components from "@element-plus/icons-vue";
import type { App } from "vue";

export default {
  install: (app: App) => {
    for (const [key, component] of Object.entries(components)) {
      app.component(key, component);
    }
  },
};
