import {checkPhoneFormat, checkPasswordFormat, checkPwdSame} from "@/methods/user/user-utils";

const baseUrl = getApp().globalData.baseUrl

function createNewUser(newUser) {
    uni.showLoading({mask: true})
    uni.request({
        url: baseUrl + "/user/registration", method: "POST", data: newUser, header: {
            "Content-Type": "application/json"
        }, success: (res) => {
            uni.hideLoading()
            if (res.statusCode === 201) {
                uni.showToast({
                    title: '注册成功', icon: 'success', duration: 1000, mask: true, success: () => {
                        setTimeout(() => {
                            uni.reLaunch({url: "/pages/login-registration/login/user-login"})
                        }, 1000)
                    }
                })
                return
            }
            if (res.statusCode === 403) {
                uni.showToast({title: '该号码已注册！', icon: "none", duration: 1000, mask: true,})
                return
            }
            console.log(res.data);
            uni.showToast({title: "服务器好像开了小差...", icon: "none", duration: 1000, mask: true,})
        }, fail: (err) => {
            uni.hideLoading()
            console.log(err)
            uni.showToast({title: '发送网络请求失败！', icon: 'none', duration: 1000, mask: true,})
        }
    })
}

export default function registration(newUser, confirmPwd) {
    if (newUser.phone === '') {
        uni.showToast({title: "请输入手机号！", icon: "none"})
        return
    }
    if (newUser.nickname === '') {
        uni.showToast({title: "请输入昵称！", icon: "none"})
        return
    }
    if (newUser.password === '') {
        uni.showToast({title: "请输入密码！", icon: "none"})
        return
    }
    if (confirmPwd === '') {
        uni.showToast({title: "请再次确认密码！", icon: "none"})
        return
    }
    if (!checkPhoneFormat(newUser.phone)) {
        uni.showToast({title: "手机号错误！", icon: "none"})
        return
    }
    if (!checkPasswordFormat(newUser.password)) {
        uni.showToast({title: "密码不能少于6位！", icon: "none"})
        return
    }
    if (!checkPwdSame(newUser.password, confirmPwd)) {
        uni.showToast({title: "两次输入的密码不同！", icon: "none"})
        return
    }
    createNewUser(newUser)
}