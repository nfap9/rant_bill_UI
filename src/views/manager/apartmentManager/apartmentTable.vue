<template>
  <showTable
    :table-config="tableConfig"
    :table-data="tableData"
    :pager="pager"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></showTable>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import showTable from "@/components/showTable.vue";
import apartmentApi from "@/api/apartment";
import { Pager } from "@/types/common";
import { apartmentStatus, apartmentStatuEmuns } from "../../../enums/apartment";
const tableConfig = [
  { prop: "name", label: "公寓名称" },
  { prop: "address", label: "地址" },
  {
    prop: "status",
    label: "当前状态",
    mapping: (val: apartmentStatuEmuns = apartmentStatuEmuns.UNKNOWN) =>
      apartmentStatus[val],
  },
  {
    prop: "options",
    label: "操作",
    type: "options",
    fixed: "right",
    width: 150,
    buttons: [
      {
        text: "详情",
        callback: (row: any) => apartmentDetail(row),
      },
      {
        text: "编辑",
        callback: (row: any) => editApartment(row),
      },
      {
        text: "删除",
        callback: (row: any) => deleteApartment(row),
      },
    ],
  },
];
const pager = ref({
  disabled: true,
});
const tableData = ref([]);

function toTenantDetail(id: string) {
  console.log("查看租户详情", id);
}
function getApartmentList() {
  console.log(111);

  apartmentApi.list().then((res: any) => {
    tableData.value = res.data;
  });
}
function deleteApartment(row: any) {
  apartmentApi.delete(row._id).then((res: any) => {
    if (res) {
      getApartmentList({ pageIndex: 1, pageSize: 10 });
    }
  });
}
function editApartment(row: any) {
  console.log("编辑", row);
}
function apartmentDetail(row: any) {
  console.log("详情", row);
}
function refresh() {
  getApartmentList({ pageIndex: 1, pageSize: 10 });
}
onMounted(() => {
  refresh();
});
defineExpose({
  refresh,
});
</script>

<style lang="less" scoped></style>
