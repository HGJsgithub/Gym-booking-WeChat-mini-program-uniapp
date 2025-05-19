const baseUrl = getApp().globalData.baseUrl

export default function changeVenueState(venueTypeEN, todayOrTomorrow, count, id1, id2, timeSlot1, timeSlot2, state, orderID) {
    let updateInfo = []
    if (count == 1) {
        let uR = {
            venueType: venueTypeEN, date: todayOrTomorrow, id: id1, timeSlot: timeSlot1, state: state
        }
        updateInfo.push(uR)
    }
    if (count == 2) {
        let uR1 = {
            venueType: venueTypeEN, date: todayOrTomorrow, id: id1, timeSlot: timeSlot1, state: state
        }
        let uR2 = {
            venueType: venueTypeEN, date: todayOrTomorrow, id: id2, timeSlot: timeSlot2, state: state
        }
        updateInfo.push(uR1, uR2)
    }
    const updateRequest = {
        updateInfo: updateInfo,
        orderID: orderID
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + '/venue/state/change',
            method: "POST",
            data: updateRequest,
            header: {
                "Content-Type": "application/json",
            },
            success: (res) => {
                console.log(res)
                if (res.statusCode == 200) {
                    resolve()
                } else {
                    reject(res.data)
                }
            }
        })
    })
}