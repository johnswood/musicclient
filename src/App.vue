<template>
  <div id="app">
    <div id="nav">

      <router-link to="/albumlist">专辑列表</router-link> |
      <router-link to="/singerlist">歌手列表</router-link> |
      <router-link to="/">登录</router-link> |
      <router-link to="/userlist">用户列表</router-link> |
      <router-link to="/about">建库语句</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
