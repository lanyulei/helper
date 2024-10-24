<template>
  <CommonHeader
    title="密码管理"
    remarks="在这里，你的密码安全得连你自己都可能忘了它们的存在——但别担心，我们不会忘记！"
  ></CommonHeader>
  <div class="helper-tools-password">
    <div class="helper-tools-password-left">
      <div class="helper-tools-password-header">
        <div class="helper-tools-password-header1">Password</div>
        <div>
          <el-icon @click="handleAdd"><Plus /></el-icon>
        </div>
      </div>
      <div class="helper-tools-password-title common-overflow">asdas</div>
    </div>
    <div class="helper-tools-password-right">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-position="top"
      >
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
            type="password"
          />
        </el-form-item>
        <el-form-item label="地址：" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="说明：" prop="remarks">
          <el-input
            v-model="ruleForm.remarks"
            type="textarea"
            placeholder="请输入说明"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CommonHeader from "@/components/header/index.vue";
import { Plus } from "@element-plus/icons-vue";

import Database from "@tauri-apps/plugin-sql";

const ruleForm = ref({
  title: "",
  username: "",
  password: "",
  url: "",
  remarks: "",
});
const rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const ruleFormRef = ref();

const submitForm = async () => {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};

const resetForm = () => {
  ruleFormRef.value.resetFields();
};

const handleAdd = async () => {
  await Database.load("sqlite:test.db");

  ruleFormRef.value.resetFields();
  ruleForm.value = {
    title: "",
    username: "",
    password: "",
    url: "",
    remarks: "",
  };
};
</script>

<style lang="scss" scoped>
.helper-tools-password {
  display: flex;
  border: 1px solid #e6e5e5;
  height: calc(100% - 60px);
  border-radius: 5px;
  .helper-tools-password-left {
    width: 200px;
    border-right: 1px solid #e6e5e5;
    .helper-tools-password-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 18px;
      padding: 10px;
      color: #334155;
      svg {
        cursor: pointer;
        margin-top: 2px;
        &:hover {
          color: #409eff;
        }
      }
    }
    .helper-tools-password-title {
      padding: 0 10px;
      height: 35px;
      line-height: 35px;
      border-top: #e6e5e5 1px solid;
      border-bottom: #e6e5e5 1px solid;
      cursor: pointer;
      color: #334155;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
  .helper-tools-password-right {
    padding: 15px;
    width: calc(100% - 150px);
  }
}
</style>
