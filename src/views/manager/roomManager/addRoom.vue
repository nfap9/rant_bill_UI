<template>
  <el-form :model="form">
    <el-form-item label="房间号">
      <el-input v-model="form.roomNumber" />
    </el-form-item>
    <el-form-item label="所属公寓">
      <el-select v-model="form.apartment">
        <el-option v-for="item in apartments" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="楼层">
      <el-input type="number" min="1" v-model="form.floor" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleConfirm">确认</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import room from "../../../api/room";

import apartmentApi from "@/api/apartment";
const form = ref({
  roomNumber: "",
  apartment: "",
  floor: 1,
});
const apartments = ref([]);
const handleConfirm = () => {
  room.add(form.value).then((res: any) => {
    console.log(res.room);
  });
};
const getApartments = () => {
  apartmentApi.list().then((res: any) => {
    apartments.value = res.data;
  });
};
onMounted(() => {
  getApartments();
});
</script>
