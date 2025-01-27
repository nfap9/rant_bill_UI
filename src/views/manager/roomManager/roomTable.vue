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
  {
    prop: "options",
    label: "操作",
    type: "options",
    buttons: [
      {
        text: "详情",
        callback: (row) => showDetail(row),
      },
      {
        text: "删除",
        callback: (row) => deleteRoom(row),
      },
    ],
  },
];
const pager = ref<Pager>({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

function handleCurrentChange() {
  getRoomList();
}
function handleSizeChange() {
  getRoomList();
}
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
function getRoomList(pager: Pager) {
  roomApi.list(pager).then((res) => {
    tableData.value = res.data;
    pager.value = ref.pager;
  });
}
function deleteRoom(row) {
  console.log("删除", row);
}
function showDetail(row) {
  console.log("详情", row);
}
onMounted(() => {
  getRoomList({ pageIndex: 1, pageSize: 10 });
});
</script>

<style lang="less" scoped></style>
