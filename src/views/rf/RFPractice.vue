<template>
  <div id="rf">
    <div style="margin-bottom: 20px;">
      <b>RF练习</b>
    </div>
    <div>
      <van-field v-model="lpn" label="托盘" placeholder="请输入托盘号" />
      <van-field
        readonly
        clickable
        label="站台"
        :value="station"
        placeholder="请选择站台"
        @click="showPicker = true"
        is-link
      />
    </div>
    <van-popup v-model="showPicker" round position="bottom" get-container="#rf">
      <van-picker
        show-toolbar
        :columns="stationColumns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-button type="primary" round block @click="sure1">确认</van-button>
  </div>
</template>

<script>
export default {
  name: "rf-practice",
  data() {
    return {
      lpn: "",
      station: "",
      stationColumns: ["131", "132", "133"],
      showPicker: false,
    };
  },
  methods: {
    onConfirm(value) {
      this.station = value;
      this.showPicker = false;
    },
    sure1() {
      this.$notify({
        type: "success",
        message: "托盘[" + this.lpn + "]在站台[" + this.station + "]入库成功",
      });
    },
  },
};
</script>

<style scoped></style>
