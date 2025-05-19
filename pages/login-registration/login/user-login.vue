<template>
  <view class="login">
    <view class="login-title">体育场馆预约</view>
    <view class="login-content">
      <view class="login-phone">
        <uni-easyinput type="text" placeholder="请输入手机号" v-model="phone" maxlength="11"></uni-easyinput>
      </view>
      <view class="login-password">
        <uni-easyinput type="password" placeholder="密码长度在6-16位之间" v-model="password" maxlength="16"
                       passwordIcon></uni-easyinput>
      </view>
    </view>
    <view style="margin-top: 75rpx;">
      <button class="login-button" type="primary" @click="login(phone,password)">登录</button>
    </view>
    <view class="registration-findPassword">
      <view class="login-registration" @click="goToRegistration()">注册账号</view>
      <span>|</span>
      <view class="login-password" @click="findPassword()">找回密码</view>
    </view>
    <view class="wx-login">
      <button style="font-size: 25rpx;" type="primary" @click="wxLogin()">微信登录</button>
    </view>
  </view>
</template>

<script setup>
import login from "@/methods/user/login";

let phone = ref('')
let password = ref('')

function goToRegistration() {
  uni.navigateTo({
    url: '/pages/login-registration/registration/registration'
  })
}

function wxLogin() {
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true,
    success: (res) => {
      console.log('res.code :>> ', res.code);
    },
  });
  uni.getUserProfile({
    desc: "帮助用户快速填写头像昵称",
    lang: "zh_CN",
    success: (res) => {
      console.log('res.userInfo :>> ', res.userInfo);
    }
  })
}
</script>

<style lang="scss">
.login {
  background-color: #fff;
  width: 100%;
  background-position: center;
  background-size: cover;
  margin: 0px;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 1535rpx;
  opacity: 0.8;

  .login-title {
    padding-top: 150rpx;
    display: flex;
    justify-content: flex-start;
    margin-left: 50rpx;
    font-weight: 700;
    font-size: 40rpx;
    color: #11cd6e;
    letter-spacing: 5rpx;
    margin-bottom: 50rpx;
  }

  .login-content {
    .login-phone {
      display: flex;
      align-items: center;
      margin: 0 50rpx;

      .uni-easyinput__content {
        height: 90rpx;
      }

      .uni-easyinput__placeholder-class {
        font-size: 30rpx;
      }

      .uni-easyinput__content-input {
        font-size: 40rpx;
      }
    }

    .login-password {
      display: flex;
      align-items: center;
      margin: 0 50rpx;
      margin-top: 25rpx;

      .uni-easyinput__content {
        height: 90rpx;
      }

      .uni-easyinput__placeholder-class {
        font-size: 30rpx;
      }

      .uni-easyinput__content-input {
        font-size: 40rpx;
      }
    }

  }

  .login-button {
    width: 86%;
  }

  .registration-findPassword {
    display: flex;
    justify-content: center;
    margin-top: 100rpx;

    .login-registration {
      padding: 0 15rpx;
      color: #11c53e;
    }

    .login-password {
      padding: 0 15rpx;
      color: #11c53e;
    }

  }

  .wx-login {
    width: 100%;
    margin-top: 40rpx;
    display: flex;
    justify-content: center;
  }
}
</style>