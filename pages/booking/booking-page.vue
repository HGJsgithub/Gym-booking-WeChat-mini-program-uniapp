<template>
  <view class="whole-page" v-if="show">
    <date-select @selectDate="selectDate"></date-select>
    <view class="select-menu">
      <view class="time-area">
        <view class="venue-type">{{ venueTypeCN }}</view>
        <view class="time-list">
          <view class="sometime" v-for="(time,index) in timeList" :key="index">
            {{ time }}
          </view>
        </view>
      </view>
      <scroll-view class="select-venue" scroll-x="true" enable-flex="true">
        <view class="one-venue" v-for="(_,venue_id) in venueNum" :key="venue_id">
          <view class="venue-ID">场地 {{ venue_id + 1 }}</view>
          <view class="button-list">
            <view class="one-button-view" v-for="(price,time) in priceList" :key="time">
              <button class="one-button" size="mini" type="primary" plain=true hover-class="none"
                      :disabled="venueState[venue_id][time]"
                      :class="{'active': selectedTable[venue_id][time]}"
                      @click="selectedButton(venue_id,time)">
                ¥{{ price }}
              </button>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="tip">
      <view class="tip-buttons">
        <button size="mini" hover-class="none" style="color: white;background-color: #11c53e;">已选</button>
        <button size="mini" hover-class="none" type="primary" plain=false>可选</button>
        <button size="mini" plain=true hover-class="none" disabled=true>已订</button>
      </view>
      <view>左右滑动屏幕选择更多场地</view>
    </view>
    <button class="createOrderButton" type="primary" @click="createOrder(venueTypeCN,venueTypeEN,count,selectedTable,
			firstSelectedVenue,secondSelectedVenue,timeList,timeSlot,timeNum,
			priceList,userID,bookingDate,useDate)">生成订单
    </button>
  </view>

</template>
<script setup>
import createFormattedDate from '../../common/utils/create-formatt-date/createFormattedDate';
import createOrder from "@/methods/order/create-order";
import getVenueState from "@/methods/venue/get-venue-state";

uni.showLoading({
  title: '加载中'
});

const systemInfo = uni.getSystemInfoSync()

const height = `${systemInfo.windowHeight - 46}px`

//用来判断是否从数据库获得场地状态表
let show = ref(false)

//用来判断是否从数据库获得明天的场地状态表
const loginState = uni.getStorageSync('loginState')
let user = ref(uni.getStorageSync('userInfo'))
let userID = String
if (user.value != null) {
  userID = user.value.id
}

//格式化的今天日期，如：2024-11-11
const today = createFormattedDate.createFormattedTodayDate()
const tomorrow = createFormattedDate.createFormattedTomorrowDate()

//使用日期，即用户选择在哪天使用。
let useDate = today
//预约日期，即在哪天预约的场地
const bookingDate = today

//todayOrTomorrow用来判断用户选择预约的日期是今天还是明天。todayOrTomorrow = today 或者 tomorrow
uni.setStorageSync('todayOrTomorrow', 'today')

const timeList = [
  "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00",
  "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00"
]

const timeSlot = ["t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16", "t17", "t18", "t19", "t20", "t21"]

const timeNum = timeList.length

const priceList = [10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 25, 25, 25] //要改！

let venueTypeCN = ref(String)
let venueTypeEN = ref(String)
let venueState = ref([null])
let venueNum = ref(100)
let venueState1 = ref([null])
let venueNum1 = ref(100)
let venueState2 = ref([null])
let venueNum2 = ref(100)

//场地选择状态表，用来记录被选择的场地
let selectedTable = ref([])
for (let i = 0; i < venueNum.value; i++) {
  selectedTable.value[i] = []
  for (let j = 0; j < timeNum; j++) {
    selectedTable.value[i][j] = false
  }
}

let firstSelectedVenue = -1 //第一次选择的场地编号
let secondSelectedVenue = -1 //第二次选择的场地编号

let count = 0 // 已经选择的场地数量

onLoad(() => {
  uni.$once('indexRes', (res) => {
    venueTypeCN.value = res.venueTypeCN
    venueTypeEN.value = res.venueTypeEN
    //获取今天和明天的场地状态表
    getVenueState(venueTypeEN.value, venueState, venueNum,
        venueState1, venueNum1, venueState2, venueNum2, show)
  })
})

//e代表选择的日期，0表示今天，1表示明天
function selectDate(e) {
  //每次进入页面前都要初始化数据
  for (let i = 0; i < venueNum.value; i++) {
    selectedTable.value[i] = []
    for (let j = 0; j < timeNum; j++) {
      selectedTable.value[i][j] = false
    }
  }
  firstSelectedVenue = -1
  secondSelectedVenue = -1
  count = 0

  // e = 0 说明选择了今天
  if (e == 0) {
    venueState.value = venueState1.value
    venueNum.value = venueNum1.value
    //使用日期改为今天
    useDate = today
    uni.setStorageSync('todayOrTomorrow', 'today')
  }
  // e = 1 说明选择了明天
  if (e == 1) {
    venueState.value = venueState2.value
    venueNum.value = venueNum2.value
    //使用日期改为明天
    useDate = tomorrow
    uni.setStorageSync('todayOrTomorrow', 'tomorrow')
  }
}

//改变已选场地状态表
function changeSelectedTable(venue_id, time) {
  selectedTable.value[venue_id][time] = !selectedTable.value[venue_id][time]
}

//用来改变被选择场地按钮的样式
function selectedButton(venue_id, time) {
  if (loginState == false) {
    uni.showToast({
      title: '您还未登录！',
      duration: 500,
      mask: true,
      success: () => {
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login-registration/login/user-login',
          })
        }, 500)
      }
    })
    return
  }
  if (count == 0) { //0说明没有选择场地
    changeSelectedTable(venue_id, time) //改变场地已选状态
    firstSelectedVenue = venue_id
  } else if (count == 1) { //1说明选择了一个场地
    if (firstSelectedVenue != venue_id) { //说明第二次选择的场地和第一次选择的不同
      changeSelectedTable(venue_id, time)
      secondSelectedVenue = venue_id
    } else { //说明这次选择的场地和第一次相同
      changeSelectedTable(venue_id, time)
    }
  } else if (count == 2) { //说明已经选择了两个不同的场地
    if (venue_id == firstSelectedVenue || venue_id == secondSelectedVenue) { //说明这次选择的场地是之前选择的两个之一，也就是不同的时间段
      changeSelectedTable(venue_id, time)
    } else { //说明选择了第三个不同的场地
      uni.showToast({
        title: '一次只能预订两个不同的场地！',
        icon: 'none'
      })
    }

  }
  count = 0
  //计算已经选择的场地数量
  for (let i = 0; i < venueNum.value; i++) {
    for (let j = 0; j < timeNum; j++) {
      if (selectedTable.value[i][j] == true) {
        count++
        break
      }
    }
  }
}
</script>

<style lang="scss">
.whole-page {
  width: 100%;
  height: v-bind(height);
  display: flex;
  flex-direction: column;

  .select-menu {
    flex: 7;
    display: flex;

    .time-area {
      height: 100%;
      padding-left: 4%;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      .venue-type {
        text-align: center;
      }

      .time-list {
        flex: 1;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .sometime {
          flex: 1;
          padding-bottom: 8rpx;
          display: flex;
          align-items: center;
        }
      }
    }

    .select-venue {
      display: flex;
      padding-left: 3%;
      padding-right: 3%;
      overflow: auto;

      .one-venue {
        width: 120rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;

        display: flex;
        flex-direction: column;

        .venue-ID {
          text-align: center;
        }

        .button-list {
          padding-top: 10rpx;
          padding-bottom: 10rpx;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;

          .one-button-view {
            flex: 1;
            display: flex;
            align-items: center;
          }

          .active {
            color: white;
            background-color: #11c53e;
          }

        }
      }
    }

  }

  .tip {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .tip-buttons {
      width: 60%;
      display: flex;
      justify-content: space-between;
    }
  }

  .createOrderButton {
    position: fixed;
    width: 100%;
    bottom: 0;
    border-radius: 0;
  }
}
</style>