<template>
  <div>
    <el-button icon="el-icon-back" size="small" @click="backHome"></el-button>
    <h3>{{query.queryName}}</h3>
    <span style="float:right">Running Time:{{runningTime}}</span>
    <el-table v-loading="loading" height="500" :data="tableData">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column v-for="(item, index) in attributes" :key="index" :label="item" :prop="item"></el-table-column>
    </el-table>
    <el-pagination background :current-page="page.current" :page-size="page.pageSize" @current-change="currentChange" @size-change="sizeChange"
        :page-sizes="page.pageSizes" layout="sizes, prev, pager, next" :total="page.total "> </el-pagination>
  </div>
</template>

<script>
import {getSQL, getTotal} from './js/commonSql'
import {
    mapGetters
  } from "vuex";
export default {
    name: "sqlShow",
    props: ['query'],
    data() {
        return {
            loading:null,
            tableData: [],   // TableData
            attributes:[],
            page:{
                current:1,
                pageSize:20,
                pageSizes:[20, 50, 100, 200],
                total:0,
            },
            runningTime:"",

        }
    },
    computed: {
      ...mapGetters(["connection"]),
    },
    watch:{
        connection(newVal, oldVal){
            this.getData()
        }
    },
    created(){
        // console.log("query", this.query)
        // this.getPageTotal();
        this.getData();
    },
    methods: {
        backHome(){
            this.$emit('back')
        },
        getPageTotal(){
            getTotal(this.query.queryContent).then(res=>{
                this.page.total = res.data['total'];
            })
        },
        getData() {
            this.loading = true;
            getSQL(this.query.queryContent, this.page).then(res =>{
                if(this.attributes.length == 0){
                    for(let item in res.data["result"][0]){
                        this.attributes.push(item)
                    }
                }
                this.loading = false;
                this.runningTime = res.data["runningTime"]/1000 + 's';
                this.tableData = res.data["result"];
                if(this.tableData.length < this.page.pageSize){
                    this.page.total = this.page.current * this.page.pageSize - 1;
                }
                else{
                    this.page.total = this.page.current * this.page.pageSize + 1;
                }
                console.log("total",this.page.total)
            }).catch(()=>{
                this.loading = false;
            })
        },
        sizeChange(size){
            console.log("size", size)
            this.page.pageSize = size;
            this.getData();
        },
        currentChange(current){
            console.log("current", current)
            this.$set(this.page, 'current', current)
            this.getData()
        }
    }
}
</script>

<style scoped>

</style>