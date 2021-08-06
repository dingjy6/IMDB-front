<!-- 把练习1中的记账本进行了组件化 -->
<template>
  <div>
    <b>记账本</b>
    <div>
      <!-- 练习3-提供header插槽 -->
      <slot name="header"></slot>

      <div>
        <el-form size="small" inline v-model="form">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input type="number" v-model.number="form.amount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addItem"
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
              >{{ item.hightlight ? "取消" : "标记" }}</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/views/test/EventBus"

export default {
  name: "practice-componentization",
  // 声明一个accounts的prop，并将其用作一个v-model，当触发change事件时，能通知父组件更新值
  model: {
    prop: "accounts",
    event: "change"
  },
  props: {
    accounts: {
      type: Array,
      // 数组和对象类型的默认值，需要通过函数初始化
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: "",
        amount: "",
      },
      name: "",
      amount: "",
      // itemList不变，v-for中循环渲染的仍然时内部的itemList；初始值设为传入的prop
      itemList: this.accounts,
    };
  },
  computed: {
    // 计算属性，显示总金额
    sum() {
      // 通过reduce计算，可以自行查阅用法
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
      let item = { name: this.form.name, amount: this.form.amount }
      this.itemList.push(item);
      // 清空
      this.form.name = "";
      this.form.amount = "";

      // Practice3 向eventbus中发布事件
      EventBus.$emit('add-log', '新增：' + JSON.stringify(item));
      // Practice3 向vuex提交mutation
      this.$store.commit('ADD_LOG', '新增：' + JSON.stringify(item));
    },
    deleteRow(index) {
      let deletedItem = this.itemList.splice(index, 1);

      // Practice3 向eventbus中发布事件
      EventBus.$emit('add-log', '删除：' + JSON.stringify(deletedItem));
      // Practice3 向vuex提交mutation
      this.$store.commit('ADD_LOG', '删除：' + JSON.stringify(deletedItem));
    },
    // 高亮
    hightlightRow(row) {
      this.$set(row, "hightlight", !row.hightlight);
      // row.hightlight = true;
      
      // Practice3 向eventbus中发布事件
      EventBus.$emit('add-log', (row.hightlight ? '标记' : '取消标记') + '：' + JSON.stringify(row));
      // Practice3 向vuex提交mutation
      this.$store.commit('ADD_LOG', (row.hightlight ? '标记' : '取消标记') + '：' + JSON.stringify(row));
    },
  },
  filters: {
    formatAmount(value) {
      return value.toFixed(2);
    },
  },
  watch: {
    itemList(newVal, oldVal) {
      this.$message.info("itemList变化了");
      // Practice3 组件化，账本改变时，通知父组件
      this.$emit("change", newVal);

      if(oldVal.length > 0 && newVal.length === 0) {
        // 被清空了
        // Practice3 向eventbus中发布事件
        EventBus.$emit('add-log', '清空');
        // Practice3 向vuex提交mutation
        this.$store.commit('ADD_LOG', '清空');
      }
    },
    accounts(newVal, oldVal) {
      // Practice3 同步更新
      this.itemList = newVal;
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
