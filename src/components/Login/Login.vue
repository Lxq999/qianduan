<template>
  <div class="login">
    <el-form
      ref="form"
      v-model="loginForm"
      label-width="80px"
      label-position="right"
      size="mini"
    >
      <el-form-item label="手机号码：" size="mini" label-width="100px" required>
        <input type="text" v-model="loginForm.phoneNum" class="loginInput" />
      </el-form-item>
      <el-form-item label="密码：" size="mini" label-width="100px" required>
        <input
          type="password"
          v-model="loginForm.password"
          class="loginInput"
        />
      </el-form-item>
      <div class="loginButton">
        <el-button type="danger" @click="login" size="mini">登录</el-button>
      </div>
      <div class="regEnter">注册</div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        password: "",
        phoneNum: "",
      },
    };
  },
  methods: {
    login() {
      this.loginByCellphone();
    },

    async loginByCellphone() {
      let timestamp = Date.parse(new Date());
      let result = await this.$request("/login/cellphone", {
        phone: this.loginForm.phoneNum,
        password: this.loginForm.password,
        withCredentials: true,
        timestamp,
      });
      console.log(result);
      if (result.data.code == 200) {
        // 将请求到的用户id存入localstorage
        // 在index.vue 和 bottomControl.vue中用到过
        window.localStorage.setItem("userId", result.data.profile.userId);
        // this.userInfo = result.data.profile;
        // 将userInfo传回父组件
        this.$emit("getUserInfo", result.data.profile);

        this.$message.success("登录成功!");
        // 刷新页面
        // this.$router.go(0);
        // 修改vuex中的登录状态
        this.$store.commit("updataLoginState", true);
        // this.$store.commit("updateCurrentUserId", result.data.profile.userId);
      }
    },
  },
};
</script>

<style scoped>
.regEnter {
  width: 100%;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  margin: 15px auto 0;
}

.regEnter:hover {
  text-decoration: underline;
}

.loginInput {
  height: 25px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #999;
  padding-left: 5px;
  width: 175px;
}

.el-form {
  padding-top: 10px;
}

.loginButton {
  width: 100%;
  text-align: center;
}

.loginButton .el-button {
  width: 200px;
}
</style>
