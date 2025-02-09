<template>
  <el-button class="form-button" @click="handleAddClick" type="primary"
    >新增</el-button
  >
  <apartmentTable></apartmentTable>
  <el-drawer ref="drawerRef" v-model="dialog" title="添加公寓" direction="rtl">
    <addApartment></addApartment>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apartmentTable from "./apartmentTable.vue";
import addApartment from "./addApartment.vue";

const dialog = ref(false);
const handleAddClick = () => {
  dialog.value = true;
};
</script>
<style lang="less" scoped>
.form-button {
  margin-bottom: 24px;
}
</style>
