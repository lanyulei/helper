<template>
  <CommonHeader
    title="聊天"
    remarks="在这里，每一次的输入都是一场冒险！"
  ></CommonHeader>
  <div class="helper-chat-container">
    <div>list</div>
    <div>content</div>
  </div>
</template>

<script lang="ts" setup>
import CommonHeader from "@/components/header/index.vue";
</script>

<style lang="scss" scoped>
.helper-chat-container {
  display: flex;
}
</style>
