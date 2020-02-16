<template>
    <el-form :inline="true" :model="album" class="demo-form-inline">
        <el-form-item label="ID">
            <el-input v-model="album.album_id" type="Number" placeholder="请输入唱片名"></el-input>
        </el-form-item>
        <el-form-item label="Album Name" type="String">
            <el-input v-model="album.album_name" placeholder="请输入唱片名"></el-input>
        </el-form-item>
        <el-form-item label="发行日期">
            <el-input v-model.number="album.issue_date" type="Date" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="公司" type="String">
            <el-input v-model="album.company" placeholder="请输入唱片公司"></el-input>
        </el-form-item>
        <el-form-item label="备注" type="String">
            <el-input v-model="album.comment" placeholder="请输入唱片公司"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addAlbum">确定</el-button>
        </el-form-item>
    </el-form>

    singers: [
    {"singer_id":Number,"singer_name":String}
    ],
    songs: [{"song_id":Number,"song_name":String, "time": Number}],
    coverpic: String


</template>

<script>
    export default {
        name: "AlbumAdd"
    }
</script>

<style scoped>

</style>