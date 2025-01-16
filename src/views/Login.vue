<template>
  <div class="login-contain">
    <input
      class="input"
      type="text"
      v-model="username"
      placeholder="请输入账号"
    />
    <input
      class="input"
      type="password"
      v-model="password"
      placeholder="请输入密码"
    />
    <button @click="handleLogin">登录</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import user from "../api/user";

const username = ref("user1");
const password = ref("1234");

const handleLogin = () => {
  console.log(username.value, password.value);
  user.login(username.value, password.value).then((res) => {
    console.log(res);
  });
};
</script>
<style scoped>
.login-contain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  margin-bottom: 16px;
}
</style>
