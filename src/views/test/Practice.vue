<template>
  <div>
    <h3>练习1</h3>
    <div>
      <!-- TODO 1 -->
      <div>
        <el-form size="small" inline v-model="form">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input type="number" v-model.number="form.amount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="addItem"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div>
        <b class="row">账目信息</b>
        <div class="row">总金额：{{ sum }}</div>
        <el-row class="row">
          <el-col :span="1"><b>#</b></el-col>
          <el-col :span="3"><b>名称</b></el-col>
          <el-col :span="3"><b>金额</b></el-col>
        </el-row>
        <div>
          <el-row
            v-for="(item, index) in itemList"
            :key="index"
            class="row"
            :class="item.hightlight ? 'hightlight' : ''"
          >
            <el-col :span="1">{{ index + 1 }}</el-col>
            <el-col :span="3">{{ item.name }}</el-col>
            <el-col :span="3">{{ item.amount | formatAmount }}</el-col>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="deleteRow(index)"
              >删除</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-s-flag"
              @click="hightlightRow(item)"
              >{{item.hightlight ? '取消' : '标记'}}</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "practice",
  data() {
    return {
      form: {
        name: "",
        amount: "",
      },
      name: "",
      amount: "",
      itemList: [],
    };
  },
  computed: {
    // 计算属性，显示总金额
    sum() {
      return this.itemList.reduce((prev, curr) => prev + curr.amount, 0);
    },
  },
  created() {},
  mounted() {},
  methods: {
    addItem() {
      // 验证，不允许空值
      if (this.form.name === "" || this.form.amount === "") {
        return;
      }
      this.itemList.push({ name: this.form.name, amount: this.form.amount });
      // 清空
      this.form.name = "";
      this.form.amount = "";
    },
    deleteRow(index) {
      this.itemList.splice(index, 1);
    },
    // 高亮
    hightlightRow(row) {
      this.$set(row, 'hightlight', !row.hightlight);
      // row.hightlight = true;
    },
  },
  filters: {
    formatAmount(value) {
      return value.toFixed(2);
    }
  },
  watch: {
    itemList(newVal, oldVal) {
      this.$message.info("itemList变化了")
    }
  },
};
</script>

<style scoped>
.item {
  width: 200px;
}
.row {
  height: 40px;
  line-height: 40px;
}
.hightlight {
  color: red;
}
</style>
