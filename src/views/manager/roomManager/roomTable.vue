<template>
  <showTable :table-config="tableConfig" :table-data="tableData"></showTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import showTable from "@/components/showTable.vue";

const tableConfig = [
  { prop: "roomName", label: "房屋编号" },
  { prop: "apartment", label: "所属公寓" },
  { prop: "status", label: "当前状态" },
  { prop: "roomType", label: "房型" },
  { prop: "expcetedPrice", label: "预期价格" },
  { prop: "price", label: "实际价格" },
  { prop: "facility", label: "家具家电", type: "gather" },
  {
    prop: "tenant",
    label: "租户",
    type: "link",
    callback: (row) => toTenantDetail(row.tenant),
  },
];
const tableData = ref([
  {
    roomName: "301",
    apartment: "百福公寓",
    status: "自用",
    roomType: "两房一厅",
    expcetedPrice: "1000",
    price: "",
    facility: "空调;冰箱;洗衣机;床",
    tenant: "张三",
  },
]);

function toTenantDetail(id) {
  console.log("查看租户详情");
}
</script>

<style lang="less" scoped></style>
