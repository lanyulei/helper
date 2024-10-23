<template>
  <div style="margin-bottom: 10px">
    <div class="common-page-header">
      {{ props.title }}
    </div>
    <div class="common-page-remarks">
      {{ props.remarks }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  remarks: string;
}>();
</script>

<style lang="scss" scoped>
.common-page-header {
  color: #334155;
  line-height: 2rem;
  font-weight: 500;
  font-size: 19px;
}

.common-page-remarks {
  color: #64748b;
  line-height: 1.5rem;
  font-size: 14px;
}
</style>
