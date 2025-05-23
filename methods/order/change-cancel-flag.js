const baseUrl = getApp().globalData.baseUrl

export default function changeCancelFlag(id) {
    const token = uni.getStorageSync("token")
    uni.request({
        url: baseUrl + '/order/changeOrder/changeCancelFlag', method: 'POST', data: {
            id: id
        }, header: {
            "Content-Type": "application/x-www-form-urlencoded", "token": token
        }, success: (res) => {
            if (res.statusCode !== 200) {
                console.log("出现未知错误！")
            }
        }, fail: (err) => {
            console.log(err)
            uni.showToast({title: "网络请求错误！", icon: "none", duration: 2000})
        }
    })
}