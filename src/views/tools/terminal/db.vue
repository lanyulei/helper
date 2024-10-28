<template>
  <CommonHeader
    title="数据库终端连接"
    remarks="让数据飞：一键连接，探索数据库的奇妙之旅！"
  ></CommonHeader>
  <el-form class="tools-db-index">
    <el-form-item label="数据库类型：">
      <el-radio-group v-model="ruleForm.db_type">
        <el-radio
          v-for="(item, index) in dhTypes"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="数据库实例：">
      <el-select
        v-model="ruleForm.address"
        placeholder="请选择数据库连接实例"
        style="width: 300px"
        filterable
      >
        <el-option
          v-for="item in dbList"
          :key="item.id"
          :label="item.address"
          :value="item.address"
        />
      </el-select>
      <el-button
        type="primary"
        :icon="Connection"
        style="margin-left: 10px"
        @click="handleConnect"
      >
        连接
      </el-button>
    </el-form-item>
  </el-form>

  <div class="tools-terminal-content"></div>

  <el-dialog
    v-model="connectVisible"
    class="connect-dialog"
    title="数据库连接配置"
    width="500"
  >
    <el-form
      ref="connectFormRef"
      :model="connectForm"
      :rules="connectRules"
      label-position="top"
    >
      <el-form-item label="地址：" prop="host">
        <el-input v-model="connectForm.host" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="端口：" prop="port">
        <el-input-number
          v-model="connectForm.port"
          placeholder="请输入端口"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="connectForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="connectForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="connectVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(connectFormRef)">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import CommonHeader from "@/components/header/index.vue";
import { Connection } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";

import { ref } from "vue";

const ruleForm = ref({
  db_type: "mysql", // mysql or pgsql
  address: "",
});
const dhTypes = [
  {
    label: "MySQL",
    value: "mysql",
  },
  {
    label: "Postgres",
    value: "pgsql",
  },
];
const dbUsers: any = {
  mysql: {
    username: "root",
    password: "root",
  },
  pgsql: {
    username: "postgres",
    password: "postgres",
  },
};
const connectVisible = ref(false);
const dbList = ref([]);
const connectFormRef = ref<FormInstance>();
const connectForm = ref({
  host: "",
  port: 3306,
  username: "",
  password: "",
});
const connectRules = ref({
  host: [{ required: true, message: "请输入地址", trigger: "blur" }],
  port: [{ required: true, message: "请输入端口", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    }
  });
};

const handleConnect = () => {
  connectFormRef.value?.resetFields();
  connectForm.value = {
    host: ruleForm.value.address,
    port: 3306,
    username: dbUsers[ruleForm.value.db_type].username,
    password: dbUsers[ruleForm.value.db_type].password,
  };
  console.log(connectForm.value);
  connectVisible.value = true;
};
</script>

<style lang="scss" scoped>
.tools-db-index {
  :deep(.el-form-item) {
    margin-bottom: 8px;
  }
}

.tools-terminal-content {
  height: calc(100% - 149px);
  margin-top: 18px;
  border: 1px solid #e6e5e5;
  border-radius: 5px;
}
</style>
