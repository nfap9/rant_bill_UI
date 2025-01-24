<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
    <el-container class="inner-container">
      <el-aside width="200px" class="aside"><manageMenu></manageMenu></el-aside>
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import manageMenu from "./manageMenu.vue";
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    background-color: rgb(197.7, 225.9, 255);
    box-shadow: 5px 0px 5px #bcbcbc;
    z-index: 9;
  }
  .inner-container {
    .aside {
    }
    .main {
    }
  }
}
</style>
