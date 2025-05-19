const baseUrl = getApp().globalData.baseUrl

export default function getAnn(annList) {
    uni.request({
        url: baseUrl + "/announcement/get", header: {
            "ngrok-skip-browser-warning": "true"
        }, success: (res) => {
            if (res.statusCode != 200) {
                uni.showToast({
                    title: '获取公告失败惹...', icon: "none", duration: 1750,
                })
                console.log('查询公告错误信息 :>> ', res.data)
                return
            }
            annList.value = res.data
        }, fail: (err) => {
            console.log(err)
            uni.showToast({
                title: '获取公告时的网络不佳...', icon: "none", duration: 1750,
            })
        }
    })
}
