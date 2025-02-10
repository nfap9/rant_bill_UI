import type { Pager } from "../types/common";
import { get, post } from "./index";

export default {
  add: (contractData: any) => {
    return post("/contract/add", { contract: contractData });
  },
  update: (username: string, password: string) => {
    return post("/contract/login", { username, password });
  },
  detail: (id: string) => {
    return get(`/contract/detail/${id}`);
  },
  list: (pager: Pager) => {
    return post("/contract/list", { pager });
  },
  delete: (id: string) => {
    return post(`/contract/delete/${id}`);
  },
};
