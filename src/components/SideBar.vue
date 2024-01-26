<template>
  <div class="sidebar">
    <el-menu class="sidebar" default-active="/" :router="true" :collapse="menuCollapsed" background-color="#212529"
      text-color="#f8f9fa" active-text-color="#409EFF">
      <div class="title">{{ menuCollapsed ? "I" : "IMDB" }}</div>
      <el-menu-item v-for="item in menus" :key="item.index" :index="item.index">
        <i :class="item.iconClass"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "side-bar",
    data() {
      return {
        menus: [{
            index: "/",
            iconClass: "el-icon-s-home",
            title: "Home",
          },
          {
            index: "/movies",
            iconClass: "el-icon-video-camera-solid",
            title: "Movies",
          },
          {
            index: "/celebs",
            iconClass: "el-icon-s-custom",
            title: "Celebs",
          },
          {
            index: "/recommend",
            iconClass: "el-icon-s-opportunity",
            title: "Recommend",
          }
        ],
      };
    },
    computed: {
      ...mapGetters(["menuCollapsed"]),
    },
    methods: {},
  };
</script>

<style scoped>
  .sidebar {
    height: 100%;
  }

  .title {
    height: 60px;
    line-height: 60px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ddd;
    color: #f8f9fa;
  }
</style>