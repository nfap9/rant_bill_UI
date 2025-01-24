<template>
  <showTable :table-config="tableConfig" :table-data="tableData"></showTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import showTable from "@/components/showTable.vue";

const tableConfig = [
  { prop: "contractor", label: "签约人" },
  { prop: "status", label: "当前状态" },
  { prop: "signingTime", label: "签约时间" },
  { prop: "contractMonths", label: "合同月数" },
  { prop: "residents", label: "住户", type: "gather" },
  { prop: "ContractId", label: "合同编号" },
];
const tableData = ref([
  {
    contractor: "张三",
    status: "合约中",
    signingTime: "2024/5/1",
    contractMonths: "12",
    residents: "张三;李四;",
    ContractId: "10086",
  },
]);
</script>

<style lang="less" scoped></style>
