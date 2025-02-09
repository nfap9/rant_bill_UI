import type { Pager } from "../types/common";
import { get, post } from "./index";

export default {
  add: (roomData: any) => {
    return post("/room/add", { room: roomData });
  },
  update: (roomId: string, room: any) => {
    return post("/room/update", { roomId, room });
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
