export enum apartmentStatuEmuns {
  DISABLE = 0,
  ENABLE = 1,
  MAINTAIN = 2,
  UNKNOWN = -1,
}

export const apartmentStatus = {
  [apartmentStatuEmuns.DISABLE]: "不可用",
  [apartmentStatuEmuns.ENABLE]: "正常",
  [apartmentStatuEmuns.MAINTAIN]: "维护中",
  [apartmentStatuEmuns.UNKNOWN]: "未知",
};
