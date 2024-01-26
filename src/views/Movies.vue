<template>
  <div v-if="!detailShow">
    <h3 style="font-family:baby-night;font-size:50px;display:inline;margin-right:20px;font-weight:100;">Movies</h3>
    <el-button  @click="toSearch" class="search-btn" size="mini" type="primary" icon="el-icon-search">Search</el-button>
    <span style="float:right">Running Time:{{runningTime}}</span>
    <el-row class="search-bar">
      <el-col :span="8">
        <el-form  label-position="left" label-width='120px'>
            <el-form-item v-if="index % 3 == 0" v-for="(item, index) in attributes" :key="index" :label="item">
                <el-input size="small" clearable style="width:200px" v-model="search[item]" placeholder="Please input search keywords"></el-input>
            </el-form-item>  
            <el-form-item label="genres">
                <el-select multiple size="small" clearable style="width:300px" v-model="search.genres" placeholder="Please select keywords">
                    <el-option v-for="item in genresOption" :label="item['genres']" :value="item['genres']"></el-option>
                </el-select>
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

    <el-table align="center" v-loading="loading" height="420" :data="tableData">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column v-for="(item, index) in attributes" :key="index" :label="item" :prop="item"></el-table-column>
      <el-table-column width="230"   label="averageRating" prop="averageRating">
        <template slot-scope="scope">
            <el-rate class="name-tag" :max="10" v-if="scope.row.averageRating"  show-score v-model="scope.row.averageRating" disabled score-template="{value}"></el-rate>
            <span v-else>{{scope.row.averageRating}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="genres" prop="genres">
        <template slot-scope="scope">
            <el-tag class="name-tag" v-for="(item,index) in scope.row.genres" :key="index" type="info" size="small">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right"  width="100" label="Option">
        <template slot-scope="scope">
            <el-button type="info" icon="el-icon-right" size="mini" @click="handleClick(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :current-page="page.current" :page-size="page.pageSize" @current-change="currentChange" @size-change="sizeChange"
        :page-sizes="page.pageSizes" layout="sizes, prev, pager, next" :total="page.total "> </el-pagination>
  </div>
  <movie-detail v-else :movieData='detail' @back="detailShow = false">
    </movie-detail>
</template>

<script>
import {getMovie, getMovieDetail, getGenres} from './js/commonSql'
import movieDetail from'./MoviesDetail.vue'
import {
    mapGetters
  } from "vuex";
export default {
    components: {
        movieDetail
    },
    name: "movie",
    data() {
        return {
            detailShow:false,
            detailLoading:false,
            loading:null,
            tableData: [[]],   // TableData
            attributes:['tid','primaryTitle','startYear'],
            page:{
                current:1,
                pageSize:20,
                pageSizes:[20, 50, 100, 200],
                total:0,
            },
            genresOption:[],
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
        this.getAllGenres();
        this.getData();
    },
    methods: {
        getAllGenres(){
            getGenres().then(res=>{
                this.genresOption = res.data.result;
                console.log("genre", this.genresOption)
            })
        },
        handleClick(row){
            console.log("connection", this.connection)
            this.detail = row;
            this.detailShow = true;
            this.detailLoading = true;
        },
        getDetailData(){
            // this.detail['knownForTitle'] = ['GodFather','Titanic','Wonderland']
            // this.detail['primaryProfession'] = ['director', 'actress']
            getMovieDetail(this.detail.nid).then(res=>{
                this.detail['knownForTitle'] = res.data['knownForTitle']
                this.detail['primaryProfession'] = res.data['primaryProfession']
                this.detailLoading = false;
            })
        },
        toSearch(){ 
            this.page.current = 1;        
            this.getData()
        },
        getPageTotal(){
            getTotal(this.query.queryContent).then(res=>{
                this.page.total = res.data['total'];
            })
        },
        getData() {
            for(let item in this.search){
                if(this.search[item] == "" || this.search[item].length == 0){
                    delete this.search[item];
                }
            }   
            this.loading = true;
            getMovie(this.search, this.page).then(res =>{
                this.loading = false;
                this.runningTime = res.data["runningTime"]/1000 + 's';
                this.tableData = res.data["result"];
                this.tableData.forEach(item=>{
                    if(item["genres"])
                        this.$set(item, 'genres', item["genres"].split(','))
                })
                console.log("res",this.tableData)
                if(this.tableData.length < this.page.pageSize){
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
/deep/.el-rate__icon{
    font-size: 8pt;
}
.name-tag{
    margin-right: 5px;
}
</style>