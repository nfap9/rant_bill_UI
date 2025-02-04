<template>
  <el-menu class="manu" :default-active="menus[0].path" router>
    <el-menu-item v-for="item in menus" :index="item.path">
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
const menus = [
  { path: "/overview", label: "总览" },
  { path: "/room-manager", label: "房屋管理" },
  { path: "/tenant-manager", label: "租户管理" },
  { path: "/apartment-manager", label: "公寓管理" },
];
</script>
<style scoped lang="less">
.manu {
  height: 100%;
}
</style>
