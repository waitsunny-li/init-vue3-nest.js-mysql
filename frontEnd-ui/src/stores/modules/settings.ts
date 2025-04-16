import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const useSettingsStore = defineStore("settings", {
  state: () => ({
    title: "",
    isDark: isDark.value,
  }),
  actions: {
    // 设置网页标题
    setTitle(title: string) {
      this.title = title;
    },
  },
});

export default useSettingsStore;
