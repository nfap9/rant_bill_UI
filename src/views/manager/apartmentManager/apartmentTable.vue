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
import roomApi from "@/api/apartment";
import { Pager } from "@/types/common";
import { apartmentStatuEmuns, apartmentStatus } from "../../../enums/apartment";
const tableConfig = [
  { prop: "name", label: "公寓名称" },
  {
    prop: "status",
    label: "当前状态",
    mapping: (val: apartmentStatuEmuns = apartmentStatuEmuns.UNKNOWN) =>
      apartmentStatus[val],
  },
  { prop: "address", label: "地址" },
  {
    prop: "floors",
    label: "楼层数",
  },
  {
    prop: "elevator",
    label: "是否有电梯",
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
const pager = ref({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const tableData = ref([]);

function handleCurrentChange(pageIndex: number) {
  getRoomList({ pageIndex, pageSize: pager.value.pageSize });
}
function handleSizeChange(pageSize: number) {
  getRoomList({ pageSize, pageIndex: pager.value.pageIndex });
}

function toTenantDetail(id: string) {
  console.log("查看租户详情", id);
}
function getRoomList(_pager: Pager) {
  roomApi.list(_pager).then((res: any) => {
    tableData.value = res.data;
    pager.value = res.pager;
  });
}
function deleteRoom(row: any) {
  roomApi.delete(row._id).then((res: any) => {
    if (res) {
      getRoomList({ pageIndex: 1, pageSize: 10 });
    }
  });
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
