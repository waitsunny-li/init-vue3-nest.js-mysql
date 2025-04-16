/// <reference types="vite/client" />
declare module "jsencrypt/bin/jsencrypt.min";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "nprogress";
