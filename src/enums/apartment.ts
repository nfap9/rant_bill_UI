export enum apartmentStatuEmuns {
  AVALIABLE = 0,
  UNAVAILABLE = 1,
  MAINTAIN = 2,
  UNKNOWN = -1,
}

export const apartmentStatus = {
  [apartmentStatuEmuns.AVALIABLE]: "可用",
  [apartmentStatuEmuns.UNAVAILABLE]: "不可用",
  [apartmentStatuEmuns.MAINTAIN]: "维护中",
  [apartmentStatuEmuns.UNKNOWN]: "未知",
};
