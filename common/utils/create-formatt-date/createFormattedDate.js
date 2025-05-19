const currentDate = new Date();
const week = [" 周日 ", " 周一 ", " 周二 ", " 周三 ", " 周四 ", " 周五 ", " 周六 "]
const year = currentDate.getFullYear();


class createFormattedDate {
	createTodayAndTomorrowDateForSelect() {
		const getday = currentDate.getDay()
		const dayOfMonth = currentDate.getDate() // 获取当天的日期
		let tomorrowDayOfMonth = dayOfMonth + 1
		let month = currentDate.getMonth() + 1 // 获取当天的月份月份从0开始，需要加1
		let todayWeekday = week[getday] // 获取明天星期
		let tomorrowWeekday = week[(getday + 1) % 7]
		let today = '今天  ' + todayWeekday + month + '月' + dayOfMonth + '日'
		let tomorrow = '明天  ' + tomorrowWeekday + month + '月' + tomorrowDayOfMonth + '日'
		let todayAndTomorrow = [today, tomorrow]
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
			if (dayOfMonth == 31) {
				if (month == 12) {
					tomorrow = '明天  ' + tomorrowWeekday + 1 + '月' + 1 + '日'
					return [today, tomorrow]
				}
				month++
				tomorrow = '明天  ' + tomorrowWeekday + month + '月' + 1 + '日'
				return [today, tomorrow]
			}
		}
		if (month == 2) {
			//如果今年是闰年且今天是29日
			if ((month % 4 == 0 && month % 100 != 0) || (month % 400 == 0)) {
				if (dayOfMonth == 29) {
					//则明天是3月1日
					tomorrow = '明天  ' + tomorrowWeekday + 3 + '月' + 1 + '日'
					return [today, tomorrow]
				}
			} else {
				//如果是平年且今天是28日
				if (dayOfMonth == 28) {
					// 则明天是3月1日
					tomorrow = '明天  ' + tomorrowWeekday + 3 + '月' + 1 + '日'
					return [today, tomorrow]
				}
			}
		}
		if (month == 4 || month == 6 || month == 9 || month == 11) {
			if (dayOfMonth == 30) {
				month++
				tomorrow = '明天  ' + tomorrowWeekday + month + '月' + 1 + '日'
				return [today, tomorrow]
			}
		}
		return todayAndTomorrow

	}

	createFormattedTodayDate() {
		// 格式化日期为 "YYYY-MM-DD" 形式
		let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始，需要加 1，并补齐两位
		let day = currentDate.getDate().toString().padStart(2, '0'); // 补齐两位
		let formattedTodayDate = `${year}-${month}-${day}`;
		return formattedTodayDate
	}

	createFormattedTomorrowDate() {
		// 格式化日期为 "YYYY-MM-DD" 形式
		//获取到的数字类型的月份
		const numberMonth = currentDate.getMonth() + 1
		//获取到的数字类型的日期
		const numberDay = currentDate.getDate()
		//一个月有31日的情况
		if (numberMonth == 1 || numberMonth == 3 || numberMonth == 5 || numberMonth == 7 || numberMonth == 8 ||
			numberMonth == 10 || numberMonth == 12) {
			//如果是31日
			if (numberDay == 31) {
				//如果是12月31日，则明天是明年的1月1日
				if (numberMonth == 12) {
					return `${year+1}-01-01`
				}
				const formattedMonth = (numberMonth + 1).toString().padStart(2, '0')
				//明天是下个月的1日
				return `${year}-${formattedMonth}-01`
			}
		}
		//如果这个月是2月
		if (numberMonth == 2) {
			//如果是闰年且今天是29日
			if ((numberMonth % 4 == 0 && numberMonth % 100 != 0) || (numberMonth % 400 == 0)) {
				if (numberDay == 29) {
					//则明天是3月1日
					return `${year}-03-01`
				}
			} else {
				//如果是平年且今天是28日
				if (numberDay == 28) {
					// 则明天是3月1日
					return `${year}-02-28`
				}
			}
		}
		//一个月只有30天的情况
		if (numberMonth == 4 || numberMonth == 6 || numberMonth == 9 || numberMonth == 11) {
			//且今天是30日
			if (numberDay == 30) {
				const formattedMonth = (numberMonth + 1).toString().padStart(2, '0')
				//明天是下个月的1日
				return `${year}-${formattedMonth}-01`
			}
		}
		//常规日期
		const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0') // 月份从 0 开始，需要加 1，并补齐两位
		const formattedDay = (currentDate.getDate() + 1).toString().padStart(2, '0') // 补齐两位
		const formattedTomorrowDate = `${year}-${formattedMonth}-${formattedDay}`
		return formattedTomorrowDate
	}
}

export default new createFormattedDate