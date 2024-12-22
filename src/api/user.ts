import { get, post } from "./index";

export default {
  register: (email: string, password: string, username: string) => {
    return post("/api/users", {
      user: { username, email, password },
    });
  },
  login: (email: string, password: string) => {
    return post("/api/users/login", { user: { email, password } });
  },
  user: () => {
    return get("/api/user");
  },
};
