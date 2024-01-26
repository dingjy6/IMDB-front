<template>
  <div>
    <h3>练习1</h3>
    <div>
      <!-- TODO 1 -->
      <el-form :inline="true" :model="form" size="small">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            type="number"
            v-model.number="form.amount"
            placeholder="金额"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addItem" icon="el-icon-plus"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-row> <b>总金额：</b> {{ sum }} </el-row>
        <el-row>
          <el-col :span="3">
            <b>名称</b>
          </el-col>
          <el-col :span="3">
            <b>金额</b>
          </el-col>
        </el-row>
        <el-row
          v-for="(item, index) in itemList"
          :key="index"
          :class="item.hightlight ? 'red' : ''"
        >
          <el-col :span="3">
            {{ item.name }}
          </el-col>
          <el-col :span="3">
            {{ item.amount | formatAmount }}
          </el-col>
          <el-button type="danger" @click="deleteRow(index)">删除</el-button>
          <el-button @click="hightlightRow(item)">标记</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'practice',
  data() {
    return {
      form: {
        name: '',
        amount: '',
      },
      itemList: [],
    };
  },
  computed: {
    sum() {
      let sum = 0;
      // for (let i = 0; i < this.itemList.length; i++) {
      //   sum += this.itemList[i].amount;
      // }
      for (let item of this.itemList) {
        sum += item.amount;
      }
      // sum = this.itemList.reduce((prev, curr) => (prev += curr.amount), 0);
      return sum;
    },
  },
  created() {},
  mounted() {},
  methods: {
    addItem() {
      this.itemList.push({ name: this.form.name, amount: this.form.amount });
      console.log(this.itemList);
      // 清空
      this.form.name = '';
      this.form.amount = '';
    },
    deleteRow(index) {
      this.itemList.splice(index, 1);
    },
    hightlightRow(row) {
      // row.hightlight = true;
      this.$set(row, 'hightlight', true);
      console.log(row);
    },
  },
  filters: {
    formatAmount(value) {
      return value.toFixed(2);
    },
  },
  watch: {
    itemList(newVal, oldVal) {
      this.$message('数组变化了');
    },
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
