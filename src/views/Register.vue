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
import userApi from "@/api/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref();

const formData = ref({
  username: "",
  password: "",
  confirmPassword: "",
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (formData.value.confirmPassword !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("confirmPassword");
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== formData.value.password) {
    callback(new Error("两次输入的密码不一致!"));
  } else {
    callback();
  }
};
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: validatePass2, trigger: "blur" },
  ],
};
const toLogin = () => {
  router.push("/login");
};

const register = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      userApi
        .register(formData.value.username, formData.value.password)
        .then((res: any) => {
          console.log(res);
          if (res.token) {
            ElMessage({
              message: "注册成功",
              type: "success",
            });
            toLogin();
          }
        });
    }
  });
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
