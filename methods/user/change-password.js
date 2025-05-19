export default function changePassword(newPassword, userInfo, f1, f2, f3) {
    const baseUrl = getApp().globalData.baseUrl
    if (f1 == false || f2 == false || f3 == false) {
        return
    }
    const token = uni.getStorageSync('token')
    uni.request({
        url: baseUrl + '/user/changePassword', method: 'POST', data: {
            password: newPassword
        }, header: {
            "Content-Type": "application/x-www-form-urlencoded", "token": token
        }, success: (res) => {
            if (res.statusCode == 200) {
                userInfo.password = newPassword
                uni.setStorageSync('userInfo', userInfo)
                uni.showToast({
                    title: '修改成功', icon: 'success', duration: 1000, success: () => {
                        setTimeout(() => {
                            uni.switchTab({
                                url: '/pages/my/my'
                            });
                        }, 1000);
                    }
                })
            } else {
                console.log(res.data)
                uni.showToast({
                    title: '服务器好像开了小差...', icon: "error", duration: 1000, mask: true,
                })
            }
        }, fail: (err) => {
            console.log(err)
            uni.showToast({
                title: '网络请求失败!', icon: "error", duration: 1000, mask: true,
            })
        }
    })
}