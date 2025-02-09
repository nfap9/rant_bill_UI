import type { Pager } from "../types/common";
import { get, post } from "./index";

export default {
  add: (apartmentData: any) => {
    return post("/apartment/add", { room: apartmentData });
  },
  update: (apartmentId: string, apartmentData: any) => {
    return post("/apartment/login", { apartmentId, apartmentData });
  },
  detail: (id: string) => {
    return get(`/apartment/detail/${id}`);
  },
  list: (pager: Pager) => {
    return post("/apartment/list", { pager });
  },
  delete: (id: string) => {
    return post(`/apartment/delete/${id}`);
  },
};
