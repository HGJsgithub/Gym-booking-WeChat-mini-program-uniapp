<template>
  <view class="selectDate">
    <uni-segmented-control :current=0 :values="todayAndTomorrow" @clickItem="handleSelectDate" styleType="button"
                           activeColor="#11c53e"></uni-segmented-control>
  </view>

</template>

<script setup>
import createFormattedDate from '../../common/utils/create-formatt-date/createFormattedDate'

const todayAndTomorrow = createFormattedDate.createTodayAndTomorrowDateForSelect()
const emit = defineEmits(["selectDate"])

function handleSelectDate(e) {
  emit("selectDate", e.currentIndex)
}
</script>

<style lang="scss">
.selectDate {
  padding: 4%;
  padding-bottom: 3%;
}
</style>