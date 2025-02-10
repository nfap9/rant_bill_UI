<template>
  <el-form-item
    v-if="item.type === FormItemType.checkbox"
    :label="item.label"
    :prop="item.prop"
  >
    <el-checkbox-group
      v-model="data[item.prop]"
      :placeholder="item.placeholder"
    >
      <el-checkbox
        v-for="option in item.options"
        :value="option.value"
        :label="option.label"
      ></el-checkbox>
    </el-checkbox-group>
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
