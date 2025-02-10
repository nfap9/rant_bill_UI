<template>
  <el-form v-loading="loading" ref="formRef" :model="formData" :rules="rules">
    <template v-for="item in formItems">
      <inputFormItem :item="item" :data="formData"></inputFormItem>
      <selectFormItem
        :item="item"
        :data="formData"
        :options="options"
      ></selectFormItem>
      <datePickerFromItem :item="item" :data="formData"></datePickerFromItem>
      <checkboxFormItem
        :item="item"
        :data="formData"
        :options="options"
      ></checkboxFormItem>
      <radioGroupFormItem
        :item="item"
        :data="formData"
        :options="options"
      ></radioGroupFormItem>
      <slot name="custom" :item="item" :data="formData"></slot>
    </template>
    <el-form-item>
      <el-button @click="onCancel" type="primary">取消</el-button>
      <el-button @click="onSubmit" type="primary">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { formItem } from "./contract";
import inputFormItem from "./fromItems/inputFormItem.vue";
import selectFormItem from "./fromItems/selectFormItem.vue";
import datePickerFromItem from "./fromItems/datePickerFromItem.vue";
import checkboxFormItem from "./fromItems/checkboxFormItem.vue";
import radioGroupFormItem from "./fromItems/radioGroupFormItem.vue";

interface Props {
  formItems: formItem[];
  formData: any;
  rules: any;
  options?: any;
}
const props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
  formData: () => ({}),
  rules: () => ({}),
  options: () => ({}),
});
const emits = defineEmits(["submit", "cancel"]);
const formRef = ref();
const rules = ref({});
const loading = ref(false);
const onSubmit = () => {
  formRef.value?.validate((res) => {
    if (res) {
      emits("submit", props.formData);
    }
  });
};
const onCancel = () => {
  emits("cancel");
};
</script>
