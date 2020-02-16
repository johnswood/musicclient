<template>
    <el-form :inline="true" :model="singer" class="demo-form-inline">
        <el-form-item label="ID">
            <el-input v-model="singer.singer_id" type="Number" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" type="String">
            <el-input v-model="singer.singer_name" placeholder="请输入姓名名"></el-input>
        </el-form-item>
        <el-form-item label="地区">
            <el-input v-model.number="singer.area" type="Date" placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item label="生日" type="Date">
            <el-input v-model="singer.birthday" placeholder="请输入生日"></el-input>
        </el-form-item>
        <el-form-item label="性别" type="String">
            <el-input v-model="singer.sex" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="备注" type="String">
            <el-input v-model="singer.comment" placeholder="请输入歌手信息"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addsinger">确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "singer",
        props:{
            singer_id: Number,
            singer_name: String,
            area: String,
            birthday: Date,
            sex: Boolean,
            comment:String,
            photo: String
        },
        data(){
            return{
                "singer":{

                }
            }

        }
    }
</script>

<style scoped>

</style>