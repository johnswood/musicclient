<template>
    <el-form :inline="true" :model="user" class="demo-form-inline">
        <el-form-item label="用户名">
            <el-input v-model="user.username" placeholder="用户名"  auto-complete="on" style="width:600px"></el-input>
        </el-form-item><br>
        <el-form-item label="密码">
            <el-input v-model="user.password" placeholder="密码" auto-complete="on" show-password style="width:600px"></el-input>
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
                    username:"",
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
                        window.console.log(raw)
                        if(raw){
                            this.$message("登录成功。")
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>