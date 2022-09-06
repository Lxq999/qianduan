<template>
  <div class="video">
    <nav-bar @clickBarItem="clickBarItem" :navBarItem="navBarData"></nav-bar>
    <router-view class="videoList"></router-view>
  </div>
</template>

<script>
import NavBar from "components/navBar/NavBar.vue"
export default {
  components: { NavBar },
  name: "Video",
  data() {
    return {
      navBarData: [
        { name: "视频", path: "/video/videolist" },
        { name: "MV", path: "/video/mvlist" },
      ],
    };
  },
  methods: {
    // 接收navbar传来的点击事件
    clickBarItem(path) {
      this.$router.push(path);
    },
  },
}
</script>

<style scoped>

</style>