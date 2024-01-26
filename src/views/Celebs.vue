<template>
  <div>
    <h3 style="font-family:baby-night;font-size:50px;display:inline;margin-right:20px;font-weight:100;">Celebrities</h3>
    <el-button  @click="toSearch" class="search-btn" size="mini" type="primary" icon="el-icon-search">Search</el-button>
    <span style="float:right">Running Time:{{runningTime}}</span>
    <el-row class="search-bar">
      <el-col :span="8">
        <el-form  label-position="left" label-width='120px'>
            <el-form-item v-if="index % 3 == 0" v-for="(item, index) in attributes" :key="index" :label="item">
                <el-input size="small" clearable style="width:200px" v-model="search[item]" placeholder="Please input search keywords"></el-input>
            </el-form-item>       
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form  label-position="left" label-width='120px'>
            <el-form-item v-if="index % 3 == 1" v-for="(item, index) in attributes" :key="index" :label="item">
                <el-input size="small" clearable style="width:200px" v-model="search[item]" placeholder="Please input search keywords"></el-input>
            </el-form-item>       
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form  label-position="left" label-width='120px'>
            <el-form-item v-if="index % 3 == 2" v-for="(item, index) in attributes" :key="index" :label="item">
                <el-input size="small" clearable style="width:200px" v-model="search[item]" placeholder="Please input search keywords"></el-input>
            </el-form-item>       
        </el-form>
      </el-col>
    </el-row>
    <el-table v-loading="loading" height="420" :data="tableData">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column v-for="(item, index) in attributes" :key="index" :label="item" :prop="item"></el-table-column>
      <el-table-column fixed="right"  width="100" label="Option">
        <template slot-scope="scope">
            <el-button type="info" icon="el-icon-search" size="mini" @click="handleClick(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :current-page="page.current" :page-size="page.pageSize" @current-change="currentChange" @size-change="sizeChange"
        :page-sizes="page.pageSizes" layout="sizes, prev, pager, next" :total="page.total "> </el-pagination>
    <el-dialog :visible.sync="detailShow">
        <div>
            <h3 class="name-title">{{detail.primaryName}}</h3>
            <el-form style="padding-top:50px" v-loading="detailLoading" label-position="left" label-width='140px'>
                <el-form-item v-for="(item, index) in attributes" :key="index" :label="item">
                    <el-input readonly size="small" clearable style="width:200px" v-model="detail[item]" ></el-input>
                </el-form-item>
                <el-form-item  label="primaryProfession">
                    <el-tag class="name-tag" v-for="item in detail.primaryProfession" type="primary" size="small">{{item}}</el-tag>
                </el-form-item>
                <el-form-item  label="knownForTitle">
                   <el-tag class="name-tag" v-for="item in detail.knownForTitle"  type="primary" size="small">{{item}}</el-tag>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {getName, getNameDetail} from './js/commonSql'
  import {
    mapGetters
  } from "vuex";
export default {
    name: "sqlShow",
    props: ['query'],
    data() {
        return {
            detailShow:false,
            detailLoading:false,
            loading:null,
            tableData: [[]],   // TableData
            attributes:['nid','primaryName','birthYear','deathYear'],
            page:{
                current:1,
                pageSize:20,
                pageSizes:[20, 50, 100, 200],
                total:0,
            },
            search:{},
            detail:{},
            runningTime:"",

        }
    },
    computed: {
      ...mapGetters(["connection"]),
    },
    watch:{
        connection(newVal, oldVal){
            console.log("connextion changed", newVal)
            this.getData();
        }
    },
    created(){
        this.getData();
    },
    methods: {
        handleClick(row){
            console.log("connection", this.connection)
            this.detail = row;
            if(this.connection == 'mysql'){
                this.getDetailData();
                this.detailLoading = true;
            }
            else{
                this.detail['knownForTitle'] = this.detail['knownForTitles']
            }
            this.detailShow = true;
        },
        getDetailData(){
            // this.detail['knownForTitle'] = ['GodFather','Titanic','Wonderland']
            // this.detail['primaryProfession'] = ['director', 'actress']
            getNameDetail(this.detail.nid).then(res=>{
                this.detail['knownForTitle'] = res.data['knownForTitle']
                this.detail['primaryProfession'] = res.data['primaryProfession']
                this.detailLoading = false;
            })
        },
        toSearch(){
            for(let item in this.search){
                if(this.search[item] == ""){
                    delete this.search[item];
                }
            }
            this.page.current = 1; 
            this.getData()
        },
        getPageTotal(){
            getTotal(this.query.queryContent).then(res=>{
                this.page.total = res.data['total'];
            })
        },
        getData() {
            this.loading = true;
            getName(this.search, this.page).then(res =>{
                // if(this.attributes.length == 0){
                //     for(let item in res.data["result"][0]){
                //         this.attributes.push(item)
                //     }
                // }
                this.loading = false;
                this.runningTime = res.data["runningTime"]/1000 + 's';
                this.tableData = res.data["result"];
                if(this.tableData < this.page.pageSize){
                    this.page.total = this.page.current * this.page.pageSize - 1;
                }
                else{
                    this.page.total = this.page.current * this.page.pageSize + 1;
                }
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
        },
        selectData(){
            this.$refs.form.validate((valid) =>{
                if(valid){
                    let {id,name,sex} = this.formData;
                    selectUser(id, name, sex).then(res => {
                        this.tableData = res.data;
                    })
                }
            })
        },
        delData(index, row){
            index += 1;
            this.$confirm("是否删除第" + index + "行数据吗？").then(res =>{
                delUser(row.id).then(res =>{
                    this.$message.error("删除成功!")
                    this.getData();
                })
            })
        },
    }
}
</script>

<style scoped>
.name-title{
    font-family:baby-night;
    position: absolute;
    top: -40px;
    left: 5%;
    z-index: 999;
    font-size: 66px;
    color: black;
    font-weight:100;
}
.search-bar{
    margin-bottom: 20px;
}
.form {
    width:40%;
}
.search-btn{
    position: relative;
    margin-top: -550px;
}
.inline-head{
    display: inline-block;
}
/deep/.el-form-item{
   margin-bottom: 0;;
} 
.name-tag{
    margin-right: 5px;
}
</style>