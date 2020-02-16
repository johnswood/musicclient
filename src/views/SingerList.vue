<template>
    <div>
        <router-link to="/singeradd">增加歌手</router-link><br>
        <el-form :inline="true" :model="search" class="demo-form-inline">

            <el-form-item label="姓名">
                <el-input v-model="search.name" placeholder="歌手姓名"  style="width:600px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateSingers">查找</el-button>
            </el-form-item>
        </el-form>
        <div style="float:left" v-for="singer in singers" :key="singer.singer_id">
            <singer v-bind="singer"></singer>
        </div>
    </div>

</template>


<script>
    import singer from '@/components/SimpleSinger.vue'

    export default {
        name: "singerList",
        data(){
            return {
                maxId:2,
                //baseurl:"http://www.shangzai.com:3000/singers/",
                baseurl:"http://localhost:3000/singers",
                dialogVisible:false,
                singer:{},
                singers:[],
                search:{name:''}
            }
        },
        mounted(){
            fetch(this.baseurl)
                .then(res=>res.json())
                .then(bs => this.singers = bs)
        },
        components: {
            singer
        },
        methods:{
            deleteSinger(singer){
                window.console.log(singer)

                //let request = require('request');
                let myurl = this.baseurl + "/" + singer.singer_id;

                fetch(myurl,{
                    method:"DELETE",
                    headers:{
                        "content-type": "application/json"
                    }
                }).then(res=>res.json())
                    .then(rs=>{
                        window.console.log(rs);
                        if(!rs.code) {
                            let index=this.singers.findIndex(item=>item.singer_id==singer.singer_id)
                            this.singers.splice(index,1)
                        }
                    })
            },
            addSinger(){
                fetch(this.baseurl,{
                    method:"POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.singer)
                }).then(res=>res.json())
                    .then(nb=>this.singers.push(nb))

            },
            updateSingers(){
                let url="";
                if(this.search.name){
                    url= this.baseurl + "?name=" + this.search.name
                } else {
                    url = this.baseurl;
                }
                fetch(url)
                    .then(res=>res.json())
                    .then(bs => this.singers = bs)
            },
            handleClose(){

            }

        }

    }
</script>
