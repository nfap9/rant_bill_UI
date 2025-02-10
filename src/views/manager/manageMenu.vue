<template>
  <el-menu class="manu" :default-active="menus[0].path" router>
    <el-menu-item v-for="item in menus" :index="item.path">
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { menus } from "@/config/menus";
</script>
<style scoped lang="less">
.manu {
  height: 100%;
}
</style>
