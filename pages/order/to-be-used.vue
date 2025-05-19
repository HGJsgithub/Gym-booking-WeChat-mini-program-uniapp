<template>
  <view class="to-be-used">
    <view class="Card" v-if="show">
      <to-be-used-card v-for="(_,index) in orderList" :key="index"
                       :toBeUsedOrder="orderList[index]"></to-be-used-card>
    </view>
    <view class="empty" v-else>
      这里什么也没有哦
    </view>
  </view>
</template>

<script setup>
import getOrderList from "@/methods/order/get-order-list";

uni.showLoading({
  title: '加载中'
});
const userID = uni.getStorageSync('userInfo').id
let orderList = ref([])
let show = ref(false)
getOrderList(userID, '待使用').then((res) => {
  console.log(res.msg)
  if (res.orderList) {
    orderList.value = res.orderList.reverse()
    show.value = true
  }
}).catch((err) => {
  console.log(err)
  uni.showToast({
    title: err,
    duration: 1000,
  })
}).finally(() => {
  uni.hideLoading()
})
</script>

<style lang="scss">
page {
  background-color: #f1f3f5;
}

.to-be-used {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .Card {
    width: 86%;
  }

  .empty {
    position: absolute;
    top: 50%;
    margin: auto;
    font-size: 50rpx;
  }
}
</style>