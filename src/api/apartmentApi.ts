import { get, post } from "./index";

export default {
  add: (apartment: any) => {
    return post("/apartment/add", { apartment });
  },
  update: (apartmentId: string, apartment: any) => {
    return post("/apartment/update", { apartmentId, apartment });
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
