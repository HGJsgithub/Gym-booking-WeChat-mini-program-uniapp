const baseUrl = getApp().globalData.baseUrl

export default function getVenueState(venueTypeEN, venueState, venueNum, venueState1, venueNum1, venueState2, venueNum2, show) {
    uni.request({
        url: baseUrl + '/venue/state/table', data: {
            venueType: venueTypeEN
        }, header: {
            "ngrok-skip-browser-warning": "true",
        }, success: (res) => {
            if (res.statusCode != 200) {
                uni.hideLoading()
                console.log(res.data)
                uni.showToast({
                    title: '查询场地状态表出错了...', icon: "none", mask: true,
                })
            } else {
                venueState.value = res.data.today
                venueNum.value = venueState.value.length

                venueState1.value = res.data.today
                venueNum1.value = venueState1.value.length

                venueState2.value = res.data.tomorrow
                venueNum2.value = venueState2.value.length

                show.value = true
                uni.hideLoading();
            }
        }
    })
}