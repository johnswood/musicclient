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
        <router-link to="/useradd">增加用户</router-link><br>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="真实姓名与用户名">
                <el-input v-model="searchstr" placeholder="用户姓名"  style="width:600px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateUser">查找</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="users"
                style="width: 80%">
            <el-table-column
                    prop="user_id"
                    label="ID"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="用户名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="real_name"
                    label="真实姓名">
            </el-table-column>
            <el-table-column
                    prop="role_id"
                    label="角色">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="user">
                    <el-button @click="deleteUser(user.row)" type="text" size="small">删除</el-button>
                    <router-link tag="a" :to="'/useredit/'+ user.row.user_id">
                        <el-button  type="text" size="small">编辑</el-button>
                    </router-link>

                </template>
            </el-table-column>

        </el-table>
    </div>

</template>

<script>
    // import _ from 'lodash'

    export default {
        name: "UserList",
        data(){
            return {
                searchstr:"",
                user:{user_id:'',user_name:''},
                baseurl:"http://localhost:3000/users",
                dialogVisible:false,
                msg:"成功",
                users:[]
            }
        },
        mounted(){
            fetch(this.baseurl)
                .then(res=>res.json())
                .then(bs => this.users = bs)
        },
        methods:{
            deleteUser(user){

                //let request = require('request');
                let myurl = this.baseurl + "/" + user.user_id;

                fetch(myurl,{
                    method:"DELETE",
                    headers:{
                        "content-type": "application/json"
                    }
                }).then(res=>res.json())
                    .then(rs=>{
                        window.console.log(rs);
                        if(!rs.code) {
                            let index=this.users.findIndex(item=>item.user_id==user.user_id)
                            this.users.splice(index,1)
                        }
                    })


            },
            updateUser(){
                let url="";
                if(this.searchstr){
                    url = this.baseurl + "?name=" + this.searchstr
                } else {
                    url = this.baseurl;
                }
                fetch(url)
                    .then(res=>res.json())
                    .then(bs => this.users = bs)
            },

            handleClose(){

            }

        },
        computed:{
            getEditUrl(user){
                return "/useredit/"+ user.user_id
            }
        }
    }
</script>

<style scoped>

</style>