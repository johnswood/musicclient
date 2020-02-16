<template>
    <div>
        <el-row>
            <el-col :span="18">
                <div align="center">
                    <h2>{{singer.singer_name}}</h2>
                </div>
                <div align="left">
                    <span>地区：{{singer.area}}</span><br>
                    <span>生日：{{birthday}}</span><br>
                    <span>性别：{{sex}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                <el-image
                        style="width: 200px; height: 200px; object-fit: contain"
                        :src="picurl"></el-image>
            </el-col>
            <el-row>
                <el-col :span="24">
                    <span>
                    <b>介绍：</b><br>{{singer.comment}}
                    </span>
                </el-col>
            </el-row>

        </el-row>
        <br><br>
        <el-row>
            <div>

            </div>
            <router-link tag="a" :to="{path:'/singeredit/' + this.singer.singer_id}">
                <el-button  size="small">编辑</el-button>
            </router-link>
        </el-row>

<!--        <el-row>-->
<!--            <div  id="divedit" style="display: none;">-->
<!--                <EditSinger v-bind:myid="id" v-bind:singer="this.singer"></EditSinger>-->
<!--            </div>-->
<!--        </el-row>-->

    </div>

</template>

<script>
    //import EditSinger from "./EditSinger";
    export default {
        name: "DetailSinger",
        //components: {EditSinger},
        data() {
            return {
                "baseurl": "http://localhost:3000",
                "singer":{},
                id:0,
                myStatus: true
            }
        },
        created(){
            this.id= this.$route.params.id;
        },
        mounted(){
            fetch(this.baseurl + "/singers/" + this.id)
                .then(res=>res.json())
                .then(bs => {
                    this.singer = bs[0]
                })
        },
        methods:{
            showEdit(){
                window.open("/singeredit/" + this.singer.singer_id);

            }
        },
        computed:{
            birthday(){
                var dd = new Date(this.singer.birthday)
                return dd.toLocaleDateString();
            },
            picurl(){
                return this.baseurl + this.singer.photo;
            },
            sex(){
                if(this.singer.sex) return "男";
                else return "女";
            }
        }
    }

</script>

<style scoped>

</style>