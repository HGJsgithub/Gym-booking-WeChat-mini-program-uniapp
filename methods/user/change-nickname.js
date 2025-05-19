export default function changeNickname(newNickname, userInfo) {
    const baseUrl = getApp().globalData.baseUrl
    const token = uni.getStorageSync('token')
    if (newNickname.length < 2) {
        uni.showToast({
            title: '至少要2个字符哦', icon: 'none', duration: 500
        });
        return;
    }
    uni.showLoading({mask: true,})
    uni.request({
        url: baseUrl + '/user/changeNickname', method: 'POST', data: {
            nickname: newNickname
        }, header: {
            "Content-Type": "application/x-www-form-urlencoded", "token": token
        }, success: (res) => {
            uni.hideLoading()
            if (res.statusCode == 200) {
                userInfo.nickname = newNickname;
                uni.setStorageSync('userInfo', userInfo);
                uni.showToast({
                    title: '修改成功', icon: 'success', duration: 1000, success: () => {
                        setTimeout(() => {
                            uni.switchTab({
                                url: '/pages/my/my'
                            });
                        }, 1000)
                    }
                })
            } else {
                console.log(res.data);
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
    });
}