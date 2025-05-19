<template>
  <view class="to-be-paid">
    <view class="countdown" v-if="show">
      <view>
        请在倒计时结束前完成订单支付
      </view>
      <uni-countdown :font-size="16" :show-day="false" :show-hour="false"
                     :minute="minute" :second="second" @timeup="cancelOrder"></uni-countdown>
    </view>
    <view class="Card" v-if="show">
      <general-order-card :generalOrder="orderInfo"></general-order-card>
    </view>

    <view class="option" v-if="show">
      <button type="primary" @click="pay()">付款</button>
      <button type="warn" @click="cancel()">取消</button>
    </view>
    <view class="empty" v-if="!show">
      这里什么也没有哦
    </view>
  </view>
</template>

<script setup>
import getOrderList from "@/methods/order/get-order-list";
import changeOrderState from "@/methods/order/change-order-state";
import UniCountdown from "@/uni_modules/uni-countdown_1.2.5/components/uni-countdown/uni-countdown.vue";
//订单状态
import {PendingPayment} from "@/common/constData/order-state";
import {ToBeUsed} from "@/common/constData/order-state";
import {cancelled} from "@/common/constData/order-state";

uni.showLoading({title: '加载中'})

let orderInfo = ref([])
let show = ref(false)
let minute = ref(Number)
let second = ref(Number)
const userID = uni.getStorageSync('userInfo').id

if (orderInfo.value.length == 0) {
  getOrderList(userID, PendingPayment).then((res) => {
    if (res.orderList) {
      orderInfo.value = res.orderList[0]
      show.value = true
      minute.value = res.remainingMinutes
      second.value = res.remainingSeconds
    }
  }).catch((err) => {
    console.log(err)
    uni.showToast({
      title: err, duration: 1000,
    })
  }).finally(() => {
    uni.hideLoading()
  })
} else {
  show.value = true
  uni.hideLoading()
}

function pay() {
  uni.showModal({
    title: "是否支付？", confirmText: "取消", cancelText: "支付", confirmColor: "#ff0000", cancelColor: "#11c53e",
    success: (option) => {
      if (option.cancel) { //点击了确认支付
        changeOrderState(orderInfo.value.id, ToBeUsed).then(() => { //改变订单状态成功
          uni.showToast({
            title: '支付成功', duration: 1000, mask: true,
            success: () => {
              setTimeout(() => {
                uni.switchTab({url: '/pages/my/my'})
              }, 1000)
            }
          })
        }).catch((err) => { //改变订单状态失败
          console.log(err)
          uni.showToast({
            title: '支付失败！' + err, duration: 2000, icon: 'none', mask: true,
          })
        })
      }
    }
  })
}

function cancel() {
  uni.showModal({
    title: "是否取消订单？", confirmText: "否", cancelText: "是", confirmColor: "#11c53e", cancelColor: "red",
    success: (option) => {
      if (option.cancel) { //点击了确认取消
        changeOrderState(orderInfo.value.id, cancelled).then(() => { //改变订单状态成功
          uni.showToast({ //显示取消成功并跳转到首页
            title: '取消成功', duration: 750, mask: true, success: () => {
              setTimeout(() => {
                uni.switchTab({url: '/pages/index/index'})
              }, 750)
            }
          })
        }).catch((err) => { //改变订单状态失败
          console.log(err)
          uni.showToast({
            title: '取消失败！' + err, duration: 2000, icon: 'none', mask: true,
          })
        })
      }
    }
  })
}

function cancelOrder() {
  uni.switchTab({url: '/pages/my/my'})
}
</script>

<style lang="scss">
page {
  background-color: #f1f3f5;
}

.to-be-paid {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .countdown {
    margin-top: 40rpx;
    display: flex;
  }

  .Card {
    width: 86%;
  }

  .option {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;

    button {
      width: 50%;
      border-radius: 0;
    }
  }

  .empty {
    position: absolute;
    top: 50%;
    margin: auto;
    font-size: 50rpx;
  }
}
</style>