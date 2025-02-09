<template>
  <el-form :model="form">
    <el-form-item label="公寓名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="楼层">
      <el-input v-model="form.floors" />
    </el-form-item>
    <el-form-item label="是否有电梯">
      <el-input v-model="form.elevator" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleConfirm">确认</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import apartmentApi from "../../../api/apartment";

const form = ref({
  name: "",
  address: "",
  floors: 0,
  elevator: false,
});
const handleConfirm = () => {
  apartmentApi.add(form.value).then((res: any) => {
    console.log(res.apartment);
  });
};
</script>
