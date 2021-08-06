<template>
  <div>
      <h3>练习3</h3>
      <!-- 组件化的记账本 -->
      <account-book v-model="accounts">
          <!-- 往账本的header插槽中添加扩展内容 -->
          <template #header>
              <div class="header">
                  这是插槽
                  <el-button type="danger" size="small" icon="el-icon-delete" @click="clearAll">清空</el-button>
              </div>
          </template>
      </account-book>
      <!-- 日志 - EventBus -->
      <log></log>
      <!-- 日志 - vuex -->
      <log-vuex></log-vuex>
  </div>
</template>

<script>
import AccountBook from "@/views/test/PracticeComponentized"
import Log from "@/views/test/Log"
import LogVuex from '@/views/test/LogVuex'

export default {
    name: "practice3",
    components: { AccountBook, Log, LogVuex },
    props: [],
    data() {
        return {
            accounts: [],   // 账目列表
        }
    },
    methods: {
        clearAll() {
            // 清空
            this.accounts = [];
        }
    }
}
</script>

<style scoped>
.header {
    height: 40px;
    line-height: 40px;
}
</style>