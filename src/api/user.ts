import { get, post } from "./index";

export default {
  register: (username: string, password: string) => {
    return post("/users/register", { username, password });
  },
  login: (username: string, password: string) => {
    return post("/users/login", { username, password });
  },
  user: () => {
    return get("/user");
  },
};
