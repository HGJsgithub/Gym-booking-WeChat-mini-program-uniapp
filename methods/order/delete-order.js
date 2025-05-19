export default function deleteOrder(id, url) {
    const baseUrl = getApp().globalData.baseUrl
    const token = uni.getStorageSync("token")
    uni.showModal({
        title: "是否删除此订单？", content: "注意删除后无法恢复!", confirmText: "是", cancelText: "否",
        confirmColor: "#ff0000", cancelColor: "#11c53e",
        success: (opt) => {
            if (opt.confirm) {
                uni.request({
                    url: baseUrl + '/order/changeOrder/delete', method: "POST", data: {
                        id: id
                    }, header: {
                        "Content-Type": "application/x-www-form-urlencoded", "token": token
                    }, success: (res) => {
                        if (res.statusCode == 200) {
                            setTimeout(() => {
                                uni.redirectTo({
                                    url: url
                                })
                            }, 250)
                        } else {
                            console.log(res.data)
                            uni.showToast({title: "服务器似乎出了点问题...", icon: "none", duration: 1750,})
                        }
                    }, fail: (err) => {
                        console.log(err)
                        uni.showToast({title: "网络似乎出了问题...", icon: "none", duration: 1250,})
                    }
                })
            }
        }
    })
}