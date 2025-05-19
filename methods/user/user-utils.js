export function checkPhoneFormat(phone) { //判断手机号是否有误，正常返回true
    console.log('phone :>> ', phone);
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

export function checkPasswordFormat(password) { //判断密码是否小于6位，正常返回true
    console.log('password :>> ', password);
    if (password.length < 6) {
        return false
    } else {
        return true
    }
}

export function checkPwdSame(password, confirmPwd) {
    if (password == confirmPwd) {
        return true
    } else {
        return false
    }
}

export function hasBeenLogin(loginState, path) {
    if (!loginState) {
        uni.showToast({
            title: '您还未登录！', duration: 1000, mask: true, success: () => {
                setTimeout(() => {
                    uni.navigateTo({url: '/pages/login-registration/login/user-login'})
                }, 1000)
            }
        })
        return false
    } else {
        if (path.length != 0) {
            uni.navigateTo({url: path})
        }
        return true
    }
}

