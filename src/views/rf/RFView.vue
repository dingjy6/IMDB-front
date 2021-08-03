<template>
  <div>
    这是模拟的RF界面
    <div id="rf-container" class="rf-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "rf-view",
};
</script>

<style scoped>
.rf-container {
  height: 640px;
  width: 360px;
  margin: auto;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
}
</style>
