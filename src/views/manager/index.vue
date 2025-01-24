<template>
  <el-container class="container">
    <el-header class="header"
      ><span class="title"> 出租房管理系统 </span>
    </el-header>
    <el-container class="inner-container">
      <el-aside width="200px" class="aside"><manageMenu></manageMenu></el-aside>
      <el-main class="main">
        <div class="main-contain"><router-view /></div>
      </el-main>
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
    .title {
      line-height: 32px;
      font-size: 22px;
    }
  }
  .inner-container {
    .aside {
    }
    .main {
      padding: 12px;
      .main-contain {
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 5px 2px #eee;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
