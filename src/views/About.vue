<template>
    <div class="about">
    <h1>数据库创建语句</h1>
        <pre>
use music
db.sns.save({"sn_name":"singer","sn",1})
db.sns.save({"sn_name":"song","sn",1})
db.sns.save({"sn_name":"album","sn",1})
db.sns.save({"sn_name":"user","sn",1})
db.users.createIndex({"user_name":"text","real_name":"text"})
db.singer.createIndex({"singer_name":"text"})
        </pre>
  </div>
</template>
