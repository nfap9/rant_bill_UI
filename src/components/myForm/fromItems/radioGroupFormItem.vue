<template>
  <el-form-item
    v-if="item.type === FormItemType.radioGroup"
    :label="item.label"
    :prop="item.prop"
  >
    <el-radio-group v-model="data[item.prop]" :placeholder="item.placeholder">
      <el-radio
        v-for="option in item.options"
        :value="option.value"
        :label="option.label"
      ></el-radio>
    </el-radio-group>
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
