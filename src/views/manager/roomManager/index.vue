<template>
  <el-button class="form-button" @click="handleAddClick" type="primary"
    >新增</el-button
  >
  <roomTable></roomTable>
  <el-drawer ref="drawerRef" v-model="dialog" title="添加房屋" direction="rtl">
    <addRoom></addRoom>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import roomTable from "./roomTable.vue";
import addRoom from "./addRoom.vue";

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
