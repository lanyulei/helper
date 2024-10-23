<template>
  <div class="helper-layout-menu">
    <div class="helper-logo">
      <img :src="LogoIcon" alt="" width="38" />
    </div>
    <el-menu default-active="1" :collapse="true" class="helper-el-menu">
      <el-menu-item index="1">
        <el-icon><img :src="HomeIcon" alt="" width="18" /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><CopyDocument /></el-icon>
        <template #title>工具</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><ChatLineRound /></el-icon>
        <template #title>聊天</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
    <el-divider />
    <div class="helper-avatar">
      <img :src="UserAvatarIcon" alt="" width="40" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatLineRound, CopyDocument, Setting } from "@element-plus/icons-vue";
import HomeIcon from "@/assets/images/home.svg";
import LogoIcon from "@/assets/images/logo.png";
import UserAvatarIcon from "@/assets/images/user-avatar.jpeg";
</script>

<style lang="scss" scoped>
.helper-layout-menu {
  width: 64px;
  border-radius: 10px;
  border: 1px solid #ddd !important;
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
    img {
      border-radius: 50%;
    }
  }

  :deep(.el-divider--horizontal) {
    margin: 10px 0 0 0;
  }
}
</style>
