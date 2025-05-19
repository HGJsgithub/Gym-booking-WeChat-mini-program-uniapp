const baseUrl = getApp().globalData.baseUrl

export default function saveOrder(order) {
    const token = uni.getStorageSync("token")
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + '/order/changeOrder/saveOrder', method: 'POST', data: order, header: {
                "Content-Type": "application/json", "token": token
            }, success: (res) => {
                if (res.statusCode == 200) {
                    resolve()
                } else {
                    reject(res.data.err);
                }
            }, fail: (err) => {
                console.log(err)
                reject("网络请求出错！");
            }
        })
    })
}