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
        <h1>增加歌手</h1>
        <el-form :inline="true" :model="mysinger" class="demo-form-inline" size="small">
<!--            <el-form-item label="ID">-->
<!--                <el-input v-model="mysinger.singer_id" placeholder="歌手ID" ></el-input>-->
<!--            </el-form-item><br>-->
            <el-form-item label="姓名">
                <el-input v-model="mysinger.singer_name" placeholder="歌手姓名"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="生日">
                <el-date-picker
                        v-model="mysinger.birthday"
                        type="date"
                        placeholder="选择生日"
                        style="width:600px"
                >
                </el-date-picker>
            </el-form-item><br>
            <el-form-item label="地区">
                <el-input v-model="mysinger.area" placeholder="歌手地区"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="介绍">
                <el-input v-model="mysinger.comment" placeholder="歌手介绍"
                          type="textarea"  style="width:600px"
                          :autosize="{ minRows: 2, maxRows: 20}"></el-input>
            </el-form-item><br>
            <el-form-item>
                <el-button type="primary" @click="addSinger">增加信息</el-button>
            </el-form-item>
        </el-form>
        <div v-if="this.mysinger.singer_id">
            <upload v-bind:id="this.mysinger.singer_id" v-bind:path="'singer'" v-bind:curUrl="mysinger.photo"></upload>
        </div>

    </div>
</template>
<script>
    import upload from "../components/MyUpload"
    export default {
        name: "AddSinger",
        components:{
            upload
        },
        data(){
            return {
                mysinger: {
                    singer_id:0,
                    photo:""
                },
                dialogVisible: false,
                msg: "增加歌手成功",
                baseurl: "http://localhost:3000/singers",
                basephoto: "http://localhost:3000"
            }
        },
        methods:{
            addSinger(){
                //let url = this.baseurl + "/" + this.mysinger.singer_id
                let url = this.baseurl
                fetch(url,{
                    method:"POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.mysinger)
                }).then(res=>res.json())
                    .then(raw=>{
                        window.console.log("raw respone = " + raw.toString())
                        this.mysinger = raw;
                        this.msg = "成功添加数据";
                        this.dialogVisible= true;
                    })

            },
            handleClose(){

            }

        },
        computed:{
            mybirthday(){
                let dd = new Date(this.singer.birthday);
                return dd;
            },
            photoUrl(){
                return this.basephoto + this.singer.photo;
            }

        }
    }
</script>

<style scoped>

</style>