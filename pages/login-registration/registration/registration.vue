<template>
  <view class="registration">
    <view class="registration-content">
      <view class="input-area">
        <uni-easyinput type="text" placeholder="请输入手机号" v-model="newUser.phone" maxlength="11"></uni-easyinput>
      </view>
      <view class="input-area">
        <uni-easyinput type="text" placeholder="请输入昵称" v-model="newUser.nickname"
                       maxlength="10"></uni-easyinput>
      </view>
      <view class="input-area">
        <uni-easyinput type="password" placeholder="密码长度在6-16位之间" v-model="newUser.password" maxlength="16"
                       passwordIcon></uni-easyinput>
      </view>
      <view class="input-area">
        <uni-easyinput type="password" placeholder="请再次确认密码" v-model="confirmPwd" maxlength="16"
                       passwordIcon></uni-easyinput>
      </view>
    </view>
    <view style="margin-top: 100rpx;">
      <button class="registration-button" @click="registration(newUser,confirmPwd)">提交注册</button>
    </view>
  </view>
</template>

<script setup>
import registration from "@/methods/user/registration";

let newUser = reactive({
  phone: '',
  nickname: '',
  password: '',
})
let confirmPwd = ref('')
</script>

<style lang="scss">
.registration {
  width: 100%;

  .registration-content {
    display: flex;
    flex-direction: column;
    margin: 30rpx;
    padding: 25rpx;
    padding-top: 20rpx;
    padding-bottom: 45rpx;

    border: 1.5px solid #11c53e;
    border-radius: 20rpx;

    .input-area {
      display: flex;
      align-items: center;
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

  .registration-button {
    background-color: #11c53e;
    width: 90%;
    height: 85rpx;
    text-align: center;
    line-height: 85rpx;
    color: #fff;
  }
}
</style>