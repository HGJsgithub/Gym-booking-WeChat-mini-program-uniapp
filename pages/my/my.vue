<template>
  <view class="userInfo">
    <view class="avatar">
      <image :src="avatar" mode="aspectFill" @click="changeAvatar(loginState)">
      </image>
    </view>
    <view class="hello" @click="hasBeenLogin(loginState,'')">
      <view style="font-size: 40rpx;font-weight: 200;margin-top: 1rpx;">你好，</view>
      <view class="nickname" :class="{'pleaseLogin':!loginState}">{{ nickname }}</view>
    </view>
  </view>

  <view class="rounded-Square-Order">
    <text style="padding-left: 20px;padding-top: 20px;padding-bottom: 5px;">我的订单</text>
    <view class="order-status">
      <view class="order-option">
        <image src="../../static/order_icon/to-be-paid.png"
               @click="hasBeenLogin(loginState,'/pages/order/to-be-paid')"></image>
        <view>待支付</view>
      </view>
      <view class="order-option">
        <image src="../../static/order_icon/to-be-used.png"
               @click="hasBeenLogin(loginState,'/pages/order/to-be-used')"></image>
        <view>待使用</view>
      </view>
      <view class="order-option">
        <image src="../../static/order_icon/completed.png"
               @click="hasBeenLogin(loginState,'/pages/order/completed')">
        </image>
        <view>已完成</view>
      </view>
      <view class="order-option">
        <image src="../../static/order_icon/cancelled.png"
               @click="hasBeenLogin(loginState,'/pages/order/cancelled')">
        </image>
        <view>已取消</view>
      </view>
      <view class="order-option">
        <image src="../../static/order_icon/after-sales.png"
               @click="hasBeenLogin(loginState,'/pages/order/after-sales')"></image>
        <view>售后</view>
      </view>

    </view>
  </view>
  <view class="view-button">
    <button @click="hasBeenLogin(loginState,'/pages/my/changeNickname')">修改昵称</button>
  </view>
  <view class="view-button">
    <button @click="hasBeenLogin(loginState,'/pages/my/changePassword')">修改密码</button>
  </view>
  <view class="view-button">
    <button :disabled="!loginState" @click="loginOut()">退出账号</button>
  </view>
</template>

<script setup>
import {
  hasBeenLogin
} from "@/methods/user/user-utils";
import loginOut from "@/methods/user/login-out";
import {changeAvatar} from "@/methods/user/change-avatar";

let userInfo = ref(Object)
let nickname = ref(String)
let avatar = ref(String)
// avatar.value = baseUrl + "/user/avatar/ikun.jpg"
let loginState = ref(false)

onShow(() => {
  loginState.value = uni.getStorageSync('loginState')
  userInfo.value = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : null
  if (!loginState.value) {
    nickname.value = "请登录"
    avatar.value = "https://tse4-mm.cn.bing.net/th/id/OIP-C.5RpOYYh726ch5Vws2sy38QAAAA?w=203&h=202&c=7&r=0&o=5&pid=1.7"
  } else {
    let avatarCache = uni.getStorageSync('avatarCache')
    if (avatarCache) {
      avatar.value = avatarCache
    } else {
      avatar.value = "https://tse4-mm.cn.bing.net/th/id/OIP-C.5RpOYYh726ch5Vws2sy38QAAAA?w=203&h=202&c=7&r=0&o=5&pid=1.7"
    }
    // avatar.value = userInfo.value.avatarSRC
    nickname.value = userInfo.value.nickname
  }
})
</script>

<style lang="scss">
page {
  background-color: #f1f3f5;
}

.userInfo {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .avatar {
    padding-top: 40px;
  }

  image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .hello {
    padding-top: 10px;
    display: flex;

    .nickname {
      font-size: 40rpx;
    }

    .pleaseLogin {
      font-size: 40rpx;
      font-weight: bold;
      color: #11c53e;
    }
  }
}

.rounded-Square-Order {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 95%;
  height: 150px;
  border-radius: 10px;
}

.order-status {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  view {
    width: 120rpx;
    height: 120rpx;
    text-align: center;
  }
}

.order-option {
  image {
    width: 50rpx;
    height: 50rpx;
  }
}

.view-button {
  background-color: #ffffff;
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;

  button {
    background-color: #ffffff;
  }
}
</style>