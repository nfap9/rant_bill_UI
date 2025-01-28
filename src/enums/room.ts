export enum roomStatuEmuns {
  RENTED = 0,
  UNRENTED = 1,
  MAINTAIN = 2,
  UNKNOWN = -1,
}

export const roomStatus = {
  [roomStatuEmuns.RENTED]: "已租",
  [roomStatuEmuns.UNRENTED]: "未租",
  [roomStatuEmuns.MAINTAIN]: "维护中",
  [roomStatuEmuns.UNKNOWN]: "未知",
};
