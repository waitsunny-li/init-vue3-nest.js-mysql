import request from "@/utils/request";

// 登录
export function login(tel: string, password: string) {
  let data = {
    tel,
    password,
  };
  return request({
    url: "/user/login",
    method: "post",
    headers: {
      isToken: false,
    },
    data,
  });
}
