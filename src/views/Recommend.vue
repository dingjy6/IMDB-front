<template>
  <div v-if="!detailShow">
    <h3 v-if="!recommendShow" style="font-family:baby-night;font-size:50px;display:inline;margin-right:20px;font-weight:100;">Recommend</h3>
    <h3 v-else style="font-family:baby-night;font-size:50px;display:inline;margin-right:20px;font-weight:100;">You may like</h3>
    <el-button style="margin-left:10px" v-if="recommendShow"  @click="recommendShow = false" class="search-btn" size="mini" icon="el-icon-back"></el-button>
    <span v-else class="tips">Please double click table rows to select 3 movies for us to recommend similar high rating movies!</span>
    <span style="float:right">Running Time:{{runningTime}}</span>
    <div>
        <el-select multiple size="small" style="width:400px" v-model="selectedTitle" placeholder="Double click table rows to select movies"></el-select>
        <el-button style="margin-left:10px"  @click="toRecommand" class="search-btn" size="mini" type="primary" icon="el-icon-magic-stick">Recommand</el-button>
    </div>
    <div v-if="!recommendShow">
    <el-row class="search-bar">
      <el-col :span="8">
        <el-form  label-position="left" label-width='120px'>
            <el-form-item v-if="index % 3 == 0" v-for="(item, index) in attributes" :key="index" label="item">
                <el-input size="small" clearable style="width:200px" v-model="search[item]" placeholder="Please input search keywords"></el-input>
            </el-form-item>  
            <el-form-item label="genres">
                <el-select multiple size="small" clearable style="width:250px" v-model="search.genres" placeholder="Please select keywords">
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
        <el-button style="margin-top:8px"  @click="toSearch" class="search-btn" size="mini" type="primary" icon="el-icon-search">Search</el-button>
      </el-col>
      <el-col :span="8">
        <el-form  label-position="left" label-width='120px'>
            <el-form-item v-if="index % 3 == 2" v-for="(item, index) in attributes" :key="index" :label="item">
                <el-input size="small" clearable style="width:200px" v-model="search[item]" placeholder="Please input search keywords"></el-input>
            </el-form-item>       
        </el-form>
      </el-col>
    </el-row>
    <el-table  @row-dblclick="selectRow" align="center" v-loading="loading" height="400" :data="tableData">
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
    <el-table v-else @ align="center" v-loading="recommendLoading" height="500" :data="recommendData">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column v-for="(item, index) in recommendAttributes" :key="index" :label="item" :prop="item"></el-table-column>
    </el-table>
  </div>
  <movie-detail v-else :movieData='detail' @back="detailShow = false">
    </movie-detail>
</template>

<script>
import {getMovie, getMovieDetail, getGenres, recommendMovies} from './js/commonSql'
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
            selectedTitle:[],
            selectedData:[],
            detailShow:false,
            recommendShow:false,
            recommendLoading:false,
            loading:null,
            tableData: [[]],   // TableData
            recommendData:[],
            recommendAttributes:['match_tid', 'primaryTitle', 'final_score'],
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
            if(this.recommendShow){
                this.getRData();
            }
            else{
                this.getData();
            }
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
        handleRClick(){

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
        toRecommand(){
            this.recommendShow = true;
            if(this.selectedTitle.length != 3){
                this.$message.warning("Please select only and not noly 3 movies!");
                return;
            }
            this.getRData();
        },
        getRData(){
            this.recommendLoading = true;
            var tids = []
            for(let j = 0; j < this.selectedTitle.length; j++){
                let item = this.selectedTitle[j]
                console.log(item)
                for(let i = 0; i < this.selectedData.length; i++){
                    if(this.selectedData[i].primaryTitle == item){
                        tids.push(this.selectedData[i].tid)
                        console.log(tids)
                    }
                }
            }
            recommendMovies(tids).then(res=>{
                this.recommendData = res.data["result"];
                this.runningTime = res.data["runningTime"]/1000 + 's';
                this.recommendLoading = false;
            })
        },
        selectRow(row, col, event){
            console.log("select", row)
            this.selectedData.push(row);
            this.selectedTitle.push(row.primaryTitle)
        },
    }
}
</script>

<style scoped>
.tips{
    color: gray;
    font-style: italic;
    font-size: 0.9rem;
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
/deep/.el-rate__icon{
    font-size: 8pt;
}
.name-tag{
    margin-right: 5px;
}
</style>