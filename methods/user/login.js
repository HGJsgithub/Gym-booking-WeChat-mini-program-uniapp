import {checkPhoneFormat, checkPasswordFormat} from "@/methods/user/user-utils";

const baseUrl = getApp().globalData.baseUrl

function ShowLoginSuccess(title) {
    uni.showToast({title: title, duration: 750, mask: true,})
    setTimeout(() => {
        uni.switchTab({url: "/pages/my/my"})
    }, 750)
}

function userAuth(phone, password) {
    uni.showLoading({mask: true})
    uni.request({
        url: baseUrl + "/user/login", method: "POST", data: {
            phone: phone, password: password,
        }, header: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, success: (res) => {
            uni.hideLoading()
            if (res.statusCode === 200) {
                uni.setStorageSync('loginState', true)
                uni.setStorageSync('userInfo', res.data.userInfo)
                uni.setStorageSync('token', res.data.token)
                ShowLoginSuccess('登录成功！')
                return
            }
            if (res.statusCode === 401) {
                uni.showToast({title: '密码错误！', icon: 'none'})
                return
            }
            if (res.statusCode === 405) {
                uni.showToast({
                    title: '您尚未注册！', icon: 'none'
                })
                return
            }
            uni.showToast({
                title: '服务器好像开了小差...', icon: "none", duration: 1000, mask: true,
            })

        }, fail: (err) => {
            uni.hideLoading()
            console.log(err)
            uni.showToast({title: '发送网络请求错误！', icon: 'none', duration: 1000, mask: true,})
        }
    })
}

export default function login(phone, password) {
    if (phone == '' || password == '') {
        if (phone == '') {
            uni.showToast({
                title: "请输入手机号！", icon: "none"
            })
            return
        }
        if (password == '') {
            uni.showToast({
                title: "请输入密码！", icon: "none"
            })
            return
        }
    }
    if (!checkPhoneFormat(phone)) {
        uni.showToast({
            title: "手机号错误！", icon: "none"
        })
        return
    }
    if (!checkPasswordFormat(password)) {
        uni.showToast({
            title: "密码不能少于6位！", icon: "none"
        })
        return
    }
    userAuth(phone, password)
}