import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

import createAutoImport from "./auto-import"; // 自动导入
import createSvgIcon from "./svg-icon"; // svg图标
import { PluginOption, Plugin } from "vite";

export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild: boolean = false
) {
  console.log("viteEnv", viteEnv);
  const vitePlugins: Plugin[] | PluginOption[] = [vue(), tailwindcss(), vueJsx(), vueDevTools()];
  vitePlugins.push(createAutoImport() as PluginOption[]);
  vitePlugins.push(createSvgIcon(isBuild));
  return vitePlugins;
}
