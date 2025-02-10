<template>
  <el-button class="form-button" @click="handleAddClick" type="primary"
    >新增</el-button
  >
  <showTable
    :table-config="tableConfig"
    :table-data="tableData"
    :pager="pager"
  ></showTable>
  <contractForm ref="formRef" @success="getContractList"></contractForm>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import showTable from "@/components/showTable.vue";
import contractApi from "@/api/contractApi";
import { apartmentStatuEmuns, apartmentStatus } from "@/enums/apartment";
import contractForm from "./contractForm.vue";
import { Pager } from "@/types/common";

const tableConfig = [
  { prop: "partyA", label: "甲方" },
  {
    prop: "partyB",
    label: "乙方",
  },
  { prop: "room", label: "房间" },
  {
    prop: "price",
    label: "租金",
  },
  {
    prop: "startTime",
    label: "起租日期",
  },
  {
    prop: "endTime",
    label: "到期日期",
  },
  {
    prop: "status",
    label: "当前状态",
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
const formRef = ref();

const pager = ref<Pager>({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});
function getContractList() {
  contractApi.list(pager.value).then((res: any) => {
    tableData.value = res.data;
  });
}

const handleAddClick = () => {
  formRef.value?.addMode();
};

function deleteRoom(row: any) {
  contractApi.delete(row._id).then((res: any) => {
    if (res) {
      getContractList();
    }
  });
}

function editRoom(row: any) {
  formRef.value?.editMode(row._id);
}

onMounted(() => {
  getContractList();
});
</script>

<style lang="less" scoped>
.form-button {
  margin-bottom: 24px;
}
</style>
