<template>
  <div class="status-bar">
    <span>{{ time }}</span>
  </div>
</template>

<script>
export default {
  name: 'status-bar',
  data() {
    return {
      time: '',
    };
  },
  created() {
    this.setTimeString();
    // 设置更新时间的定时器, 1秒执行一次
    setInterval(this.setTimeString, 1000);
  },
  methods: {
    setTimeString() {
      let now = new Date();
      this.time = now.toLocaleString();
    },
  },
};
</script>

<style scoped>
.status-bar {
  height: 100%;
  line-height: 25px;
  text-align: right;
  border-top: 1px solid #ddd;
  padding: 0 5px;
  background-color: #fcfcfc;
}
</style>