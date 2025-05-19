import {
    hasBeenLogin
} from "@/methods/user/user-utils";

const baseUrl = getApp().globalData.baseUrl

//上传用户头像到服务器
function uploadAvatar(avatarPath, userInfo) {
    const token = uni.getStorageSync('token')
    return new Promise((reject) => {
        uni.uploadFile({
            url: baseUrl + '/user/avatar', filePath: avatarPath, name: 'avatar', header: {
                "token": token
            }, success: (res) => {
                if (res.code == 200) {
                    userInfo.avatarSRC = res.data
                } else {
                    reject(res.data)
                }
            }, fail: (err) => {
                console.log(err)
                reject("发送网络请求错误！")
            }
        })
    })
}

function cacheAvatar(avatarPath) {
    uni.saveFile({
        tempFilePath: avatarPath, success: (res) => {
            uni.setStorageSync('avatarCache', res.savedFilePath)
        }, fail: (err) => {
            console.log(err)
        }
    })
}

export function handleCrop(crop) {
    uni.showLoading({
        title: '上传图片中...', mask: true,
    })
    const uploadPath = crop.tempFilePath
    //缓存头像到本地
    cacheAvatar(uploadPath)
    //调用uploadAvatar上传头像
    const userInfo = uni.getStorageSync('userInfo')
    uploadAvatar(uploadPath, userInfo).then(() => {
        uni.hideLoading()
        uni.showToast({
            title: '上传成功', icon: 'success', duration: 1000, mask: true,
        })
    }).catch((err) => {
        uni.hideLoading()
        uni.showToast({
            title: err, duration: 1000, mask: true,
        })
    }).finally(() => {
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/my/my',
            })
        }, 1000)
    })
}

// 更换头像
export function changeAvatar(loginState) {
    if (!hasBeenLogin(loginState, '')) {
        return
    }
    const text = ["更换头像"]
    uni.showActionSheet({
        itemList: text, success: (opt) => {
            if (opt.tapIndex == 0) { //选择了更换头像
                uni.navigateTo({
                    url: '/pages/my/changeAvatar'
                })
            }
        }
    })
}