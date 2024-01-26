<template>
  <div id="app">
    <el-container id="container">
      <!-- 侧边栏 -->
      <el-aside id="aside" :width="menuCollapsed ? '65px' : '250px'">
        <side-bar></side-bar>
      </el-aside>
      <el-main id="main">
        <!-- 右侧主区域再分为上中下三个 -->
        <el-container style="height: 100%">
          <el-header id="header">
            <top></top>
          </el-header>
          <el-main>
            <router-view />
          </el-main>
          <!-- <el-footer id="footer" height="30px">
            <status-bar></status-bar>
          </el-footer> -->
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Top from '@/components/Top';
import SideBar from '@/components/SideBar';
import StatusBar from '@/components/StatusBar';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: { Top, SideBar, StatusBar },
  computed: {
    ...mapGetters(['menuCollapsed']),
  },
};
</script>
<style>
/* 设置页面占据整个窗口 */
html,
body {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  height: 100%;
  overflow: hidden;
}
#container {
  height: 100%;
}
#main,
#header {
  padding: 0;
}
#footer {
  margin: 0;
  padding: 1px 0;
}
/* #app {
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
} */
</style>
