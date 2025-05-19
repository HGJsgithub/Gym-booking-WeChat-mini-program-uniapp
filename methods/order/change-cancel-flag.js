const baseUrl = getApp().globalData.baseUrl

export default function changeCancelFlag(id) {
    const token = uni.getStorageSync("token")
    uni.request({
        url: baseUrl + '/order/changeOrder/changeCancelFlag', method: 'POST', data: {
            id: id
        }, header: {
            "Content-Type": "application/x-www-form-urlencoded", "token": token
        }
    })
}