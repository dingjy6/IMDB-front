<template>
  <div class="home" v-if="!ifShow">
    <h3>Welcome to IMDB Recommend System</h3>
    <div class="sub-title">You may want to find:</div>
    <div style="padding:20px">
      <el-tag  v-for="(item,index) in query" :key="index" class="content" @click="toSQL(index)">{{item.queryName}}</el-tag>
    </div>
  </div>
  <sql-show v-else :query='query[key]' @back="ifShow = false"></sql-show>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SqlShow from './SqlShow.vue'
import queryList from './js/query'

export default {
  name: 'home',
  components: {
    HelloWorld,
    SqlShow
  },
  data(){
    return{
      key:0,
      ifShow:false,
      query:require('./js/query')['queryList']

    }
  },
  methods:{
    toSQL(index){
      this.key = index;
      this.ifShow = true;
    }
  }
}
</script>
<style>
.content{
  margin: 0 0 10px 15px;
}
.content:hover{
  transform:scale(1.2,1.2);
  transition: all 0.3s ease;
  opacity:0.8;
  cursor: pointer;
}
</style>
