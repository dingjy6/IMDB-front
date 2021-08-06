<template>
  <div>
    <div style="margin-bottom: 20px">
      <b>RF练习</b>
    </div>
    <div class="practice-problem">
      <van-field
        v-model="lpn"
        label="托盘号"
        placeholder="请输入托盘号"
        required
        center
      />
      <van-field
        readonly
        clickable
        label="站台"
        :value="station"
        placeholder="请选择站台"
        center
        is-link
        required
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="stationColumns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-button type="primary" round block @click="sure1">确认</van-button>
    </div>
    <div class="practice-problem">
      <van-field
        v-model="lpn1"
        label="托盘号"
        placeholder="请输入托盘号"
        required
        center
      >
        <template #button>
          <van-button round size="small" @click="queryPltInfo">查询</van-button>
        </template>
      </van-field>
      <div v-if="loading">
        加载中...
      </div>
      <div v-else>
        <van-cell v-for="(info, index) in pltInfoList" :key="index">
          <div>物料编码：{{ info.sku }}</div>
          <div>物料描述：{{ info.skuDesc }}</div>
          <div>数量：{{ info.qty }}</div>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rf-practice",
  data() {
    return {
      lpn: "", // 托盘号
      station: "", // 站台号
      stationColumns: ["131", "132", "133"], // 站台列表
      showPicker: false, // 显示站台选择器
      lpn1: "",
      loading: false, // 加载状态
      pltInfoList: [], // 托盘信息列表
    };
  },
  methods: {
    onConfirm(value) {
      this.station = value;
      this.showPicker = false;
    },
    sure1() {
      // 判断必填项
      if (this.lpn === "" || this.station === "") {
        this.$notify({
          type: "warning",
          message: "请填写必填项",
        });
        return;
      }
      this.$dialog
        .alert({
          title: "确认",
          message: "是否确认提交？",
          showCancelButton: true,
        })
        .then(() => {
          this.$notify({
            type: "success",
            message:
              "托盘[" + this.lpn + "]在站台[" + this.station + "]入库成功",
          });
        })
        .cancel(() => {});
    },
    queryPltInfo() {
      // 判断必填项
      if (this.lpn1 === "") {
        this.pltInfoList = [];
        return;
      }
      // 设置加载
      this.loading = true;
      // 模拟加载，1秒后出数据
      setTimeout(() => {
        // 结束加载状态
        this.loading = false;
        this.pltInfoList = [
          { sku: "10000001", skuDesc: "物料1", qty: 10 },
          { sku: "10000002", skuDesc: "物料2", qty: 20 },
          { sku: "10000003", skuDesc: "物料3", qty: 30 },
        ];
      }, 1000);
    },
  },
};
</script>

<style scoped>
.practice-problem {
  margin-bottom: 20px;
}
</style>
