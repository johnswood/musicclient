<template>
        <div class="block">
            <router-link tag="a" :to="{path:'/singer/' + singer_id}">
                <el-image
                        style="width: 100px; height: 100px; object-fit: contain"
                        :src="picurl"></el-image><br>
            </router-link>
            <span>{{singer_name}}</span><br>
            <span>{{area}}</span>

        </div>
</template>

<script>
    export default {
        name: "singer",
        props: {
            singer_id: Number,
            photo: String,
            singer_name: String,
            area: String,
        },
        data() {
            return {
                "baseurl": "http://localhost:3000"
            }
        },
        computed:{
            picurl(){
                return this.baseurl + this.photo;
            }
        }

    }
</script>

<style scoped>
img{

}
</style>