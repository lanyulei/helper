<template>
  <CommonHeader
    title="密码管理"
    remarks="在这里，你的密码安全得连你自己都可能忘了它们的存在——但别担心，我们不会忘记！"
  ></CommonHeader>
  <div class="helper-tools-password">
    <div class="helper-tools-password-left">
      <div class="helper-tools-password-header">
        <div class="helper-tools-password-header1">Password List</div>
        <div>
          <el-icon @click="handleAdd"><Plus /></el-icon>
        </div>
      </div>
      <div
        v-for="item in list"
        :key="item.id"
        class="helper-tools-password-title common-overflow"
        :class="
          selectValue[item.id] && ruleForm.id
            ? 'helper-tools-password-selected'
            : ''
        "
        @click="handleEdit(item)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="helper-tools-password-right">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-position="top"
      >
        <el-form-item label="标题：" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入标题"
            style="max-width: 300px"
          />
        </el-form-item>
        <el-form-item label="用户名：" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            style="max-width: 300px"
          />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
            type="password"
            style="max-width: 300px"
          >
          </el-input>
          <el-tooltip effect="dark" content="生成随机密码" placement="right">
            <el-button
              :icon="RefreshLeft"
              @click="handleRandomPassword"
              style="padding: 8px 10px; margin-left: 8px"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="复制密码" placement="right">
            <el-button
              :icon="CopyDocument"
              @click="handleCopyText(ruleForm.password)"
              style="padding: 8px 10px; margin-left: 8px"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="地址：" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="说明：" prop="remarks">
          <el-input
            v-model="ruleForm.remarks"
            type="textarea"
            placeholder="请输入说明"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <el-dialog v-model="randomPasswordVisible" title="生成随机密码" width="500">
    <template #footer>
      <el-form :model="randomPasswordForm">
        <el-form-item label="所用字符：">
          <el-checkbox-group v-model="randomPasswordForm.textType">
            <el-checkbox label="小写字母" value="Lower" />
            <el-checkbox label="大写字母" value="Upper" />
            <el-checkbox label="数字" value="Number" />
            <el-checkbox label="特殊字符" value="SpecialCharacters" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="密码长度：">
          <el-input-number v-model="randomPasswordForm.length" />
        </el-form-item>
        <el-form-item label="密码内容：">
          <el-input v-model="randomPasswordForm.content" readonly>
            <template #append>
              <el-button
                :icon="CopyDocument"
                @click="handleCopyText(randomPasswordForm.content)"
              />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="randomPasswordVisible = false">取消</el-button>
        <el-button @click="handleGenPass"> 点击生成 </el-button>
        <el-button type="primary" @click="handleRandomPassSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CommonHeader from "@/components/header/index.vue";
import { CopyDocument, Plus, RefreshLeft } from "@element-plus/icons-vue";

import Database from "@tauri-apps/plugin-sql";
import { ElNotification } from "element-plus";

// @ts-ignore
import { randomPass } from "@/utils/password/random";

import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();

const randomPasswordVisible = ref(false);
const randomPasswordForm = ref({
  textType: ["Lower", "Upper", "Number", "SpecialCharacters"],
  length: 16,
  content: "",
});
const ruleForm = ref({
  id: undefined,
  title: "",
  username: "",
  password: "",
  url: "",
  remarks: "",
});
const rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const ruleFormRef = ref();
const db = ref();
const handleStatus = ref("create");
const list = ref([]);

const handleGet = async () => {
  list.value = await db.value.select("SELECT * FROM helper_tools_password");
};

const resetForm = () => {
  ruleFormRef.value.resetFields();
};

const handleCopyText = async (val: string) => {
  if (!val || val === "") {
    ElNotification.warning("请确认需要复制的文本是否存在！");
    return;
  }

  try {
    await toClipboard(val);
    ElNotification.success("复制成功！");
  } catch (e) {
    ElNotification.error("复制失败！");
    console.log(e);
  }
};

const handleRandomPassword = () => {
  randomPasswordForm.value = {
    textType: ["Lower", "Upper", "Number", "SpecialCharacters"],
    length: 16,
    content: "",
  };
  randomPasswordVisible.value = true;
};

const handleGenPass = () => {
  randomPasswordForm.value.content = randomPass(
    randomPasswordForm.value.length,
    randomPasswordForm.value.textType
  );

  if (
    !randomPasswordForm.value.content ||
    randomPasswordForm.value.content === ""
  ) {
    ElNotification.error(
      "密码生成失败，密码长度不能为 0，所用字符不能为空，请确认。"
    );
  }
};

const handleRandomPassSubmit = () => {
  ruleForm.value.password = randomPasswordForm.value.content;
  randomPasswordVisible.value = false;
};

const handleAdd = async () => {
  ruleFormRef.value.resetFields();
  handleStatus.value = "create";
  ruleForm.value = {
    id: undefined,
    title: "",
    username: "",
    password: "",
    url: "",
    remarks: "",
  };
};
const selectValue = ref({});

const handleEdit = async (row: any) => {
  ruleFormRef.value.resetFields();
  handleStatus.value = "edit";
  ruleForm.value = JSON.parse(JSON.stringify(row));
  console.log(row.id);
  selectValue.value = {};
  // @ts-ignore
  selectValue.value[row.id] = true;
  console.log(selectValue.value);
};

const submitForm = async () => {
  ruleFormRef.value.validate(async (valid: any) => {
    if (valid) {
      if (handleStatus.value === "create") {
        await db.value.execute(
          "INSERT INTO helper_tools_password (title, username, password, url, remarks) VALUES (?, ?, ?, ?, ?)",
          [
            ruleForm.value.title,
            ruleForm.value.username,
            ruleForm.value.password,
            ruleForm.value.url,
            ruleForm.value.remarks,
          ]
        );
        ElNotification.success("修改成功");
      } else if (handleStatus.value === "edit") {
        await db.value.execute(
          "UPDATE helper_tools_password SET title = ?, username = ?, password = ?, url = ?, remarks = ? WHERE id = ?",
          [
            ruleForm.value.title,
            ruleForm.value.username,
            ruleForm.value.password,
            ruleForm.value.url,
            ruleForm.value.remarks,
            ruleForm.value.id,
          ]
        );
        ElNotification.success("修改成功");
      }
    }
  });
};

onMounted(async () => {
  db.value = await Database.load("sqlite:sqlite.db");
  handleGet();
});
</script>

<style lang="scss" scoped>
.helper-tools-password {
  display: flex;
  border: 1px solid #e6e5e5;
  height: calc(100% - 60px);
  border-radius: 5px;
  .helper-tools-password-left {
    width: 300px;
    border-right: 1px solid #e6e5e5;
    .helper-tools-password-selected {
      background-color: #fbfbfb;
      color: #409eff !important;
    }
    .helper-tools-password-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 18px;
      padding: 10px;
      color: #334155;
      border-bottom: #e6e5e5 1px solid;
      svg {
        cursor: pointer;
        margin-top: 2px;
        &:hover {
          color: #409eff;
        }
      }
    }
    .helper-tools-password-title {
      padding: 0 10px;
      height: 35px;
      line-height: 35px;
      border-bottom: #e6e5e5 1px solid;
      cursor: pointer;
      color: #334155;
      font-size: 14px;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
  .helper-tools-password-right {
    padding: 15px;
    width: calc(100% - 150px);
  }
}

.copyRandomPassword {
  cursor: pointer;
}
</style>
