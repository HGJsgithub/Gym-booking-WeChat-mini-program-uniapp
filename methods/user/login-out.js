export default function loginOut() {
    uni.showModal({
        title: "是否退出登录？", confirmText: "否", cancelText: "是", confirmColor: "#000000", success: (res) => {
            if (res.cancel) {
                const avatarCache = uni.getStorageSync("avatarCache")
                uni.clearStorageSync()
                uni.setStorageSync("avatarCache", avatarCache)
                uni.showToast({
                    title: '已退出', icon: 'success', duration: 750, mask: true
                });
                setTimeout(() => {
                    uni.switchTab({
                        url: '/pages/index/index'
                    })
                }, 750);

            }
        }
    })
}