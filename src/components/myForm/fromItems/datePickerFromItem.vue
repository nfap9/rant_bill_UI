<template>
  <el-form-item
    v-if="item.type === FormItemType.datePicker"
    :label="item.label"
    :prop="item.prop"
  >
    <el-date-pick
      v-model="data[item.prop]"
      type="data"
      :placeholder="item.placeholder"
    ></el-date-pick>
  </el-form-item>
</template>
<script setup lang="ts">
import { formItem, FormItemType } from "@/components/myForm/contract";
interface Props {
  item: formItem;
  data: any;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({} as formItem),
  data: () => ({}),
});
</script>
