<template>
    <el-form :inline="true" :model="user" class="demo-form-inline">
        <el-form-item label="用户名">
            <el-input v-model="user.user_name" placeholder="用户名"  style="width:600px"></el-input>
        </el-form-item><br>
        <el-form-item label="密码">
            <el-input v-model="user.password" placeholder="密码"  style="width:600px"></el-input>
        </el-form-item><br>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item><br>
        <router-link tag="a" to="/registerUser">注册新用户</router-link>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                user:{
                    user_name:"",
                    password:""
                },
                baseurl:"http://localhost:3000/login"
            }
        },
        methods:{
            login(){
                fetch(this.baseurl,{
                    method:"POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.user)
                }).then(res=>res.json())
                    .then(raw=>{
                        if(raw.ok) {
                            this.msg = "成功更新" + raw.nModified + "条数据";
                            this.dialogVisible= true;
                            for (let item in this.mysinger){
                                this.singer[item] = this.mysinger[item]
                            }
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>