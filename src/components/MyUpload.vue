<template>
    <div>
        <el-upload
                class="avatar-uploader"
                name="avatar"
                action=""
                :http-request="upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img  :src="getimgurl" class="avatar" ref="myimage">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "upload",
        props:{
            curUrl: String,
            path: String,
            id: Number
        },
        data() {
            return {
                baseurl: "http://localhost:3000/upload",
                basepic: "http://localhost:3000",
                imageUrl:''
            }

        },
        mounted(){
            //this.imageUrl = this.basepic + this.curUrl

            window.console.log("myupload.mounted curUrl = %s" , this.curUrl)
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            upload(f){

                let formData = new FormData()
                formData.append('file', f.file)
                let url = this.baseurl + "/" + this.path + "/" + this.id

                axios({
                    method: 'post',
                    url: url,
                    data:formData
                }).then(res=>{
                    //上传成功之后 显示图片

                    //this.imageUrl = res.data.url
                    //window.console.log(res)

                    this.imageUrl = this.basepic + res.data.url
                    //this.curUrl = res.data.url;
                    //window.console.log("after upload: imageUrl=%s", this.imageUrl)
                    //window.location.reload()
                })
            }
        },
        computed:{
            getimgurl(){
                let res = "";
                if(this.imageUrl) res = this.imageUrl;
                else res =  this.basepic +  this.curUrl;
                res = res + "?t=" + Math.random();
                window.console.log("myupload computed:getimgurl= %s" , res)
                return res;
            }
            // actionurl(){
            //     return this.baseurl+ '/' + this.path + '/' + this.id
            // }
        }

    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>