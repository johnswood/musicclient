<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{msg}}</span>
            <span slot="footer" class="dialog-footer">
<!--                <el-button @click="dialogVisible = false">取 消</el-button>-->
                <router-link tag="a" :to="{path:'/singerlist'}">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </router-link>
            </span>
        </el-dialog>
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
                    <div class="text-wrapper">
                    <b>介绍：</b><br>{{singer.comment}}
                    </div>
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

                <el-button  @click="deleteSinger" size="small">删除</el-button>

        </el-row>


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
                myStatus: true,
                dialogVisible: false,
                msg: "成功更新",
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
            deleteSinger() {

                let url = this.baseurl + "/singers/" + this.singer.singer_id
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    }
                }).then(res => res.json())
                    .then(raw => {
                        if(raw){
                            this.msg = "成功删除歌手";
                            this.dialogVisible = true;
                        }

                    })
            },
            handleClose(){

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
    .text-wrapper {
        white-space: pre-wrap;
        text-align: left;
    }
</style>