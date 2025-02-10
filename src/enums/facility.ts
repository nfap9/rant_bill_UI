export enum FacilityType {
  bed = "bed",
  refrigerator = "refrigerator",
  washing = "washing",
  desk = "desk",
  coffeeTable = "coffeeTable",
  sofa = "sofa",
}

export const facilityOptions = [
  { label: "空调", value: FacilityType.refrigerator },
  { label: "洗衣机", value: FacilityType.washing },
  { label: "床", value: FacilityType.bed },
  { label: "书桌", value: FacilityType.desk },
  { label: "茶几", value: FacilityType.coffeeTable },
  { label: "沙发", value: FacilityType.sofa },
];
