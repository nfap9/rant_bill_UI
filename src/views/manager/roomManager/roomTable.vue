<template>
  <el-button class="form-button" @click="handleAddClick" type="primary"
    >新增</el-button
  >
  <showTable
    :table-config="tableConfig"
    :table-data="tableData"
    :pager="pager"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></showTable>
  <addRoom ref="formRef" @success="getRoomList"></addRoom>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import showTable from "@/components/showTable.vue";
import roomApi from "@/api/roomApi";
import { Pager } from "@/types/common";
import { roomStatus, roomStatuEmuns } from "@/enums/room";
import addRoom from "./roomForm.vue";
const formRef = ref();
const tableConfig = [
  { prop: "roomNumber", label: "房屋编号" },
  { prop: "apartmentName", label: "所属公寓" },
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
const handleAddClick = () => {
  formRef.value?.addMode();
};
function deleteRoom(row: any) {
  roomApi.delete(row._id).then((res: any) => {
    if (res) {
      getRoomList({ pageIndex: 1, pageSize: 10 });
    }
  });
}
function editRoom(row: any) {
  formRef.value?.editMode(row._id);
}
function roomDetail(row: any) {
  formRef.value?.editMode(row._id);
}
onMounted(() => {
  getRoomList({ pageIndex: 1, pageSize: 10 });
});
</script>

<style lang="less" scoped>
.form-button {
  margin-bottom: 24px;
}
</style>
