import type { Pager } from "../types/common";
import { get, post } from "./index";

export default {
  add: (roomData: any) => {
    return post("/room/add", { room: roomData });
  },
  update: (username: string, password: string) => {
    return post("/room/login", { username, password });
  },
  detail: (id: string) => {
    return get(`/room/detail/${id}`);
  },
  list: (pager: Pager) => {
    return post("/room/list", { pager });
  },
  delete: (id: string) => {
    return post(`/room/delete/${id}`);
  },
};
