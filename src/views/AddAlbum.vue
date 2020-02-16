<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{msg}}</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
        </el-dialog>
        <h1>增加专辑</h1>
        <el-form :inline="true" :model="album" class="demo-form-inline">
            <el-form-item label="专辑名" type="String">
                <el-input v-model="album.album_name" placeholder="请输入专辑名" style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="歌手">
                <el-select
                        v-model="album.singers"
                        value-key="singer_id"
                        multiple
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入歌手名字"
                        :remote-method="remoteMethod"
                        style="width:600px"
                        :loading="loading">
                    <el-option
                            v-for="item in options"
                            :key="item.singer_id"
                            :label="item.singer_name"
                            :value="item">
                    </el-option>
                </el-select>

            </el-form-item><br>
            <el-form-item label="发行日期">
                <el-date-picker
                        v-model="album.issue_date"
                        type="date"
                        placeholder="请输入发行日期"
                        style="width:600px"
                >
                </el-date-picker>
            </el-form-item><br>
            <el-form-item label="公司" type="String" >
                <el-input v-model="album.company" placeholder="请输入专辑公司" style="width:600px"></el-input>
            </el-form-item><br>
            <span><h3>歌曲</h3></span>
            <el-form-item>
                <el-table
                        :data="album.songs"
                        style="width: 600px">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column label="ID" width="90">
                        <template slot-scope="scope" >
                            <el-form-item  :prop="'songs.' + scope.$index + '.song_id'" >
                                <el-input  v-model="scope.row.song_id" size="small" ></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column width="310"
                            label="歌曲名"
                            >
                        <template slot-scope="scope" >
                            <el-form-item  :prop="'songs.' + scope.$index + '.song_name'" >
                                <el-input  v-model="scope.row.song_name" size="small" style="width:300px"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column width="80px"
                            label="时长">
                        <template slot-scope="scope" >
                            <el-form-item  :prop="'songs.' + scope.$index + '.time'" >
                                <el-input  v-model="scope.row.time" size="small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="50px">
                        <template slot-scope="scope">
                            <el-button @click="removeSong(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-form-item><br>
            <el-form-item>
                <el-button @click="addSong">新增歌曲</el-button>
            </el-form-item><br>
            <el-form-item label="备注" type="String">
                <el-input v-model="album.comment" placeholder="说明"
                          type="textarea"  style="width:600px"
                ></el-input>
            </el-form-item><br>
            <el-form-item>
                <el-button type="primary" @click="addAlbum">确定</el-button>
            </el-form-item>
        </el-form>
        <div v-if="this.album.album_id">
            <upload v-bind:id="this.album.album_id" v-bind:path="'album'" v-bind:curUrl="this.album.photo"></upload>
        </div>
    </div>
</template>

<script>
    import upload from "../components/MyUpload"
    export default {
        name: "AddAlbum",
        components:{upload},
        data(){
            return {
                album: {
                    ablum_id:0,
                    album_name:"",
                    singers:[{
                        singer_id:0,
                        singer_name:""
                    }],
                    issue_date:"",
                    company:"",
                    comment:"",
                    songs:[{
                        song_id:0,
                        song_name:"",
                        time: 0
                    }]
                },
                loading: false,
                options:[],
                singerurl: "http://localhost:3000/singers/query",
                albumurl: "http://localhost:3000/albums",
                dialogVisible: false,
                msg: "添加专辑成功。"
            }
        },
        methods:{
            removeSong(item){
                var index = this.album.songs.indexOf(item)
                if (index !== -1) {
                    this.album.songs.splice(index, 1)
                }
            },
            addSong(){
                this.album.songs.push({
                    song_id:0,
                    song_name:"",
                    time: 0
                })
            },
            removeSinger(item){
                var index = this.album.singers.indexOf(item)
                if (index !== -1) {
                    this.album.singers.splice(index, 1)
                }
            },
            addSinger(){
                this.album.singers.push({
                    singer_id:0,
                    singer_name:""
                })
            },
            remoteMethod(queryString) {
                if (queryString !== '') {
                    let url = this.singerurl + "?name=" + queryString;
                    //window.console.log("url=%s",url)
                    this.loading = true;
                    //let list;
                    setTimeout(() => {
                        this.loading = false;
                        fetch(url)
                            .then(res=>res.json())
                            .then(bs => {
                                this.options = [];
                                for(let item of bs){
                                    let a={"singer_id":item.singer_id, "singer_name": item.singer_name}
                                    this.options.push(a);

                                }

                            })

                    }, 500);
                } else {
                    this.options = [];
                }

                // 调用 callback 返回建议列表的数据

            },
            addAlbum(){
                let url = this.albumurl;
                fetch(url,{
                    method:"POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.album)
                }).then(res=>res.json())
                    .then(raw=>{
                        window.console.log("raw respone = " + raw.toString())
                        this.album = raw;
                        this.msg = "成功添加数据";
                        this.dialogVisible= true;
                    })

            },
            handleClose(){

            }
        }
    }
</script>

<style scoped>

</style>