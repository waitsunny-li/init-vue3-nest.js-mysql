<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar-container">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="getMenuBackground"
        :text-color="getMenuTextColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
        :class="sideTheme"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/assets/styles/variables.module.scss";
import useAppStore from "@/stores/modules/app";

const route = useRoute();
const appStore = useAppStore();

const sidebarRouters = ref([
  {
    path: "/index",
    meta: {
      title: "首页",
      icon: "user",
    },
  },
  {
    path: "/document",
    meta: {
      title: "文档管理",
      icon: "document",
    },
    alwaysShow: true,
    children: [
      {
        path: "document-list",
        meta: {
          title: "文档列表",
          icon: "documentList",
        },
      },
    ],
  },
]);
const showLogo = ref(true);
const sideTheme = ref("theme-dark");
const theme = ref("#409EFF");
const isCollapse = computed(() => !appStore.sidebar.opened);

// 获取菜单背景色
const getMenuBackground = computed(() => {
  // if (false) {
  //   return "var(--sidebar-bg)";
  // }
  return sideTheme.value === "theme-dark" ? variables.menuBg : variables.menuLightBg;
});

// 获取菜单文字颜色
const getMenuTextColor = computed(() => {
  // if (settingsStore.isDark) {
  //   return "var(--sidebar-text)";
  // }
  return sideTheme.value === "theme-dark" ? variables.menuText : variables.menuLightText;
});

const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style lang="scss" scoped>
.sidebar-container {
  background-color: v-bind(getMenuBackground);

  .scrollbar-wrapper {
    background-color: v-bind(getMenuBackground);
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;

    .el-menu-item,
    .el-sub-menu__title {
      &:hover {
        background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
      }
    }

    .el-menu-item {
      color: v-bind(getMenuTextColor);

      &.is-active {
        color: var(--menu-active-text, #409eff);
        background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
      }
    }

    .el-sub-menu__title {
      color: v-bind(getMenuTextColor);
    }
  }
}
</style>
