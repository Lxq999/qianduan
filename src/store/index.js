import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    // 音乐的url
    musicId: '',
    // 音乐的播放状态
    isPlay: false,
    // 当前播放的歌单
    musicList: [],
    // 当前播放歌单的id
    musicListId: '',
    // 是否登录
    isLogin: false,
    // 当前播放音乐的索引
    currentIndex: -1,
    // 音乐详情卡片的显隐
    isMusicDetailCardShow: false,
    // 实时播放时长
    currentTime: 0,
    // 音乐是否在加载中
    isMusicLoad: false,
    // 在歌手详情保存的上一首歌曲信息
    currentRowInfo: {},
    // 用户喜欢的音乐列表
    likeMuiscList: [],
    // 已收藏的歌单
    // 已收藏的专辑
    subAlbumList: null,
    // 已收藏的歌手
    subSingerList: null,
    // 已收藏的video
    subVideoList: null,
    // 已收藏的歌单
    collectMusicList: [],
    // 用户创建的歌单
    createdMusicList: [],
    // 要下载的音乐信息
    downloadMusicInfo: {
        name: '',
        url: '',
    },
    // 已喜欢的视频
    likeVideoList: null,
}
export default new Vuex.Store({
  state,
  mutations: {
    //更新登录状态
    updataLoginState(state, flag = false) {
      state.isLogin = flag;
    },
    // 更新音乐url
    updateMusicId(state, musicId) {
      state.musicId = musicId;
      // console.log(musicId);
    },
    // 修改播放状态
    changePlayState(state, isPlay) {
        state.isPlay = isPlay;
        // console.log('changePlayState');
    },
    // 更新歌单列表和歌单id
    updateMusicList(state, payload) {
      // 当歌单id发生变化时,重置当前播放音乐索引
      if (payload.musicListId != state.musicListId) {
          state.musicListId = payload.musicListId;
          state.currentIndex = -1;
      }
      // console.log(state.currentIndex);
      // 对歌单进行深拷贝再赋值 直接赋值是浅拷贝
      // 歌单是固定的死数据，而vuex中的musicList是动态的
      let musicList = payload.musicList.slice(0)
      state.musicList = musicList;
      // console.log('updateMusicList');
    },
      // 当前播放音乐的索引
      updateCurrentIndex(state, index) {
      // console.log('updateCurrentIndex');
      state.currentIndex = index;
      // console.log(state.currentIndex);
    },

    updateCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
     // 更新音乐的加载状态
     updateMusicLoadState(state, isLoad) {
      state.isMusicLoad = isLoad;
    },
    // 切换音乐详情卡片的显隐
    changeMusicDetailCardState(state) {
      state.isMusicDetailCardShow = !state.isMusicDetailCardShow;
    },
    // 更新已喜欢的视频列表
    updateLikeVideoList(state, likeVideoList) {
      state.likeVideoList = likeVideoList;
    },
    // 更新已收藏的歌手列表
    updateSubSingerList(state, subSingerList) {
      state.subSingerList = subSingerList;
  },
  },
  actions: {
  },
  modules: {
  }
})
