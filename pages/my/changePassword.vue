<template>
  <view class="changePwd-content">
    <view class="input-area">
      <uni-easyinput type="password" placeholder="请输入原始密码" v-model="inputInitialPwd" maxlength="16"
                     passwordIcon></uni-easyinput>
    </view>
    <view class="input-initialPwd-error" v-if="!flag1" style="margin-top: 10rpx;margin-left: 10rpx; color: red;">
      *原始密码错误！
    </view>
    <view class="input-area">
      <uni-easyinput type="password" placeholder="请输入新的密码" v-model="newPwd" maxlength="16"
                     passwordIcon></uni-easyinput>
    </view>
    <view class="tip" style="margin-top: 10rpx;margin-left: 10rpx;">密码长度在6到16个字符之间</view>
    <view class="input-initialPwd-error" v-if="!flag2" style="margin-top: 10rpx;margin-left: 10rpx; color: red;">
      *密码长度小于6位
    </view>
    <view class="input-area">
      <uni-easyinput type="password" placeholder="请再次确认密码" v-model="confirmPwd" maxlength="16"
                     passwordIcon></uni-easyinput>
    </view>
    <view class="input-initialPwd-error" v-if="!flag3" style="margin-top: 10rpx;margin-left: 10rpx; color: red;">
      *第二次输入的密码错误！
    </view>
  </view>
  <button class="saveButton" type="primary"
          @click="changePassword(newPwd,userInfo,flag1,flag2,flag3)">保存
  </button>
</template>

<script setup>
import changePassword from "@/methods/user/change-password";

let userInfo = uni.getStorageSync('userInfo')
let initialPwd = ref(userInfo.password)
let inputInitialPwd = ref()
//flag1判断输入的初始密码是否正确,true代表正确
let flag1 = ref(false)
//flag2判断输入密码是否小于6位，true代表长度正确
let flag2 = ref(false)
// flag3判断二次确认密码是否正确，true代表正确
let flag3 = ref(false)
let newPwd = ref()
let confirmPwd = ref()
watch(inputInitialPwd, (nv) => {
  if (nv == initialPwd.value) {
    flag1.value = true
  } else {
    flag1.value = false
  }
})

watch([newPwd, confirmPwd], (nv) => {
  if (nv[0].length < 6) {
    flag2.value = false
  } else {
    flag2.value = true
  }
  if (nv[0] == nv[1]) {
    flag3.value = true
  } else {
    flag3.value = false
  }
})
</script>

<style lang="scss">
.changePwd-content {
  width: 90%;
  margin: auto;
  margin-top: 50rpx;

  .input-area {
    width: 100%;
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

.saveButton {
  position: fixed;
  width: 100%;
  bottom: 0;
  border-radius: 0rpx;
}
</style>