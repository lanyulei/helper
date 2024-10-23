<script setup lang="ts">
import Menu from "@/components/layout/menu/index.vue";
</script>

<template>
  <div id="helper-app">
    <Menu></Menu>
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
    border: 1px solid #ddd;
    padding: 10px;
  }
}
</style>
