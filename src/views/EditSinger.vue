<template>
    <div>
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
        <el-form :inline="true" :model="mysinger" class="demo-form-inline">
            <el-form-item label="ID">
                <el-input v-model="mysinger.singer_id" placeholder="歌手ID" :readonly="true"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="姓名">
                <el-input v-model="mysinger.singer_name" placeholder="歌手姓名"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="生日">
                <el-date-picker
                        v-model="mysinger.birthday"
                        type="date"  style="width:600px"
                        placeholder="选择生日">
                </el-date-picker>
            </el-form-item><br>
            <el-form-item label="地区">
                <el-input v-model="mysinger.area" placeholder="歌手地区"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item label="介绍">
                <el-input v-model="mysinger.comment" placeholder="歌手介绍"  style="width:600px"></el-input>
            </el-form-item><br>
            <el-form-item>
                <el-button type="primary" @click="updateSinger">修改信息</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div>
            <upload v-bind:id="this.id" v-bind:path="'singer'" v-bind:curUrl="this.mysinger.photo"></upload>
        </div>

    </div>
</template>

<script>
    import upload from "../components/MyUpload"
    export default {
        name: "EditSinger",
        components: {
            upload
        },

        data(){
            return {
                mysinger: {},
                dialogVisible: false,
                msg: "成功更新",
                baseurl: "http://localhost:3000/singers",
                basephoto: "http://localhost:3000",
                id: 0
            }
        },
        created(){
            this.id= this.$route.params.id;
        },
        mounted(){

            fetch(this.baseurl + "/" + this.id)
                .then(res=>res.json())
                .then(bs => {
                    this.mysinger = bs[0]
                    this.mysinger.birthday = new Date(this.mysinger.birthday);
                    window.console.log("editsinger mounted, mysinger.photo = " + this.mysinger.photo);
                })

        },
        methods:{
             updateSinger(){
                //let url = this.baseurl + "/" + this.mysinger.singer_id
                let url = this.baseurl
                fetch(url,{
                    method:"PUT",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.mysinger)
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
                return this.basephoto + this.mysinger.photo;
            }

        }
    }
</script>

<style scoped>

</style>