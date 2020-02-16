<template>
    <div>
        <div style="float:left" v-for="album in albums" :key="album.album_id">
            <Album v-bind="album"></Album>
        </div>
    </div>

</template>


<script>
    import Album from '@/components/SimpleAlbum.vue'

    export default {
        name: "AlbumList",
        data(){
            return {
                maxId:2,
                //baseurl:"http://www.shangzai.com:3000/albums/",
                baseurl:"http://localhost:3000/albums",
                dialogVisible:false,
                album:{},
                // albums:[{album_id:1,album_name:"album1",issue_date:"2019-1-1"},
                //     {album_id:2,album_name:"album2",issue_date:"2019-1-1"}]
                albums:[]
            }
        },
        mounted(){
            fetch(this.baseurl)
                .then(res=>res.json())
                .then(bs => this.albums = bs)
        },
        components: {
            Album
        },
        methods:{
            deleteAlbum(album){
                window.console.log(album)

                //let request = require('request');
                let myurl = this.baseurl + "/" + album.album_id;

                fetch(myurl,{
                    method:"DELETE",
                    headers:{
                        "content-type": "application/json"
                    }
                }).then(res=>res.json())
                    .then(rs=>{
                        window.console.log(rs);
                        if(!rs.code) {
                            let index=this.albums.findIndex(item=>item.album_id==album.album_id)
                            this.albums.splice(index,1)
                        }
                    })
            },
            addAlbum(){
                fetch(this.baseurl,{
                    method:"POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.album)
                }).then(res=>res.json())
                    .then(nb=>this.albums.push(nb))

            },
            handleClose(){

            }

        }

    }
</script>
