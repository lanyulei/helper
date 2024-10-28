<template>
  <CommonHeader
    title="数据库终端连接"
    remarks="让数据飞：一键连接，探索数据库的奇妙之旅！"
  ></CommonHeader>
  <el-form>
    <el-form-item label="数据库类型：">
      <el-radio-group v-model="ruleForm.dbType">
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
        <el-option label="aaa" value="aaa" />
      </el-select>
      <el-button :icon="Plus" style="margin-left: 10px" />
      <el-button type="primary" :icon="Connection" style="margin-left: 10px">
        连接
      </el-button>
      <el-button
        :icon="Setting"
        style="margin-left: 10px"
        @click="handleConnectManager"
      >
        连接配置
      </el-button>
    </el-form-item>
  </el-form>

  <el-dialog v-model="connectVisible" title="数据库连接配置" width="500">
    <div></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="connectVisible = false">取消</el-button>
        <el-button type="primary" @click="connectVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import CommonHeader from "@/components/header/index.vue";
import { Connection, Plus, Setting } from "@element-plus/icons-vue";
import { ref } from "vue";

const ruleForm = ref({
  dbType: "mysql", // mysql or pgsql
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
const connectVisible = ref(false);

const handleConnectManager = () => {
  connectVisible.value = true;
};
</script>

<style lang="scss" scoped></style>
