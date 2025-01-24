<template>
  <div class="login-contain">
    <el-form ref="ruleForm" :model="formData" :rules="rules">
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
          show-password
        ></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">登录</el-button>
        <el-button @click="toRegist">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import user from "../api/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const formData = ref({
  username: "",
  password: "",
});

const ruleForm = ref();
const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
};
const toManager = () => {
  router.push("/manager");
};
const toRegist = () => {
  router.push("/register");
};

const onsubmit = () => {
  ruleForm.value?.validate((res) => {
    if (res) {
      user
        .login(formData.value.username, formData.value.password)
        .then((res: any) => {
          if (res.token) {
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            toManager();
          }
        });
    }
  });
};

const init = () => {
  formData.value = {
    username: "user1",
    password: "1234",
  };
};

onMounted(() => {
  init();
});
</script>
<style scoped>
.login-contain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
