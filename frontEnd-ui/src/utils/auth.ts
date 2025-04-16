import Cookies from "js-cookie";
import { isHttp, isPathMatch } from "@/utils/validate";
import useSettingsStore from "@/stores/modules/settings.ts";
import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from "vue-router";

const TokenKey = "Token";

const whiteList = ["/login", "/register"];

const isWhiteList = (path: string) => {
  return whiteList.some((pattern) => isPathMatch(pattern, path));
};

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function permissionRouter(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext
) {
  // TODO: 权限判断
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title as string);
    if (to.path === "/login") {
      next({ path: "/" });
    } else if (isWhiteList(to.path)) {
      next();
    } else {
      next();
    }
  } else {
    // 没有token
    if (isWhiteList(to.path)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
    }
  }
}
