import axios from "axios";
import { useRouter } from "vue-router";
import myMessage from "../utils/myMessage";
const router = useRouter();
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      window.localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 根据HTTP状态码判断错误类型
      switch (error.response.status) {
        case 401:
          myMessage.error("登陆已过期");
          toLogin();
          break;
        case 403:
          // 处理禁止访问错误
          break;
        case 404:
          // 处理资源不存在错误
          break;
        case 400:
          break;
        default:
          myMessage.error("网络异常");
          break;
      }
    } else if (error.request) {
      // 处理请求超时等错误
    } else {
      // 处理其他错误
    }
    return Promise.reject(error);
  }
);

function toLogin() {
  localStorage.removeItem("token");
  router.push("/login");
}
export function get(url: string, params = {}) {
  return instance.get(url, { params });
}

export function post(url: string, data = {}) {
  return instance.post(url, data);
}
