<template>
  <el-form-item
    v-if="item.type === FormItemType.input"
    :label="item.label"
    :prop="item.prop"
  >
    <el-input
      v-model="data[item.prop]"
      :type="item.inputType"
      :placeholder="item.placeholder"
    />
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
