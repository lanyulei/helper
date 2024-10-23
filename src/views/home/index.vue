<template>
  <CommonHeader
    title="首页"
    remarks="欢迎来到我的大本营，让生活少一点‘码’味，多一点趣味！"
  ></CommonHeader>
  <div class="helper-home-sentence">
    大多数人想要改造这个世界，但却罕有人想改造自己。
  </div>
</template>

<script lang="ts" setup>
import CommonHeader from "@/components/header/index.vue";
</script>

<style lang="scss" scoped>
.helper-home-sentence {
  text-align: center;
  margin-top: 100px;
  font-size: 20px;
  color: #334155;
}
</style>
