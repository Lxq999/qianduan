import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('components/Index.vue')
const Discover = () => import('views/discover/Discover.vue')
const Video = () => import('views/video/Video.vue')
const RecommendMusic = () => import('views/recommendMusic/RecommendMusic.vue')
const Favorites = () => import('views/favorites/favorites.vue')
const Recommend = () => import('views/discover/discoverChildren/Recommend.vue')
const Ranking = () => import('views/discover/discoverChildren/Ranking.vue')
const MusicListDetail = () => import('views/musicListDetail/MusicListDetail.vue')
const Singer = () => import('views/discover/discoverChildren/Singer.vue')
const MusicList = () => import('views/discover/discoverChildren/MusicList.vue')
const MusicListIndex = () => import('views/discover/discoverChildren/musicListChildren/MusicListIndex.vue')
const MusicListHighquality = () => import('views/discover/discoverChildren/musicListChildren/MusicListHighquality.vue')
const VideoList = () => import('views/video/videoChildren/VideoList.vue')
const MvList = () => import('views/video/videoChildren/MvList.vue')
const VideoDetail = () => import('views/videoDetail/VideoDetail.vue')
const Search = () => import('views/search/Search.vue')
const SearchSong = () => import('views/search/searchChildren/SearchSong.vue')
const SearchSinger = () => import('views/search/searchChildren/SearchSinger.vue')
const SearchAlbum = () => import('views/search/searchChildren/SearchAlbum.vue')
const SearchVideo = () => import('views/search/searchChildren/SearchVideo.vue')
const SearchMusicList = () => import('views/search/searchChildren/SearchMusicList.vue')
const SingerDetail = () => import('views/singerDetail/SingerDetail.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index,
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: Discover,
        redirect: '/discover/recommend',
        children: [
          { path: '/discover/recommend', component: Recommend },
          {
            path: '/discover/musiclist',
            component: MusicList,
            redirect: '/discover/musiclist/musiclistindex',
            children: [
              { path: '/discover/musiclist/musiclistindex', component: MusicListIndex },
              { path: '/discover/musiclist/musiclisthighquality', component: MusicListHighquality },
            ]
          },
          { path: '/discover/ranking', component: Ranking },
          { path: '/discover/singer', component: Singer }
        ]
      },
      {
        path: '/video',
        component: Video,
        redirect: '/video/videolist',
        children: [
          { path: '/video/videolist', component: VideoList },
          { path: '/video/mvlist', component: MvList },
        ]
      },
      { path: '/videodetail/:id/:type', name: 'videoDetail', component: VideoDetail },
      {
        path: '/recommendmusic',
        component: RecommendMusic
      },
      {
        path: '/favorites',
        component: Favorites
      },
      { path: '/musiclistdetail/:id', name: 'musicListDetail', component: MusicListDetail },
      {
        path: '/search/:id', name: 'search', component: Search,
        redirect: '/search/searchsong/:id',
        children: [
            { path: '/search/searchsong/:id', name: 'searchSong', component: SearchSong },
            { path: '/search/searchsinger/:id', name: 'searchSinger', component: SearchSinger },
            { path: '/search/searchalbum/:id', name: 'searchAlbum', component: SearchAlbum },
            { path: '/search/searchvideo/:id', name: 'searchVideo', component: SearchVideo },
            { path: '/search/searchmusiclist/:id', name: 'searchMusicList', component: SearchMusicList },
        ]
    },
    { path: '/singerdetail/:id', name: 'singerDetail', component: SingerDetail },
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
