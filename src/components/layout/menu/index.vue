<template>
  <div :style="{ height: globalHeight + 'px' }">
    <div class="helper-layout-menu">
      <div class="helper-logo">
        <img :src="LogoIcon" alt="" width="38" />
      </div>
      <el-menu default-active="1" :collapse="true" class="helper-el-menu">
        <el-menu-item index="1" @click="handleRouter('/home')">
          <el-icon><Reading /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="2" @click="handleRouter('/tools')">
          <el-icon><CopyDocument /></el-icon>
          <template #title>工具</template>
        </el-menu-item>
        <el-menu-item index="3" @click="handleRouter('/chat')">
          <el-icon><ChatLineRound /></el-icon>
          <template #title>聊天</template>
        </el-menu-item>
        <el-menu-item index="4" @click="handleRouter('/settings')">
          <el-icon><Setting /></el-icon>
          <template #title>设置</template>
        </el-menu-item>
      </el-menu>
      <div class="helper-menu-foot">
        <el-divider />
        <div class="helper-avatar">
          <img :src="UserAvatarIcon" alt="" width="40" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import {
  ChatLineRound,
  CopyDocument,
  Reading,
  Setting,
} from "@element-plus/icons-vue";

import LogoIcon from "@/assets/images/logo.png";
import UserAvatarIcon from "@/assets/images/user-avatar.jpeg";

import { useRouter } from "vue-router";

const router = useRouter();

const handleRouter = (path: string) => {
  router.push(path);
};

const globalHeight = ref(window.innerHeight - 30);

window.onresize = () => {
  globalHeight.value = window.innerHeight - 30;
};
</script>

<style lang="scss" scoped>
.helper-layout-menu {
  width: 64px;
  border-radius: 10px;
  border: 1px solid #e6e5e5 !important;
  height: 100%;
  .helper-menu-foot {
    position: absolute;
    left: 28px;
    bottom: 15px;
  }

  .helper-el-menu {
    border-right: none;
  }
  .helper-logo,
  .helper-avatar {
    height: 64px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .helper-avatar {
    padding-top: 2px;
    padding-bottom: 3px;
    img {
      border-radius: 50%;
    }
  }

  :deep(.el-divider--horizontal) {
    margin: 10px 0 0 0;
    border-top: 1px #e6e5e5 var(--el-border-style);
  }
}
</style>
