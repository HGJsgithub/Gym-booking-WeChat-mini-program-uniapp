<template>
  <view class="order-card">
    <view class="order-card-title">
      <view style="width: fit-content;">{{ props.generalOrder.venueType }}</view>
      <view style="display: flex;align-items: center;">
        <view style="width: fit-content;font-weight: 500;">总金额 ：</view>
        <view style="width: fit-content;font-size: 35rpx;">
          ¥{{ props.generalOrder.venue1.price + props.generalOrder.venue2.price }}
        </view>
      </view>

    </view>
    <view class="thin-line"></view>

    <view class="order-card-detail">
      <view class="order-number-area">
        <view class="order-number-text">订单编号</view>
        <view class="text">{{ props.generalOrder.id }}</view>
      </view>
      <view class="booking-date-area">
        <view class="booking-date-text">预约日期</view>
        <view class="text">{{ props.generalOrder.bookingDate }}</view>
      </view>
      <view class="use-date-area">
        <view class="use-date-text">使用日期</view>
        <view class="text">{{ props.generalOrder.useDate }}</view>
      </view>
    </view>
    <view class="thick-line"></view>
    <view class="venue">
      <view class="number-time">
        <view class="venue-number-area">{{ props.generalOrder.venue1.id+ 1 }} 号场</view>
        <view class="time-area">
          <view class="sometime" v-for="(item,index) in props.generalOrder.venue1.time" :key="index">
            {{ item }}
          </view>
        </view>
      </view>
      <view class="price-area">¥{{ props.generalOrder.venue1.price }}</view>
    </view>
    <view class="thick-line" v-if="show"></view>
    <view class="venue" v-if="show">
      <view class="number-time">
        <view class="venue-number-area">{{ props.generalOrder.venue2.id + 1 }} 号场</view>
        <view class="time-area">
          <view class="sometime" v-for="(item,index) in props.generalOrder.venue2.time" :key="index">
            {{ item }}
          </view>
        </view>
      </view>
      <view class="price-area">¥{{ props.generalOrder.venue2.price }}</view>
    </view>
    <view class="thick-line" v-if="flag"></view>
    <view class="delete-button" v-if="flag" @click="deleteOrder(props.generalOrder.id,props.pageURL)">
      删除
    </view>
  </view>
</template>

<script setup>
import {
  computed,
} from 'vue';
import deleteOrder from "@/methods/order/delete-order";

const props = defineProps({
  generalOrder: {
    state: String,
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
  },
  pageURL: String
})
let show = computed(
    () => {
      if (props.generalOrder.count == 2) {
        return true
      } else {
        return false
      }
    }
)
let flag = computed(
    () => {
      if (props.generalOrder.state == '待支付') {
        return false
      } else {
        return true
      }
    }
)
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
    font-weight: bold;
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

  .delete-button {
    color: #545454;
    padding-top: 15rpx;
    padding-bottom: 20rpx;
    padding-left: 85%;
  }
}
</style>