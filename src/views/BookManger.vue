<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>


        <h1>Albums Manager</h1>
        <el-form :inline="true" :model="album" class="demo-form-inline">
            <el-form-item label="ID">
                <el-input v-model="album.album_id" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item label="Album Name">
                <el-input v-model="album.album_name" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item label="图书价格">
                <el-input v-model.number="album.price" type="number" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addAlbum">添加图书</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="albums"
                style="width: 80%">
            <el-table-column
                    prop="album_id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="album_name"
                    label="Album Name"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="图书价格">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="album">
                    <el-button @click="deleteAlbum(album.row)" type="text" size="small">删除</el-button>
                    <el-button @click="dialogVisible=true" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
        <h2>总价格： {{priceTotal}}</h2>

    </div>
</template>

<script>
    // import _ from 'lodash'

    export default {
        name: "AlbumManger",
        data(){
            return {
                maxId:2,
                album:{name:'',price:''},
                //baseurl:"http://www.shangzai.com:3000/albums/",
                baseurl:"http://localhost:3000/albums",
                dialogVisible:false,
                albums:[{id:1,name:"album1",price:200},
                    {id:2,name:"album2",price:230}]
            }
        },
        mounted(){
            fetch(this.baseurl)
                .then(res=>res.json())
                .then(bs => this.albums = bs)
        },
        methods:{
            deleteAlbum(album){
                window.console.log(album)

                //let request = require('request');
                let myurl = this.baseurl + "/" + album.album_id;

                fetch(myurl,{
                    method:"DELETE",
                    headers:{
                        "content-type": "application/json"
                    }
                }).then(res=>res.json())
                    .then(rs=>{
                        window.console.log(rs);
                        if(!rs.code) {
                            let index=this.albums.findIndex(item=>item.album_id==album.album_id)
                            this.albums.splice(index,1)
                        }
                    })


            },
            addAlbum(){
                // this.album.album_id=++this.maxId
                // let bk=_.cloneDeep(this.album)
                // this.albums.push(bk)
                // var request = require('request');
                // request({
                //     url: "http://localhost:3000/albums/add",
                //     method: "PUT",
                //     json: true,
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: this.album
                // }, function(error, response) {
                //     if (!error && response.statusCode == 200) {
                //         fetch("http://localhost:3000/albums")
                //             .then(res=>res.json())
                //             .then(bs => this.albums = bs);
                //         alert("Add album Successful.");
                //     } else {
                //         alert("Add album Error.")
                //     }
                // });
                fetch(this.baseurl,{
                    method:"POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.album)
                }).then(res=>res.json())
                .then(nb=>this.albums.push(nb))

            },
            handleClose(){

            }

        },
        computed:{
            priceTotal(){
                return this.albums.reduce((prev,album)=>prev+album.price,0)
            }
        }
    }
</script>

<style scoped>

</style>