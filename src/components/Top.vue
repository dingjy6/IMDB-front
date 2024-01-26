<template>
  <div class="top">
    <el-menu class="top" mode="horizontal" style="padding: 0 10px">
      <span style="float: left" @click="setMenuCollapsed">
        <i v-if="menuCollapsed" class="el-icon-s-unfold" />
        <i v-else class="el-icon-s-fold" />
      </span>
      <b style="color:#409EFF;font-size:20px;">connection </b>
      <span>
        <el-radio v-model="database" label="mysql">mysql</el-radio>
        <el-radio v-model="database" label="mongo">mongo-db</el-radio>
      </span>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Top',
  computed: {
    ...mapGetters(['menuCollapsed','connection']),
  },
  data(){
    return{
      database:null,
    }
  },
  created(){
    this.database = this.connection;
    console.log(this.connection, this.database)
  },
  watch:{
    database(){
      this.$store.commit('CHANGE_CONNECTION',this.database);
    }
  },
  methods: {
    setMenuCollapsed() {
      this.$store.commit('CHANGE_MENU_COLLAPSED');
    },
  },
};
</script>

<style scoped>
.top {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  text-align: right;
  font-size: 25px;
}
</style>