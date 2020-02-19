<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{msg}}</span>
            <span slot="footer" class="dialog-footer">
                <router-link tag="a" :to="{path:'/albumlist'}">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </router-link>
            </span>
        </el-dialog>
        <el-row>
            <el-col :span="6"><div align="left">
                <el-image
                        style="width: 200px; height: 200px; object-fit: contain"
                        :src="picurl"></el-image><br>
                <span><p>公司：{{album.company}}</p></span><br>
                <span>发行日期：{{issuedate}}</span><br>
                <div class ="text-wrapper"><p >说明：<br>{{album.comment}}</p></div>
            </div>
            </el-col>
            <el-col :span="18"><div align ="left">
                <span><h3>{{album.album_name}}</h3></span><br>
                <span><h3>歌手：</h3></span>
                <div  v-for="singer in album.singers" :key="singer.singer_id">
                    <div style="float:left">{{singer.singer_name}}</div><span>,</span>
                </div>
                <span><h3>歌曲</h3></span>

                <div>
                    <el-table
                            :data="album.songs"
                            style="width: 80%">
                        <el-table-column
                                label="序号"
                                type="index"
                                width="180">
                        </el-table-column>
                        <el-table-column prop="song_name" label="歌曲名"  width="300">


                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="歌曲时长"
                                width="200">
                        </el-table-column>
                    </el-table>
                </div>

            </div>
            </el-col>
        </el-row>
        <el-row>
            <div>

            </div>
            <router-link tag="a" :to="{path:'/albumedit/' + this.album.album_id}">
                <el-button  size="small">编辑</el-button>
            </router-link>

            <el-button  @click="deleteAlbum" size="small">删除</el-button>

        </el-row>
    </div>

</template>

<script>
    export default {
        name: "DetailAlbum",
        props: {

        },
        data() {
            return {
                "baseurl": "http://localhost:3000",
                "album":{},
                id:0,
                dialogVisible: false,
                msg: "成功更新",
            }
        },
        created(){
            this.id= this.$route.params.id;
        },
        mounted(){
            fetch(this.baseurl + "/albums/" + this.id)
                .then(res=>res.json())
                .then(bs => {
                    this.album = bs[0]
                })
        },
        methods:{
            deleteAlbum(){
                let url = this.baseurl + "/albums/" + this.id
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
            issuedate(){
                var dd = new Date(this.album.issue_date)
                return dd.toLocaleDateString();
            },
            picurl(){
                return this.baseurl + this.album.photo;
            }
        }
    }
</script>

<style scoped>
.aaa{
    text-align:left
}
.text-wrapper {
    white-space: pre-wrap;
    text-align: left;
}
</style>