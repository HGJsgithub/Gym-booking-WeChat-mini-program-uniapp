import saveOrder from "@/methods/order/save-order";
import changeVenueState from "@/methods/venue/change-venue-state";
import getOrderList from "@/methods/order/get-order-list";

function createOrderDetail(id, time, price) {
    let order = new Object();
    order.id = id
    order.time = time
    order.price = price
    return order;
}

function setOrderInfo(id, userID, state, venueType, count, bookingDate, useDate, finishTime, venue1, venue2, cancelFlag) {
    let order = new Object();
    order.id = id
    order.userID = userID
    order.state = state
    order.venueType = venueType
    order.count = count
    order.bookingDate = bookingDate
    order.useDate = useDate
    order.finishTime = finishTime
    order.venue1 = venue1
    order.venue2 = venue2
    order.cancelFlag = cancelFlag
    return order;
}

//venueType,count,selectedState,id1是第一个选择的场地号,id2是第二个选择的场地号,timeList,timeSlot,timeNum,priceList,userID,bookingDate,useDate
export default function createOrder(venueTypeCN, venueTypeEN, count, selectedState, id1, id2,
                                    timeList, timeSlot, timeNum, priceList, userID, bookingDate, useDate) {
    getOrderList(userID, '待支付').then((res) => {
        if (res.orderList) {
            uni.showToast({
                title: '还有未支付的订单！', icon: 'none'
            })
            return
        }
        let orderID = new Date().getTime()
        let finTime = Number //记录最晚完成的订单时间
        let time1 = [] //选择的第一个场地的各个时间段
        let timeSlot1 = [] //第一个场地各个时间段的在数组的索引
        let timeSlot2 = [] //第二个场地各个时间段的在数组的索引
        let price1 = 0
        let finTime1 = Number //记录第一个场地最晚完成的订单时间
        for (let i = 0; i < timeNum; i++) {
            if (selectedState[id1][i] == true) {
                timeSlot1.push(timeSlot[i])
                time1.push(timeList[i])
                price1 = price1 + priceList[i]
                finTime1 = i + 9
            }
        }
        let venue1 = createOrderDetail(id1 + 1, time1, price1) //创建第一个场地的订单细节
        let venue2 = createOrderDetail(null, null, null)
        if (count == 1) {
            finTime = finTime1
        }
        if (count == 2) {
            let time2 = [] //选择的第二个场地的各个时间段
            let price2 = 0
            let finTime2 = Number //记录第二个场地最晚完成的订单时间
            for (let i = 0; i < timeNum; i++) {
                if (selectedState[id2][i] == true) {
                    timeSlot2.push(timeSlot[i])
                    time2.push(timeList[i])
                    price2 = price2 + priceList[i]
                    finTime2 = i + 9
                }
            }
            finTime = finTime1 > finTime2 ? finTime1 : finTime2 //finishTime记录最终完成的时间
            venue2 = createOrderDetail(id2 + 1, time2, price2) //创建第二个场地的订单细节
        }
        const orderInfo = setOrderInfo(orderID, userID, '待支付', venueTypeCN, count, bookingDate, useDate, finTime, venue1, venue2, false)
        const todayOrTomorrow = uni.getStorageSync('todayOrTomorrow')
        changeVenueState(venueTypeEN, todayOrTomorrow, count, id1 + 1, id2 + 1, timeSlot1, timeSlot2, true, orderID)
            .then(() => {//修改场地状态成功
                saveOrder(orderInfo).then(() => {//保存待支付订单数据成功
                    console.log("保存订单成功")
                    uni.redirectTo({
                        url: '/pages/order/to-be-paid'
                    })
                }).catch((err) => {//失败
                    uni.showToast({
                        title: err, icon: 'none'
                    })
                })
            }).catch(err => {//修改场地状态失败
            console.log(err)
            if (err.serverErr) { //serverErr表示是否是服务器修改场地状态过程出现错误，true表示是，false表示是场地已被提前预约
                uni.showToast({
                    title: '服务器出了点问题...', duration: 1500, icon: 'none', mask: true
                })
            } else {
                uni.showToast({
                    title: res.msg, duration: 1500, icon: 'none', mask: true,
                })
            }
        })
    }).catch(err => {
        console.log(err)
        uni.showToast({
            title: err, duration: 1500, icon: 'none', mask: true,
        })
    })
}

