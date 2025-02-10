<template>
  <el-form :model="form">
    <el-form-item label="公寓名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleConfirm">确认</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import apartmentApi from "@/api/apartmentApi";
const emits = defineEmits(["success"]);
const form = ref({
  name: "",
  address: "",
});
const handleConfirm = () => {
  apartmentApi.add(form.value).then((res: any) => {
    emits("success");
  });
};
</script>
