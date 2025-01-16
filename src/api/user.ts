import { get, post } from "./index";

export default {
  register: (username: string, password: string) => {
    return post("/api/users/register", {
      user: { username, password },
    });
  },
  login: (username: string, password: string) => {
    return post("/api/users/login", { user: { username, password } });
  },
  user: () => {
    return get("/api/user");
  },
};
