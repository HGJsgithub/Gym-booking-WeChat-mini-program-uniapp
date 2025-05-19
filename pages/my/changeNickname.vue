<template>
  <view>
    <view class="inputNickname">
      <uni-easyinput :value="nickname" v-model="nickname" placeholder="请输入昵称" auto-focus="true"
                     maxlength="10"></uni-easyinput>
      <view style="padding-left: 20rpx; padding-top: 10rpx">昵称长度在2-10个字符之间</view>
    </view>
    <button class="saveButton" type="primary" @click="changeNickname(nickname,userInfo)">保存</button>
  </view>
</template>

<script setup>
import changeNickname from "@/methods/user/change-nickname";

let userInfo = uni.getStorageSync('userInfo');
let nickname = ref(userInfo.nickname);
</script>

<style lang="scss">
.inputNickname {
  width: 90%;
  margin: 50rpx auto auto;

  .uni-easyinput__content-input {
    font-size: 35rpx;
  }
}

.saveButton {
  position: fixed;
  width: 100%;
  bottom: 0;
  border-radius: 0;
}
</style>