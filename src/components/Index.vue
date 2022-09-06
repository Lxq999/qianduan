<template>
  <el-container>
     <el-header>
      <HeaderBar></HeaderBar>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="160px">
        <el-menu
        active-text-color="red"
        router
        :default-active="defaultActive"
        >
          <el-menu-item index="/discover">
            <i class="iconfont icon-yinle"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <i class="iconfont icon-shipin"></i>
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/favorites">
            <i class="iconfont icon-more"></i>
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="/recommendmusic">
            <i class="iconfont icon-good"></i>
            <span slot="title">每日推荐</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main>
        <!-- 给router-view添加key有可能对性能有一定的损耗，
        但是可以解决push同一个地址不同参数时不会重新渲染router-view的问题 -->
        <router-view/>
        <!-- 用于下载的a标签 -->
      </el-main>
    </el-container>
    <BottomControl></BottomControl>
    <music-detail-card></music-detail-card>
  </el-container>
</template>

<script>
import HeaderBar from "../components/headerBar/HeadBar.vue"
import BottomControl from"../components/bottomControl/BottomControl"
import MusicDetailCard from "views/musicDetailCard/MusicDetailCard.vue"
export default {
  components: {
    HeaderBar,
    BottomControl,
    MusicDetailCard,
    MusicDetailCard
  },
  data(){
    return{
      defaultActive: ""
    }
  },
  
  created() {
    if (this.$route.path.search("/musiclistdetail") == -1) {
      this.defaultActive = "/" + this.$route.path.split("/")[1];
    } else {
      this.defaultActive = this.$route.path;
    }
  },
}
</script>

<style scoped>
.el-header {
  background-color: #ec4141;
  height: 50px !important;
  padding: 0;
  margin: 0;
  z-index: 100;
}

.el-aside {
  border-right: 1px solid #ccc;
  height: calc(100vh - 105px);
  /* position: absolute; */
}

.el-menu {
  border: none;
}

.el-menu-item:hover {
  background-color: #f5f5f6 !important;
}

.el-menu-item {
  font-size: 12px;
  padding: 0 0 0 10px !important;
  margin: 5px 0 !important;
  height: 30px;
  line-height: 30px;
}

.el-main {
  width: calc(100% - 160px);
  padding: 0;
  /* max-width: 1280px; */
  position: absolute;
  left: 160px;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 105px);
  display: flex;
  justify-content: center;
  }
  
</style>