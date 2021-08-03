<template>
  <div class="sidebar">
    <el-menu
      class="sidebar"
      default-active="/"
      :router="true"
      :collapse="menuCollapsed"
      background-color="#212529"
      text-color="#f8f9fa"
      active-text-color="#63e6be"
    >
      <div class="title">{{ menuCollapsed ? "D" : "DEMO" }}</div>
      <el-menu-item v-for="item in menus" :key="item.index" :index="item.index">
        <i :class="item.iconClass"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "side-bar",
  data() {
    return {
      menus: [
        {
          index: "/",
          iconClass: "el-icon-s-home",
          title: "首页",
        },
        {
          index: "/practice",
          iconClass: "el-icon-edit-outline",
          title: "练习1",
        },
        {
          index: "/rf/rf-practice",
          iconClass: "el-icon-edit-outline",
          title: "嵌套路由示例",
        },
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
