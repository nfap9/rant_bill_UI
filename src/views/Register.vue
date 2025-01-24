<template>
  <div class="login-contain">
    <el-form :model="formData">
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          type="password"
        ></el-input
      ></el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          placeholder="请再次输入密码"
          type="password"
        ></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="toLogin">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const formData = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

const register = () => {
  console.log(formData.value.username, formData.value.password);
  console.log("注册");
};
const toLogin = () => {
  console.log("去登录");
};
const initData = () => {
  formData.value = {
    username: "",
    password: "",
    confirmPassword: "",
  };
};
onMounted(() => {
  initData();
});
</script>
<style scoped>
.login-contain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
