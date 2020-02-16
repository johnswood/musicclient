<template>
        <div class="block">
            <router-link tag="a" :to="{path:'/album/' + album_id}">
                <el-image
                        style="width: 100px; height: 100px; object-fit: contain"
                        :src="picurl"></el-image><br>
            </router-link>
            <span>{{album_name}}</span><br>
            <span>{{issuedate}}</span>

        </div>
</template>

<script>
    export default {
        name: "Album",
        props: {
            album_id: Number,
            coverpic: String,
            album_name: String,
            issue_date: String,
        },
        data() {
            return {
                "baseurl": "http://localhost:3000"
            }
        },
        computed:{
            issuedate(){
                var dd = new Date(this.issue_date)
                return dd.toLocaleDateString();
            },
            picurl(){
                return this.baseurl + this.coverpic;
            }
        }

    }
</script>

<style scoped>
img{

}
</style>