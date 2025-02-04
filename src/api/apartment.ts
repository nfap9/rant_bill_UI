import { get, post } from "./index";

export default {
  add: (apartmentData: any) => {
    return post("/apartment/add", { apartment: apartmentData });
  },
  update: (username: string, password: string) => {
    return post("/apartment/login", { username, password });
  },
  detail: (id: string) => {
    return get(`/apartment/detail/${id}`);
  },
  list: () => {
    return get("/apartment/list");
  },
  delete: (id: string) => {
    return post(`/apartment/delete/${id}`);
  },
};
