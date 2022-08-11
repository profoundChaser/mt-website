const dayjs = require('dayjs')

//当天开始时间
export function getTodayStart() {
  return new Date(new Date().toLocaleDateString()).getTime()
}
//当天结束时间
export function getTodayEnd() {
  return getTodayStart() + 24 * 60 * 60 * 1000 - 1
}
export function getYesterdayStart() {
  return getTodayStart() - 3600 * 24 * 1000
}
export function getYesterdayEnd() {
  return getYesterdayStart() + 24 * 60 * 60 * 1000 - 1
}

export function getPast7daysStart() {
  return getTodayStart() - 7 * 3600 * 24 * 1000
}
export function getPast7daysEnd() {
  return getPast7daysStart() + 24 * 60 * 60 * 1000 - 1
}

export function getPast15daysStart() {
  return getTodayStart() - 15 * 3600 * 24 * 1000
}
export function getPast15daysEnd() {
  return getPast15daysStart() + 24 * 60 * 60 * 1000 - 1
}

export function getPast30daysStart() {
  return getTodayStart() - 30 * 3600 * 24 * 1000
}

export function getPast30daysEnd() {
  return getPast30daysStart() + 24 * 60 * 60 * 1000 - 1
}

export function getCurMonthFirstDay() {
  //当前月第一天
  var y = new Date().getFullYear() //获取年份
  var m = new Date().getMonth() + 1 //获取月份
  var d = '01'
  m = m < 10 ? '0' + m : m //月份补 0

  return [y, m, d].join('-')
}

export function getCurMonthLastDay() {
  //当前月最后一天
  var y = new Date().getFullYear() //获取年份
  var m = new Date().getMonth() + 1 //获取月份
  var d = new Date(y, m, 0).getDate() //获取当月最后一日
  m = m < 10 ? '0' + m : m //月份补 0
  d = d < 10 ? '0' + d : d //日数补 0

  return [y, m, d].join('-')
}

export function getPreMonthFirstDay() {
  //当上个月第一天
  var y = new Date().getFullYear() //获取年份
  var m = new Date().getMonth() //获取月份
  var d = '01'
  m = m < 10 ? '0' + m : m //月份补 0

  return [y, m, d].join('-')
}

export function getPreMonthLastDay() {
  //当上个月最后一天
  var y = new Date().getFullYear() //获取年份
  var m = new Date().getMonth() //获取月份
  var d = new Date(y, m, 0).getDate() //获取当月最后一日
  m = m < 10 ? '0' + m : m //月份补 0
  d = d < 10 ? '0' + d : d //日数补 0

  return [y, m, d].join('-')
}

export function getDaysBetweenDates(date1, date2) {
  var days = date1.getTime() - date2.getTime()
  if (days < 0) {
    days = -days
  }
  return parseInt(days / (1000 * 60 * 60 * 24))
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export function getDates(startDate, stopDate) {
  var dateArray = new Array()
  var currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(dayjs(new Date(currentDate)).format('YYYY-MM-DD'))
    currentDate = currentDate.addDays(1)
  }
  return dateArray
}
