<template>
  <div class="musicListContainer">
    <div class="musicList">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicList",
};
</script>

<style scoped>
.musicListContainer {
  width: 100%;
}

.musicList {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}
</style>