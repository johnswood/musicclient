<template>
<div class="about">
    <pre align = "left">
const req = http.request(options);
mongoose.connect("mongodb://39.99.190.190/demo02",function (err) {

    if(!err){
        console.log("mongodb 已连接!")

        req.end();

        req.on('response', (info) => {
            info.on('data', chunk => {
                let ablums = JSON.parse(chunk.toString());
                for(album of ablums){
                    console.log(ablums);
                    albumDao.addAlbum(ablums,function (aa) {
                        console.log(aa)
                    })
                }


            })
        });
        req.on('end',()=>{
            mongoose.disconnect()
        })
    } else {
        console.log("mongodb连接失败");
    }
})


</pre>
  </div>
</template>
