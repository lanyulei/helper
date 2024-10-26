<script setup lang="ts">
import { onMounted } from "vue";
import LayoutMenu from "@/components/layout/menu/index.vue";

import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
// @ts-ignore
import { exit } from "@tauri-apps/plugin-process";

onMounted(async () => {
  // 配置托盘
  const menu = await Menu.new({
    items: [
      {
        id: "quit",
        text: "退出",
        action: async () => {
          await exit(0);
        },
      },
    ],
  });

  const options = {
    menu,
    menuOnLeftClick: true,
  };

  const tray = await TrayIcon.new(options);
  tray.setIcon(import.meta.env.VITE_APP_LOGO_PATH);
  tray.setTooltip("Jarvis");
});
</script>

<template>
  <div id="helper-app">
    <LayoutMenu></LayoutMenu>
    <div class="helper-router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#helper-app {
  display: flex;
  .helper-router-view {
    width: 100%;
    margin-left: 15px;
    border-radius: 10px;
    // border: 1px solid #e6e5e5 !important;
    // padding: 10px 15px 15px 15px;
  }
}
</style>
