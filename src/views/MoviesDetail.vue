<template>
  <div>
    <el-button icon="el-icon-back" size="small" @click="backHome"></el-button>
    <div><h3 class="decorate-title" style="display:inline;margin-right:20px;">{{movieData.primaryTitle}}</h3></div>
    
    <!-- <el-button  @click="toSearch" class="search-btn" size="mini" type="primary" icon="el-icon-search">Search</el-button> -->
    <span style="float:right">Running Time:{{runningTime}}</span>
        <el-descriptions v-for="(item,index) in attributes"  :title="item.header">
            <el-descriptions-item v-for="(ditem,dindex) in item.content"  :label="ditem">{{movieData[ditem]}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions v-loading="loading" class="no-label-class" v-for="(item,index) in multiAttris"  :title="item.header">
            <el-descriptions-item>
                <template slot="label"></template>
                <el-table align="center" v-loading="loading" :data="movieData[item.header]">
                    <el-table-column v-for="(ditem, dindex) in item.content"  :label="ditem" :prop="ditem"></el-table-column>
                </el-table>
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions v-loading="loading"  title="Reviews" class="no-label-class">
            <el-descriptions-item>
                <div style="display:flex;flex-direction:row;flex-wrap: wrap;">
                    <el-card v-for="(item, index) in movieData.Reviews" style="width:400px;margin-right:20px;margin-bottom:10px">
                        <div slot="header">
                            <span style="font-weight:bold;font-size:1.2em">{{item.reviewerName}}</span>
                            <span style="float:right;padding-top:5px;color:gray;font-size:0.9em">{{item.reviewDate.slice(0,10)}}</span>
                        </div>
                        <div style="font-style:italic;color:gray;font-weight:1">
                            {{item.reviews}}
                        </div>
                    </el-card>
                </div>
            </el-descriptions-item>
        </el-descriptions>
  </div>
</template>

<script>
import {getMovie, getMovieDetail, getGenres,getReviewCasts} from './js/commonSql'
  import {
    mapGetters
  } from "vuex";
export default {
    name: "movieDetail",
    props: ['movieData'],
    data() {
        return {
            detailShow:false,
            detailLoading:false,
            loading:null,
            tableData: [[]],   // TableData
            attributes:[
                {
                    header:'Basic Info', content:['tid', 'startYear', 'runtimeMinutes','averageRating','numVotes','genres']
                },
                {
                    header:'Profit', content:['budget', 'Gross US & Canada', 'Opening weekend US & Canada','grossWorldwide']
                },
            ],
            multiAttris:[
                {
                    header:'Casts', content:['primaryName', 'category', 'characters']
                },
                {
                    header:'AKAs', content:['title', 'region', 'language','types']
                },
            ],
            activeName:['Basic Info','Profit'],
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
        }
    },
    created(){
        console.log("movieData", this.movieData)
        if(this.connection == 'mysql')
            this.getDetailData();
        else{
            this.movieData["AKAs"] = this.movieData["akas"]
            this.movieData["Casts"] = this.movieData["principal"]
            this.movieData["grossWorldwide"] = this.movieData["Gross worldwide"]
            this.getMongoReview();

        }
    },
    methods: {
        backHome(){
            this.$emit('back')
        },
        handleClick(row){
            console.log("connection", this.connection)
            this.detail = row;
            if(this.connection == 'mysql'){
                this.getDetailData();
            }
            this.detailShow = true;
            this.detailLoading = true;
        },
        getDetailData(){
            this.loading = true;
            getMovieDetail(this.movieData.tid).then(res=>{
                Object.assign(this.movieData, res.data)
                this.runningTime = res.data["runningTime"]/1000 + 's';
                this.loading = false;
            })
        },
        getMongoReview(){
            this.loading  = true;
            let nids = [];
            console.log(this.movieData.principal)
            this.movieData.principal.forEach(item=>{
                console.log(item)
                nids.push(item.nid)
            })
            getReviewCasts(this.movieData.ReviewIDs, nids).then(res=>{
                console.log(res)
                var reviewData = res.data["reviewResult"];
                for(let i = 0; i < reviewData.length; i++){
                    let item = {}
                    item = reviewData[i]
                    item["reviewerName"] = item["reviewer_name"];
                    item["reviewDate"] = item["review_date"]
                }
                this.movieData.Reviews = reviewData;
                var castData = res.data["castResult"];
                for(let i = 0; i < this.movieData.Casts.length; i++){
                    let row = this.movieData.Casts[i]
                    for(let j = 0; j < castData.length; j++){
                        if(row.nid == castData[j].nid){
                            this.$set(row, 'primaryName', castData[j].primaryName)
                            break;
                        }
                    }
                }
                console.log("movies",this.movieData)
                this.loading  = false;
                this.runningTime = res.data["runningTime"]/1000 + 's';
            })
        },
        toSearch(){
            for(let item in this.search){
                if(this.search[item] == "" || this.search[item].length == 0){
                    delete this.search[item];
                }
            }    
            this.page.current = 1;        
            this.getData()
        },
    }
}
</script>

<style scoped>

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
/deep/.no-label-class .el-descriptions-item__label.has-colon::after{
    display: none;
}
</style>