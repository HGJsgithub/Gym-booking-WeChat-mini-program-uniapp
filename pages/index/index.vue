<template>
  <view class="index">
    <swiper class="swiperbanner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
            indicator-active-color="#fff">
      <swiper-item>
        <image src="http://5b0988e595225.cdn.sohucs.com/images/20180202/5cbb0079f85147b88cb246a5213956a2.jpeg"
               mode="scaleToFill"></image>
      </swiper-item>
      <swiper-item>
        <image
            src="https://tse2-mm.cn.bing.net/th/id/OIP-C.yf-8oMFP9SP87IvzbMTU3wHaEK?w=291&h=181&c=7&r=0&o=5&pid=1.7"
            mode="scaleToFill"></image>
      </swiper-item>
      <swiper-item>
        <image src="http://p0.ifengimg.com/a/2016/0818/d6b5ede1d3a7678size116_w893_h473.jpg" mode="scaleToFill">
        </image>
      </swiper-item>
      <swiper-item>
        <image src="http://fitimg.yunimg.cn/production/item/202008/261598406697-4866746284616542208.jpg"
               mode="scaleToFill"></image>
      </swiper-item>
    </swiper>
    <view class="quickEntryArea">
      <view class="option">
        <button class="icon-button" hover-class="my-hover"
                @click="navigateTo('/pages/booking/booking-page','羽毛球','badminton')">
          <image src="../../static/quickEntry_icon/badminton.png"></image>
        </button>
        <view class="name">羽毛球</view>
      </view>

      <view class="option">
        <button class="icon-button" hover-class="my-hover"
                @click="navigateTo('/pages/booking/booking-page','乒乓球','tableTennis')">
          <image src="../../static/quickEntry_icon/tableTennis.png"></image>
        </button>
        <view class="name">乒乓球</view>
      </view>
      <view class="option">
        <button class="icon-button" hover-class="my-hover"
                @click="navigateTo('/pages/booking/booking-page','网球','tennis')">
          <image src="../../static/quickEntry_icon/tennis.png"></image>
        </button>
        <view class="name">网球</view>
      </view>
      <view class="option">
        <button class="icon-button" hover-class="my-hover"
                @click="navigateTo('/pages/booking/unopen-venue','篮球')">
          <image src="../../static/quickEntry_icon/basketball.png"></image>
        </button>
        <view class="name">篮球</view>
      </view>
      <view class="option">
        <button class="icon-button" hover-class="my-hover"
                @click="navigateTo('/pages/booking/unopen-venue','游泳')">
          <image src="../../static/quickEntry_icon/swimming.png"></image>
        </button>
        <view class="name">游泳</view>
      </view>
      <view class="option">
        <button class="icon-button" hover-class="my-hover"
                @click="navigateTo('/pages/booking/unopen-venue','健身')">
          <image src="../../static/quickEntry_icon/bodybuilding.png"></image>
        </button>
        <view class="name">健身房</view>
      </view>
    </view>
    <announcement v-for="(_,index) in annList" :key="index" :ann="annList[index]"></announcement>
  </view>
</template>

<script setup>
import getAnn from "@/methods/announcement/get-announcement";

let annList = ref([])
getApp().sayhi()
onLoad(() => {
  getAnn(annList)
  //annList.value.length = 0 说明还没有获取公告
  if (annList.value.length == 0) {
    //annList.value.length != 0 说明已经获取了公告，可以重新跳转刷新页面以展示公告，防止没有成功获取公告会一直跳转的情况发生
    if (annList.value.length != 0) {
      uni.reLaunch({
        url: "/pages/index/index"
      })
    }
  }
})

function navigateTo(pagePath, venueTypeCN, venueTypeEN) {
  uni.navigateTo({
    url: pagePath,
    success: () => {
      uni.$emit('indexRes', {
        venueTypeCN: venueTypeCN,
        venueTypeEN: venueTypeEN,
      })
    }
  })
}
</script>

<style lang="scss">
page {
  background-color: #f1f3f5;
}

.index {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .swiperbanner {
    width: 100%;
    height: 400rpx;

    image {
      width: 100%;
    }

  }

  .quickEntryArea {
    background-color: #ffffff;
    width: 90%;
    height: 450rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    margin: 50rpx auto;

    border-radius: 20rpx;

    .option {
      width: 150rpx;
      height: 180rpx;
      padding: 20rpx;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .icon-button {
        width: 120rpx;
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: 1px solid #11c53e;
        border-radius: 30rpx;
        background-color: #ffffff;


        image {
          width: 100rpx;
          height: 100rpx;
        }
      }

      .my-hover {
        background-color: #f1f3f5;
      }

      .name {
        padding-top: 10rpx;
        text-align: center;
      }
    }


  }

  announcement {
    width: 90%;
  }
}
</style>