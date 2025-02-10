<template>
  <el-form-item
    v-if="item.type === FormItemType.roomSelect"
    :label="item.label"
    :prop="item.prop"
  >
    <el-select v-model="apartmentId" @change="handleApartmentChange">
      <el-option
        v-for="apartment in apartments"
        :label="apartment.label"
        :value="apartment.value"
      ></el-option>
    </el-select>

    <el-select v-model="data[item.prop]">
      <el-option
        v-for="room in rooms"
        :label="room.label"
        :value="room.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
<script setup lang="ts">
import apartmentApi from "@/api/apartmentApi";
import roomApi from "@/api/roomApi";
import { formItem, FormItemType } from "@/components/myForm/contract";
import { onMounted, ref } from "vue";
interface Props {
  item: formItem;
  data: any;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({} as formItem),
  data: () => ({}),
});

const apartments = ref([]);
const rooms = ref([]);
const apartmentId = ref("");
const getApartments = () => {
  apartmentApi.list().then((res: any) => {
    apartments.value = res.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  });
};
function getRoomList() {
  roomApi.list(null, { apartmentId: apartmentId.value }).then((res) => {
    rooms.value = res.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  });
}
const handleApartmentChange = () => {
  getRoomList();
};
onMounted(() => {
  getApartments();
});
</script>
