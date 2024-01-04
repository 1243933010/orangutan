<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="logo">
        <img src="../../assets/logo.png" class="img" />
      </div>

      <div class="title-container">
        <h3 class="title">深圳市消防救援支队采购业务工作管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <img src="../../assets/clock.png" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <img src="../../assets/pwd.png" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="code" class="code-box">
        <div class="code-inp">
          <span class="svg-container">
            <img src="../../assets/code.png" />
          </span>
          <el-input
            ref="code"
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            name="code"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </div>

        <div class="code-img">
          <img :src="captcha" alt="" class="img" @click="refreshImg" />
        </div>
      </el-form-item>

      <div class="check-box">
        <el-checkbox v-model="memberPwd">记住密码</el-checkbox>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        class="login-btn"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <!-- <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
      </div> -->
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "17600000000",
        password: "111111",
        captcha: "",
        timestamp:''
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      memberPwd: false,
      captcha:`http://sz.fire.goldkites.com/get_captcha?timestamp=${new Date().getTime()}`
      
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },

  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
 
  methods: {
    refreshImg(){
      this.captcha = `http://sz.fire.goldkites.com/get_captcha?timestamp=${new Date().getTime()}`
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // console.log(this.captcha.slice(this.captcha.indexOf('=')+1,this.captcha.length))
          let from = this.loginForm;
          from.timestamp = this.captcha.slice(this.captcha.indexOf('=')+1,this.captcha.length);
          this.$store
            .dispatch("user/login", from)
            .then(() => {
              localStorage.setItem('dialog',true)
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    padding: 12px 0;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #1a3494;
      caret-color: $cursor;
      font-size: 16px;
      height: auto;
      line-height: 1;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }

      &::placeholder {
        color: #7689bd;
      }
    }
  }

  .el-form-item {
    margin: 0 auto 25px;
    border: 1px solid #fff;
    padding-left: 16px;
    background: rgba(255, 255, 255, 0.51);
    width: calc(100% - 20%);

    .el-form-item__content {
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/login_bg.png") no-repeat left top / cover;
  overflow: hidden;

  .login-form {
    padding: 27px 27px 34px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    width: 16px;

    display: flex;
    align-items: center;

    img {
      width: 100%;
    }
  }

  .logo {
    margin: 0 auto 48px;
    width: 268px;
    font-size: 0;

    .img {
      width: 100%;
    }
  }

  .title-container {
    margin-bottom: 47px;
    position: relative;

    .title {
      font-size: 36px;
      font-weight: bold;
      color: #1a3494;
    }
  }

  .code-box {
    margin: 0 auto 26px;
    width: calc(100% - 20%);
    .el-form-item__content {
      display: flex;
      justify-content: space-between;

      .code-inp {
        width: 65%;
        display: flex;
        align-items: center;
      }
      .code-img {
        width: 35%;
        height: 47px;
        background-color: #7689bd;

        img {
          height: 100%;
        }
      }
    }
  }

  .check-box {
    margin: 0 auto 26px;
    width: calc(100% - 20%);
  }

  .show-pwd {
    margin-right: 16px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .login-btn {
    margin: 26px auto 0;
    border-radius: 4px;
    border-color: #fff;
    padding: 15px;
    width: calc(100% - 20%);
    background-color: rgba(58,98,215,0.8);;
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    text-align: center;
    display: block;
    font-weight: bold;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
