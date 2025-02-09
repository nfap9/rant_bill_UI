<template>
  <el-drawer
    v-model="dialog"
    :title="mode === 'add' ? '添加公寓' : '更新公寓信息'"
    direction="rtl"
  >
    <el-form v-loading="loading" ref="formRef" :model="form" :rules="rules">
      <el-form-item label="公寓名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="楼层" prop="floors">
        <el-input type="number" :min="1" v-model="form.floors" />
      </el-form-item>
      <el-form-item label="是否有电梯" prop="elevator">
        <el-select v-model="form.elevator">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleConfirm">确认</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import apartmentApi from "@/api/apartment";
import myMessage from "@/utils/myMessage";

type ApartmentForm = {
  name: string;
  address: string;
  floors: number;
  elevator: boolean;
};

const emits = defineEmits(["success"]);

const dialog = ref<boolean>(false);
const mode = ref("add");
const formRef = ref(null);
const loading = ref<boolean>(false);
const form = ref<ApartmentForm>({
  name: "",
  address: "",
  floors: 1,
  elevator: false,
});
const apartmentId = ref("");
const rules = ref({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  address: [{ required: true, message: "请输入名称", trigger: "blur" }],
});
const addApartment = () => {
  loading.value = true;
  apartmentApi
    .add(form.value)
    .then((res: any) => {
      myMessage.success("新增成功");
      emits("success");
      dialog.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
const editApartment = () => {
  loading.value = true;
  const { name, address, floors, elevator } = form.value;
  const data = { name, address, floors, elevator };
  apartmentApi
    .update(apartmentId.value, data)
    .then(() => {
      myMessage.success("更新成功");
      emits("success");
      dialog.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
const handleConfirm = () => {
  formRef.value?.validate((res) => {
    if (res) {
      console.log(mode.value);

      if (mode.value === "add") {
        addApartment();
      }
      if (mode.value === "edit") {
        editApartment();
      }
    }
  });
};
const addMode = () => {
  mode.value = "add";
  dialog.value = true;
  form.value = {
    name: "",
    address: "",
    floors: 1,
    elevator: false,
  };
};
const editMode = (id) => {
  mode.value = "edit";
  apartmentId.value = id;
  dialog.value = true;
  loading.value = true;
  apartmentApi
    .detail(id)
    .then((res: any) => {
      const { name, address, floors, elevator } = res.apartment;
      form.value = { name, address, floors, elevator };
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
