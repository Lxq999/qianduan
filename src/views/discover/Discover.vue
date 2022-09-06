<template>
  <div class="discoverContainer">
    <div class="navbar"><nav-bar :navBarItem="navBarData" @clickBarItem="clickBarItem" ></nav-bar></div>
    
    <router-view class="discover"></router-view>
  </div>
</template>

<script>
import NavBar from "components/navBar/NavBar"

export default {
  name: "Discover",
  components: {
    NavBar,
  },
   data() {
    return {
      navBarData: [
        { name: "个性推荐", path: "/discover/recommend" },
        { name: "歌单", path: "/discover/musiclist" },
        { name: "排行榜", path: "/discover/ranking" },
        { name: "歌手", path: "/discover/singer" },
      ],
    };
  },
  methods: {
    // 接收navbar传来的点击事件
    clickBarItem(path) {
      console.log('22',path);
      this.$router.push(path);
    },
  },
}
</script>

<style scoped>
.navbar{
  width: 100%;
  position: fixed;
  z-index: 3;
}
.discoverContainer {
  overflow: hidden;
  padding: 0 !important;
  width: 100%;
  /* text-align: center; */
  /* display: flex; */
  /* justify-content: center; */
 
}
.renking{
  margin: 0;
}

.discover {
  width: calc(100vw);;
  position: absolute;
  top:60px;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 0 15px;
}
</style>