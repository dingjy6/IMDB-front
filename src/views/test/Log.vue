<!-- 日志组件 -->
<template>
  <div>
      <h3>日志-EventBus</h3>
      <div v-for="(log, index) in logs" :key="index">
          {{log}}
      </div>
      <div v-if="logs.length === 0">暂无记录</div>
  </div>
</template>

<script>
import { EventBus } from "@/views/test/EventBus"

export default {
    name: "log",
    data() {
        return {
            logs: [],   // 记录日志
        }
    },
    created() {
        // 订阅事件
        EventBus.$on("add-log", (log) => {
            let now = new Date();
            let log1 = now.toLocaleString() + " " + log;
            this.logs.push(log1);
        })
    }
}
</script>

<style scoped>

</style>