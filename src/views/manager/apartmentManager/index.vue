<template>
  <el-button class="form-button" @click="handleAddClick" type="primary"
    >新增</el-button
  >
  <apartmentTable ref="tableRef"></apartmentTable>
  <el-drawer ref="drawerRef" v-model="dialog" title="新增公寓" direction="rtl">
    <addApartment @success="onAddSuccess"></addApartment>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apartmentTable from "./apartmentTable.vue";
import addApartment from "./addApartment.vue";

const dialog = ref(false);
const tableRef = ref();
const handleAddClick = () => {
  dialog.value = true;
};
const onAddSuccess = () => {
  dialog.value = false;
  tableRef.value?.refresh();
};
</script>
<style lang="less" scoped>
.form-button {
  margin-bottom: 24px;
}
</style>
