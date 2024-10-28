<template>
  <CommonHeader
    title="工具"
    remarks="使用工具解决问题就像猴子找到香蕉一样轻松愉快！"
  ></CommonHeader>
  <el-input
    v-model="searchValue"
    :prefix-icon="Search"
    placeholder="请输入工具名称"
    style="margin-bottom: 12px; width: 300px"
    @input="handleFilterTools"
  />
  <div class="helper-tools-group">
    <div class="common-title">
      <span>工作辅助</span>
    </div>
    <div class="helper-tools-list">
      <div
        v-for="item in filterTools"
        :key="item.id"
        class="helper-tools-div"
        @click="handleRouter(item.path)"
      >
        <div class="helper-tools-image">
          <el-icon size="30" v-if="item.iconType === 'element'">
            <component :is="item.icon"> </component>
          </el-icon>
          <el-icon size="30" v-else-if="item.iconType === 'image'">
            <img :src="item.icon" alt="" width="25" />
          </el-icon>
        </div>
        <div class="helper-tools-title common-overflow">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import CommonHeader from "@/components/header/index.vue";
import { Lock, Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import TerminalIcon from "@/assets/images/terminal.svg";

const router = useRouter();
const searchValue = ref("");
const toolList = [
  {
    id: 1,
    label: "密码管理",
    icon: Lock,
    iconType: "element",
    path: "/tools/password",
  },
  {
    id: 2,
    label: "数据库终端",
    icon: TerminalIcon,
    iconType: "image",
    path: "/tools/terminal/db",
  },
];
const filterTools = shallowRef(toolList);

const handleFilterTools = () => {
  const lowerCaseLabel = searchValue.value.toLowerCase();
  filterTools.value = toolList.filter((tool) =>
    tool.label.toLowerCase().includes(lowerCaseLabel)
  );
};

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
