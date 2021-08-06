<!-- 日志组件-vuex版 -->
<template>
  <div>
      <h3>日志-vuex</h3>
      <div v-for="(log, index) in logs" :key="index">
          {{log}}
      </div>
      <div v-if="logs.length === 0">暂无记录</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "log",
    data() {
        return {
            // 直接从vuex中获取logs
        }
    },
    computed: {
        ...mapGetters(['logs'])
    },
    created() {

    }
}
</script>

<style scoped>

</style>