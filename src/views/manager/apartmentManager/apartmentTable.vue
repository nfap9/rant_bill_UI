<template>
  <el-button class="form-button" @click="handleAddClick" type="primary"
    >新增</el-button
  >
  <showTable
    :table-config="tableConfig"
    :table-data="tableData"
    :showPager="false"
  ></showTable>
  <addOrEditApartment
    ref="editRef"
    @success="getApartmentList"
  ></addOrEditApartment>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import showTable from "@/components/showTable.vue";
import apartmentApi from "@/api/apartment";
import { apartmentStatuEmuns, apartmentStatus } from "@/enums/apartment";
import addOrEditApartment from "./addOrEditApartment.vue";

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
    mapping: (val) => (val ? "是" : "否"),
  },
  {
    prop: "options",
    label: "操作",
    type: "options",
    fixed: "right",
    width: 120,
    buttons: [
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
const tableData = ref([]);
const editRef = ref();

function getApartmentList() {
  apartmentApi.list().then((res: any) => {
    tableData.value = res.data;
  });
}

const handleAddClick = () => {
  editRef.value?.addMode();
};

function deleteRoom(row: any) {
  apartmentApi.delete(row._id).then((res: any) => {
    if (res) {
      getApartmentList();
    }
  });
}

function editRoom(row: any) {
  editRef.value?.editMode(row._id);
}

onMounted(() => {
  getApartmentList();
});
</script>

<style lang="less" scoped>
.form-button {
  margin-bottom: 24px;
}
</style>
