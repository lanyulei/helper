<script setup lang="ts">
import Menu from "@/components/layout/menu/index.vue";
</script>

<template>
  <Menu></Menu>
  <div class="flex-1 h-full overflow-y-auto pb-0.5">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped></style>
