<template>
  <div class="login-contain">
    <input class="input" type="text" v-model="email" placeholder="请输入邮箱" />
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

const email = ref("test3@ee.com");
const password = ref("1234");

const handleLogin = () => {
  console.log(email.value, password.value);
  user.login(email.value, password.value).then((res) => {
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
