<template>
  <CommonHeader
    title="工具"
    remarks="使用工具解决问题就像猴子找到香蕉一样轻松愉快！"
  ></CommonHeader>
  <div class="helper-tools-group">
    <div class="common-title">
      <span>工作辅助</span>
    </div>
    <div class="helper-tools-list">
      <div class="helper-tools-div" @click="handleRouter('/tools/password')">
        <div class="helper-tools-image">
          <el-icon size="30"><Lock /></el-icon>
        </div>
        <div class="helper-tools-title common-overflow">密码管理</div>
      </div>
      <div class="helper-tools-div" @click="handleRouter('/tools/terminal/db')">
        <div class="helper-tools-image">
          <el-icon size="30">
            <img :src="TerminalIcon" alt="" width="25" />
          </el-icon>
        </div>
        <div class="helper-tools-title common-overflow">数据库终端</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from "@/components/header/index.vue";
import { Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

import TerminalIcon from "@/assets/images/terminal.svg";

const router = useRouter();

const handleRouter = (path: string) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.helper-tools-group {
  .common-title {
    margin-bottom: 10px;
  }
  .helper-tools-list {
    height: 70px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 95px);
    grid-gap: 12px;
    .helper-tools-div {
      color: #64748b;
      cursor: pointer;
      border-radius: 5px;
      height: 100%;
      border: 1px solid #ddd;
      &:hover {
        background-color: #f5f7fa;
      }
      .helper-tools-image {
        height: 25px;
        text-align: center;
        padding-top: 8px;
      }
      .helper-tools-title {
        text-align: center;
        height: 30px;
        line-height: 40px;
        font-size: 14px;
        padding: 0 10px;
      }
    }
  }
}
</style>
