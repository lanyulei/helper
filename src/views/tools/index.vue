<template>
  <CommonHeader
    title="工具"
    remarks="使用工具解决问题就像猴子找到香蕉一样轻松愉快！"
  ></CommonHeader>
  <div class="helper-tools-group">
    <div class="common-title">
      <span>工作辅助</span>
    </div>
    <div class="helper-tools-value">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from "@/components/header/index.vue";
</script>

<style lang="scss" scoped>
.helper-tools-group {
  .helper-tools-value {
  }
}
</style>
