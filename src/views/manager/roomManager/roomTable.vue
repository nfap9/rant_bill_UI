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
import roomApi from "@/api/room";
import { Pager } from "@/types/common";
import { roomStatus, roomStatuEmuns } from "../../../enums/room";
const tableConfig = [
  { prop: "roomNumber", label: "房屋编号" },
  { prop: "apartment", label: "所属公寓" },
  {
    prop: "status",
    label: "当前状态",
    mapping: (val: roomStatuEmuns = roomStatuEmuns.UNKNOWN) => roomStatus[val],
  },
  { prop: "facility", label: "家具家电", type: "gather" },
  {
    prop: "tenant",
    label: "租户",
    type: "link",
    callback: (row: any) => toTenantDetail(row.tenant),
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
        callback: (row: any) => roomDetail(row),
      },
      {
        text: "编辑",
        callback: (row: any) => editRoom(row),
      },
      {
        text: "删除",
        callback: (row: any) => deleteRoom(row),
      },
    ],
  },
];
const pager = ref<Pager>({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const tableData = ref([]);

function handleCurrentChange() {
  getRoomList(pager.value);
}
function handleSizeChange() {
  getRoomList(pager.value);
}

function toTenantDetail(id: string) {
  console.log("查看租户详情", id);
}
function getRoomList(pager: Pager) {
  roomApi.list(pager).then((res: any) => {
    tableData.value = res.data;
    pager.value = res.pager;
  });
}
function deleteRoom(row: any) {
  console.log("删除", row);
  roomApi.delete({ id: row.id });
}
function editRoom(row: any) {
  console.log("编辑", row);
}
function roomDetail(row: any) {
  console.log("详情", row);
}
onMounted(() => {
  getRoomList({ pageIndex: 1, pageSize: 10 });
});
</script>

<style lang="less" scoped></style>
