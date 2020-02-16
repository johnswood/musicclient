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
        <h1>修改用户信息</h1>
        <el-form :inline="true" :model="myuser" class="demo-form-inline" size="small">
            <el-form-item label="ID">
                <el-input v-model="myuser.user_id" placeholder="用户ID" :readonly="true"></el-input>
            </el-form-item><br>
            <el-form-item label="用户名">
                <el-input v-model="myuser.user_name" placeholder="用户名"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="真实姓名">
                <el-input v-model="myuser.real_name" placeholder="真实姓名"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="密码">
                <el-input v-model="myuser.password" placeholder="口令"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="手机号码">
                <el-input v-model="myuser.mobile" placeholder="13911112222"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="电子邮件">
                <el-input v-model="myuser.email" placeholder="myname@mycompany.com"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="是否管理员">
                <el-radio v-model="myuser.role_id" label="normal">普通用户</el-radio>
                <el-radio v-model="myuser.role_id" label="admin">管理员</el-radio>
            </el-form-item><br>

            <el-form-item>
                <el-button type="primary" @click="UpdateUser">修改用户</el-button>
            </el-form-item>
        </el-form>
        <div v-if="this.myuser.user_id">
            <upload v-bind:id="this.myuser.user_id" v-bind:path="'user'" v-bind:curUrl="myuser.photo"></upload>
        </div>

    </div>
</template>
<script>
    import upload from "../components/MyUpload"
    export default {
        name: "AddUser",
        components:{
            upload
        },
        data(){
            return {
                myuser: {
                    user_id:0,
                    photo:""
                },
                dialogVisible: false,
                msg: "增加歌手成功",
                baseurl: "http://localhost:3000/users",
                basephoto: "http://localhost:3000"
            }
        },
        created(){
            this.id= this.$route.params.id;
        },
        mounted(){
            fetch(this.baseurl + "/" + this.id)
                .then(res=>res.json())
                .then(bs => {
                    this.myuser = bs[0]
                    window.console.log("myuser = " + bs[0].toString())
                })
        },
        methods:{
            UpdateUser(){
                let url = this.baseurl
                fetch(url,{
                    method:"PUT",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.myuser)
                }).then(res=>res.json())
                    .then(raw=>{
                        if(raw.ok) {
                            this.msg = "成功更新" + raw.nModified + "条数据";
                            this.dialogVisible= true;
                            // for (let item in this.mysinger){
                            //     this.singer[item] = this.mysinger[item]
                            // }
                        }
                    })

            },
            handleClose(){

            }

        },
        computed:{

        }
    }
</script>

<style scoped>

</style>