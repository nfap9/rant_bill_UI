<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="房屋列表" name="house"><houseTable /></el-tab-pane>
    <el-tab-pane label="租户列表" name="tenant"><tenantTable /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from "vue";
import houseTable from "@/views/manager/houseManager/houseTable.vue";
import tenantTable from "@/views/manager/tenantManager/tenantTable.vue";
const activeName = ref("house");
</script>
