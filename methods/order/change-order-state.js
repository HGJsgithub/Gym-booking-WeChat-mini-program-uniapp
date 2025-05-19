const baseUrl = getApp().globalData.baseUrl

export default function changeOrderState(id, state) {
    const token = uni.getStorageSync("token")
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + '/order/changeOrder/changeOrderState', method: 'POST', data: {
                id: id, state: state
            }, header: {
                "Content-Type": "application/x-www-form-urlencoded", "token": token
            }, success: (res) => {
                if (res.statusCode === 200) {
                    resolve()
                    return
                }
                if (res.statusCode === 500) {
                    console.log(res.data)
                    reject("服务器出错了...")
                    return
                }
                reject("没有找到相应的订单！")
            }, fail: (err) => {
                console.log(err)
                reject("发送网络请求错误")
            }
        })
    })
}