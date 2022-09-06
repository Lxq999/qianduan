<template>
  <div class="bottomControl">
    <audio
      :src="musicUrl"
      autoplay
      ref="audioPlayer"
      @play="changeState(true)"
      @pause="changeState(false)"
      @timeupdate="timeupdate"
      @ended="changeMusic('next')"
    ></audio>
    <div class="left">
      <div class="avatar" @click="$store.commit('changeMusicDetailCardState')">
        <img
          :src="musicDetail.al.picUrl"
          alt=""
          v-if="musicDetail.al"
          :draggable="false"
        />
        <img src="~assets/img/test.jpg" alt="" v-else :draggable="false" />
      </div>

      <div class="musicInfo">
        <div class="musiName" v-if="musicDetail && musicDetail.name">
          {{ musicDetail.name }}
        </div>
        <div class="singer" v-if="musicDetail && musicDetail.name">
          {{ musicDetail.ar[0].name }}
        </div>
      </div>
      <div class="dowmloadContainer">
        <i class="iconfont icon-download"></i>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center">
      <div class="buttons">
        <span @click="playType = playType == 'order' ? 'random' : 'order'"
          ><i class="iconfont icon-xunhuan" v-if="playType == 'order'"></i
          ><i class="iconfont icon-suiji1" v-else></i
        ></span>
        <span>
          <i class="iconfont icon-shangyishou"
            @click="musicList.length != 0 ? changeMusic('pre') : ''"
          ></i>
        </span>
        <span @click="musicList.length != 0 ? changePlayState() : ''">
          <i
            class="iconfont icon-icon_play"
            v-if="!this.$store.state.isPlay"
          ></i>
          <i class="iconfont icon-zantingtingzhi" v-else></i>
        </span>
        <span>
          <i class="iconfont icon-xiayishou"
            @click="musicList.length != 0 ? changeMusic('next') : ''"
          ></i>
        </span>
        <span>
          <i class="iconfont icon-xihuan"></i>
        </span>
      </div>

      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ currentTime | handleMusicTime }}</span>
        <el-slider
          class="progressSlider"
          v-model="timeProgress"
          :show-tooltip="false"
          @change="changeProgress"
          :disabled="musicList.length == 0"
        >
        </el-slider>
        <span class="totalTime">{{ duration }}</span>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right">
      <div class="volumeControl">
        <i class="iconfont icon-yinliang"></i>
        <el-slider class="volumeSlider" v-model="volume"></el-slider>
      </div>
      <div class="playList" @click="openDrawer">
        <i class="iconfont icon-bofangliebiao"></i>
      </div>

      <!-- 抽屉 -->
      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="drawerHeader">总{{ musicList.length }}首</div>
        <el-table
          :data="musicList"
          stripe
          style="width: 100%"
          :show-header="false"
          @row-dblclick="clickRow"
          highlight-current-row
          lazy
        >
          <el-table-column prop="name" width="150px"> </el-table-column>
          <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
          <el-table-column prop="dt" width="70px"> </el-table-column>
        </el-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { handleMusicTime, returnSecond } from "plugins/utils";
let lastSecond = 0;
// 总时长的秒数
let durationNum = 0;
// 保存当前音量
let volumeSave = 0;
// 当前音乐类型，用于下载
let musicType = "";

export default {
  name: "BottomControl",
  data() {
    return {
      musicUrl: "",
      musicDetail: {},
      musicList: [],
      timeProgress: 0,
      volume: 0,
      // 抽屉开关
      drawer: false,
      // 音乐总时长
      duration: "00:00",
      // 当前播放时间位置
      currentTime: 0,
      // 播放模式（顺序播放，随机播放）
      // order random
      playType: "order",
    };
  },
  methods: {
    async getMusicDetail(id) {
      this.$store.commit("updateMusicLoadState", true);
      let result = await this.$request("/song/url", { id });
      // console.log(musicDetail);
      console.log(result);
      // 获取不到url
      if (result.data.data[0].url == null) {
        this.$message.error("该歌曲暂无版权，将为您播放下一首歌曲");
        // this.changeMusic("next");
        return;
      }
      this.musicUrl = result.data.data[0].url;
      // musicType = result.data.data[0].type.toLowerCase();
      this.$store.commit("updateMusicLoadState", false);
    },
    // 点击打开抽屉的回调
    openDrawer() {
      // 关闭也是这个回调，所以直接取反
      this.drawer = !this.drawer;
      // this.hasDrawerOpend = true;
      // this.handleDrawerListDOM(this.currentMusicIndex);
    },
    // 根据id找到 musicList中对应的musicDetail
    getMusicDetailFromMusicList() {
      // this.musicList.forEach((item, index) => {
      //   // console.log(index);
      //   if (item.id == this.$store.state.musicId) {
      //     // 记录当前音乐的index
      //     this.currentMusicIndex = index;
      //     // 将索引传至vuex
      //     this.$store.commit("updateCurrentIndex", index);
      //     this.musicDetail = item;
      //     // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
      //     this.duration = this.musicList[index].dt;
      //   }
      // });

      let index = this.musicList.findIndex(
        (item) => item.id == this.$store.state.musicId
      );
      console.log(index);
      if (index != -1) {
        // 记录当前音乐的index
        this.currentMusicIndex = index;
        // 将索引传至vuex
        this.$store.commit("updateCurrentIndex", index);
        this.musicDetail = this.musicList[index];
        // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
        this.duration = this.musicList[index].dt;
      }
    },
    // 点击播放键的回调
    changePlayState() {
      !this.$store.state.isPlay ? this.playMusic() : this.pauseMusic();
    },
    // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play();
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
    },
    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit("changePlayState", state);
    },

    // 当前播放时间位置
    timeupdate() {
      // console.log(e);
      // console.log(this.$refs.audioPlayer.currentTime);
      // console.log("hahahahahaha");
      // 节流
      let time = this.$refs.audioPlayer.currentTime;
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      this.$store.commit("updateCurrentTime", time);

      time = Math.floor(time);
      if (time !== lastSecond) {
        lastSecond = time;
        this.currentTime = time;
        // 计算进度条的位置
        this.timeProgress = Math.floor((time / durationNum) * 100);
        // console.log(this.timeProgress);
      }
    },

    // 拖动进度条的回调
    changeProgress(e) {
      // console.log(e);
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },

    // 切换歌曲
    changeMusic(type, id) {
      if (type == "click") {
        // 点击抽屉row进行切歌
        this.$store.commit("updateMusicId", id);
      } else if (type == "pre") {
        let currentMusicIndex = this.currentMusicIndex;
        let preIndex;
        if (this.playType == "order") {
          preIndex =
            currentMusicIndex - 1 < 0
              ? this.musicList.length - 1
              : currentMusicIndex - 1;
              console.log(currentMusicIndex);
        } else if (this.playType == "random") {
          if (this.musicList.length == 1) {
            preIndex = currentMusicIndex;
          } else {
            // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
            preIndex = currentMusicIndex;
            while (preIndex == currentMusicIndex) {
              preIndex = Math.floor(Math.random() * this.musicList.length);
            }
          }
        }
        console.log(this.musicList[preIndex].id);
        this.$store.commit("updateMusicId", this.musicList[preIndex].id);
      } else if (type == "next") {
        let currentMusicIndex = this.currentMusicIndex;
        let nextIndex;
        if (this.playType == "order") {
          nextIndex =
            currentMusicIndex + 1 == this.musicList.length
              ? 0
              : currentMusicIndex + 1;
        } else if (this.playType == "random") {
          if (this.musicList.length == 1) {
            nextIndex = currentMusicIndex;
          } else {
            // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
            nextIndex = currentMusicIndex;
            while (nextIndex == currentMusicIndex) {
              nextIndex = Math.floor(Math.random() * this.musicList.length);
            }
          }
        }
        // console.log(this.musicList[nextIndex].id);
        this.$store.commit("updateMusicId", this.musicList[nextIndex].id);
      }
    },
      // 双击抽屉列表中的row的回调
      clickRow(row) {
        // console.log(row.id);
        this.changeMusic("click", row.id);
      },
  },

  watch: {
    "$store.state.musicId"(id) {
      console.log("vuex中的id发生了变化");
      // 先暂停当前播放的音乐
      // this.pauseMusic();
      this.musicList = this.$store.state.musicList;
      console.log(this.musicList);
      this.getMusicDetailFromMusicList();
      this.getMusicDetail(id);
      // this.timeupdate();
      durationNum = returnSecond(this.duration);
      // 判断用户是否喜欢当前音乐
      // this.getIsUserLikeCurrentMusic();
      // console.log(this.$refs.audioPlayer);
    },
  },
  filters: {
    handleMusicTime,
  },
};
</script>

<style scoped>
.bottomControl {
  /* background-color: pink; */
  border-top: 1px solid #ddd;
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  z-index: 10000;
  background-color: #fff;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;
}

.avatar img {
  width: 100%;
}

.left {
  display: flex;
  align-items: center;
  width: 123px;
}

.musicInfo {
  color: rgb(37, 37, 37);
  font-size: 12px;
  width: 70px;
}

.musicName {
  margin-bottom: 4px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.singer {
  transform: scale(0.9);
  margin-left: -3px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.center {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  align-items: center;
  height: 13px;
}

.buttons i {
  font-size: 20px;
  color: #313131;
}

.buttons span:nth-child(3) i {
  font-size: 25px;
}

.center .icon-xunhuan {
  font-size: 17px;
}
.center .icon-xihuan {
  font-size: 15px;
}

.right {
  display: flex;
  align-items: center;
  position: relative;
}

.volumeControl {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.icon-yinliang {
  font-size: 18px;
  margin-right: 7px;
}

.volumeSlider {
  width: 55px;
}

.icon-bofangliebiao {
  font-size: 18px;
  margin-right: 10px;
}

.progressSlider {
  width: 300px;
}

.buttons span {
  display: inline-block;
  width: 50px;
  box-sizing: border-box;
  text-align: center;
}

.icon-zantingtingzhi {
  font-size: 35px !important;
}

.drawerHeader {
  font-size: 12px;
  transform: scale(0.9);
  color: #aaa;
  padding: 15px 0;
}

.progressBar {
  display: flex;
  align-items: center;
}

.currentTime,
.totalTime {
  font-size: 13px;
  transform: scale(0.85);
  color: #aaa;
  margin: 0 5px;
  width: 30px;
  text-align: center;
}

.progressBar {
  height: 10px;
  margin-top: 12px;
  overflow: hidden;
}

.like {
  color: #ec4141 !important;
}

.downloadContainer {
  height: 100%;
  position: relative;
}

.downloadContainer i {
  position: absolute;
  bottom: 5px;
}

.center .icon-suiji1 {
  font-size: 15px;
}
</style>