import { login } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    id: "",
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo: any) {
      const tel = userInfo.tel.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(tel, password)
          .then((res) => {
            setToken(res.data.accessToken);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {});
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {});
    },
  },
});

export default useUserStore;
