<template>
  <el-form-item
    v-if="item.type === FormItemType.select"
    :label="item.label"
    :prop="item.prop"
  >
    <el-select
      v-model="data[item.prop]"
      value-key="value"
      :multiple="item.multiple"
    >
      <el-option
        v-for="option in options[item.prop]"
        :key="option.value"
        :label="option.label"
        :value="option"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
<script setup lang="ts">
import { formItem, FormItemType } from "@/components/myForm/contract";
interface Props {
  item: formItem;
  data: any;
  options: any;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({} as formItem),
  data: () => ({}),
  options: () => ({}),
});
</script>
