const baseUrl = getApp().globalData.baseUrl

export default function getOrderList(userID, orderState) {
    const token = uni.getStorageSync("token")
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + "/order/list", data: {
                userID: userID, state: orderState
            }, header: {
                "ngrok-skip-browser-warning": "true", "token": token
            }, success: (res) => {
                if (res.statusCode == 200) {
                    if (res.data.orderList.length > 0) {
                        resolve({
                            msg: "查询订单列表成功",
                            orderList: res.data.orderList,
                            remainingMinutes: res.data.remainingMinutes,
                            remainingSeconds: res.data.remainingSeconds,
                        });
                    } else {
                        resolve({msg: "没有订单"});
                    }
                } else {
                    reject("读取订单时出错！")
                }
            }, fail: (err) => {
                console.log(err)
                reject("发送网络请求出错！")
            }
        })
    })
}