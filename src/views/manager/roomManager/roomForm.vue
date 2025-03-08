<template>
  <el-drawer
    v-model="dialog"
    :title="mode === 'add' ? '新增房间' : '更新房间信息'"
    direction="rtl"
  >
    <myForm
      v-loading="loading"
      :formItems="formItems"
      :formData="formData"
      :options="options"
      :rules="rules"
      @submit="addRoom"
    >
    </myForm>
  </el-drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import roomApi from "@/api/roomApi";
import myMessage from "@/utils/myMessage";
import myForm from "@/components/myForm/index.vue";
import { formItem, FormItemType } from "@/components/myForm/contract";
import apartmentApi from "@/api/apartmentApi";
import { facilityOptions } from "@/enums/facility";
type Option = {
  label: string;
  value: string;
};
type RoomForm = {
  roomNumber: string;
  apartment: Option;
  floor: number;
  area: number;
  expcetedPrice: number;
  facility: string[];
};

const emits = defineEmits(["success"]);

const dialog = ref<boolean>(false);
const mode = ref("add");
const loading = ref<boolean>(false);
const formItems = ref<formItem[]>([
  {
    label: "房间号",
    prop: "roomNumber",
    type: FormItemType.input,
  },
  {
    label: "所属公寓",
    prop: "apartment",
    type: FormItemType.select,
    selectObj: true,
  },
  {
    label: "楼层",
    prop: "floor",
    type: FormItemType.input,
    inputType: "number",
  },
  {
    label: "面积",
    prop: "area",
    type: FormItemType.input,
    inputType: "number",
  },
  {
    label: "预期价格",
    prop: "expcetedPrice",
    type: FormItemType.datePicker,
  },
  {
    label: "设施",
    prop: "facility",
    type: FormItemType.select,
    multiple: true,
  },
]);
const options = ref({
  apartment: [],
  facility: facilityOptions,
});
const formData = ref<RoomForm>({
  roomNumber: "",
  apartment: null,
  floor: 0,
  area: 0,
  expcetedPrice: 0,
  facility: [],
});
const currentRoomId = ref("");
const rules = ref({
  roomNumber: [{ required: true, message: "请输入名称", trigger: "blur" }],
  apartment: [{ required: true, message: "请选择公寓", trigger: "blur" }],
});

const addRoom = () => {
  const { label: apartmentName, value: apartmentId } = formData.value.apartment;
  const data: any = formData.value;
  delete data.apartment;
  data.apartmentName = apartmentName;
  data.apartmentId = apartmentId;

  loading.value = true;
  roomApi
    .add(data)
    .then(() => {
      myMessage.success("房间添加成功");
      dialog.value = false;
      emits("success");
    })
    .finally(() => {
      loading.value = false;
    });
};
const addMode = () => {
  dialog.value = true;
  currentRoomId.value = "";
  formData.value = {
    roomNumber: "",
    apartment: null,
    floor: 0,
    area: 0,
    expcetedPrice: 0,
    facility: [],
  };
};
const editMode = (id) => {
  dialog.value = true;
  currentRoomId.value = id;
  loading.value = true;
  roomApi
    .detail(id)
    .then((res: any) => {
      const apartment = {
        label: res.room.apartmentName,
        value: res.room.apartmentId,
      };
      formData.value = { apartment, ...res.room };
    })
    .finally(() => {
      loading.value = false;
    });
};
function getOptions() {
  apartmentApi.list().then((res: any) => {
    options.value.apartment = res.data?.records.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  });
}
onMounted(() => {
  getOptions();
});
defineExpose({
  addMode,
  editMode,
});
</script>
