<template>
  <view class="order-card">
    <view class="order-card-title">
      <view style="width: fit-content;">{{ props.afterSalesOrder.venueType }}</view>
      <view style="display: flex;align-items: center;">
        <view style="width: fit-content;font-weight: 500;">总金额 ：</view>
        <view style="width: fit-content;font-size: 35rpx;font-weight: bold;">
          ¥{{ props.afterSalesOrder.venue1.price + props.afterSalesOrder.venue2.price }}
        </view>
      </view>
    </view>
    <view class="thin-line"></view>

    <view class="order-card-detail">
      <view class="order-number-area">
        <view class="order-number-text">订单编号</view>
        <view class="text">{{ props.afterSalesOrder.id }}</view>
      </view>
      <view class="booking-date-area">
        <view class="booking-date-text">预约日期</view>
        <view class="text">{{ props.afterSalesOrder.bookingDate }}</view>
      </view>
      <view class="use-date-area">
        <view class="use-date-text">使用日期</view>
        <view class="text">{{ props.afterSalesOrder.useDate }}</view>
      </view>
    </view>
    <view class="thick-line"></view>
    <view class="venue">
      <view class="number-time">
        <view class="venue-number-area">{{ props.afterSalesOrder.venue1.id + 1 }} 号场</view>
        <view class="time-area">
          <view class="sometime" v-for="(item,index) in props.afterSalesOrder.venue1.time" :key="index">
            {{ item }}
          </view>
        </view>
      </view>
      <view class="price-area">¥{{ props.afterSalesOrder.venue1.price }}</view>
    </view>
    <view class="thick-line" v-if="show"></view>
    <view class="venue" v-if="show">
      <view class="number-time">
        <view class="venue-number-area">{{ props.afterSalesOrder.venue2.id + 1 }} 号场</view>
        <view class="time-area">
          <view class="sometime" v-for="(item,index) in props.afterSalesOrder.venue2.time" :key="index">
            {{ item }}
          </view>
        </view>
      </view>
      <view class="price-area">¥{{ props.afterSalesOrder.venue2.price }}</view>
    </view>
    <view class="revoke">
      <button type="primary" @click="revoke()">撤销</button>
    </view>
  </view>
</template>

<script setup>
import changeOrderState from "@/methods/order/change-order-state";

const props = defineProps({
  afterSalesOrder: {
    id: Number,
    venueType: String,
    count: Number,
    bookingDate: String,
    useDate: String,
    venue1: {
      id: Number,
      time: [],
      price: Number
    },
    venue2: {
      id: Number,
      time: [],
      price: Number
    },
    cancelFlag: Boolean
  }
})
let show = computed(
    () => {
      if (props.afterSalesOrder.count == 2) {
        return true
      } else {
        return false
      }
    }
)

function revoke() {
  uni.showModal({
    title: "是否撤销？", content: '注意！撤销后无法再次申请!',
    confirmText: "否", cancelText: "是",
    confirmColor: "#11c53e", cancelColor: "#ff0000",
    success: (option) => {
      if (option.cancel) { //点击了“是”撤销
        changeOrderState(props.afterSalesOrder.id, '待使用').then(() => {
          uni.showToast({
            icon: 'success', duration: 1000, mask: true
          })
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/order/after-sales'
            })
          }, 1000)
        }).catch(err => {
          uni.showToast({
            title: err, icon: 'none', duration: 1000
          })
        })
      }
    }
  })
}
</script>

<style lang="scss">
.order-card {
  background-color: #fff;
  width: 100%;
  margin-top: 40rpx;
  margin-bottom: 80rpx;
  border-radius: 15rpx;

  .order-card-title {
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .thin-line {
    width: 94%;
    height: 0.5px;
    margin: auto;
    background-color: #c6c6c6;
  }

  .order-card-detail {
    padding: 30rpx;

    .text {
      font-size: 27rpx;
    }

    .order-number-area {
      margin-bottom: 10rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .order-number-text {
        width: fit-content;
        color: #6b6b6b;
        font-size: 26rpx;
      }
    }

    .booking-date-area {
      display: flex;
      margin-bottom: 10rpx;
      justify-content: space-between;
      align-items: center;

      .booking-date-text {
        width: fit-content;
        color: #6b6b6b;
        font-size: 26rpx;
      }
    }

    .use-date-area {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .use-date-text {
        width: fit-content;
        color: #6b6b6b;
        font-size: 26rpx;
      }
    }
  }

  .thick-line {
    width: 94%;
    height: 4px;
    margin: auto;
    background-color: #e3e3e3;
  }

  .venue {
    box-sizing: border-box;
    width: 100%;
    padding: 30rpx;
    display: flex;

    .number-time {

      .venue-number-area {
        margin-bottom: 15rpx;
        width: fit-content;
        font-weight: bold;
        font-size: 30rpx;
      }

      .time-area {
        width: 475rpx;
        display: flex;
        flex-wrap: wrap;
        font-size: 25rpx;
        color: #6b6b6b;

        .sometime {
          margin-right: 20rpx;
        }
      }
    }

    .price-area {
      flex: 1;
      align-self: center;
      text-align: end;
      font-weight: 500;
      font-size: 30rpx;
    }
  }

  .revoke {
    button {
      font-size: 25rpx;
    }
  }
}
</style>