<template>
  <el-drawer
    v-model="dialog"
    :title="mode === 'add' ? '新增合同公寓' : '更新合同信息'"
    direction="rtl"
  >
    <myForm
      v-loading="loading"
      :formItems="formItems"
      :formData="formData"
      :rules="rules"
      @submit="addContract"
    >
    </myForm>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import contractApi from "@/api/contractApi";
import myMessage from "@/utils/myMessage";
import myForm from "@/components/myForm/index.vue";
import { formItem, FormItemType } from "@/components/myForm/contract";

type ContractForm = {
  partA: string;
  partB: string;
  roomId: string;
  startTime: string;
  endTime: string;
  price: number;
};

const emits = defineEmits(["success"]);

const dialog = ref<boolean>(false);
const mode = ref("add");
const loading = ref<boolean>(false);
const formItems: formItem[] = [
  {
    label: "甲方",
    prop: "partyA",
    type: FormItemType.input,
  },
  {
    label: "乙方",
    prop: "partyB",
    type: FormItemType.input,
  },
  {
    label: "房间",
    prop: "room",
    type: FormItemType.select,
  },
  {
    label: "房租",
    prop: "price",
    type: FormItemType.input,
    inputType: "number",
  },
  {
    label: "起租日期",
    prop: "startDate",
    type: FormItemType.datePicker,
  },
  {
    label: "租期月数",
    prop: "monthNum",
    type: FormItemType.input,
  },
];
const formData = ref<ContractForm>({
  partA: "",
  partB: "",
  roomId: "",
  startTime: "",
  endTime: "",
  price: 0,
});
const currentId = ref("");
const rules = ref({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  address: [{ required: true, message: "请输入名称", trigger: "blur" }],
});

const addContract = (data) => {
  loading.value = true;
  contractApi
    .add(data)
    .then(() => {
      myMessage.success("添加成功");
      dialog.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
const addMode = () => {
  dialog.value = true;
  currentId.value = "";
  formData.value = {
    partA: "",
    partB: "",
    roomId: "",
    startTime: "",
    endTime: "",
    price: 0,
  };
};
const editMode = (id) => {
  dialog.value = true;
  currentId.value = id;
  loading.value = true;
  contractApi
    .detail(id)
    .then((res: any) => {
      const { partA, partB, roomId, startTime, endTime, price } = res.contract;
      formData.value = { partA, partB, roomId, startTime, endTime, price };
    })
    .finally(() => {
      loading.value = false;
    });
};
defineExpose({
  addMode,
  editMode,
});
</script>
