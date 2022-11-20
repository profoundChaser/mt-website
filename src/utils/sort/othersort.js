import { getMax, swap } from '../utils'

//计数排序
export const integerSort = (arr) => {
  let res = []
  const max = getMax(arr)
  const count = Array(max + 1)
  arr.forEach((item) => {
    if (!count[item]) {
      count[item] = 1
    } else {
      count[item]++
    }
  })

  count.forEach((item, i) => {
    let index = 1
    if (!item) return
    while (index <= item) {
      res.push(i)
      index++
    }
  })

  return res
}

//插入排序
export const insertSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i]
    let curIndex = i
    for (let j = i; j > 0; j--) {
      if (temp < arr[j - 1]) {
        arr[j] = arr[j - 1]
        curIndex = j - 1
      }
    }
    arr[curIndex] = temp
  }

  return arr
}

//冒泡排序
export const bubbleSort = (arr, type = true) => {
  //type true 为冒小泡 false 为 大泡
  let { length } = arr
  for (let i = 1; i < length; i++) {
    for (let j = type ? i : length - i; type ? j < length : j >= 0; type ? j++ : j--) {
      if (arr[j] < arr[j - 1]) swap(arr, j, j - 1)
    }
  }
  return arr
}

//选择排序  选择最小的到最前面 采用索引记录的方式
export const selectionSort = (arr) => {
  let { length } = arr
  let indexMin
  for (let i = 0; i < length; i++) {
    indexMin = i
    for (let j = i; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j
      }
    }
    if (indexMin === i) {
      swap(arr, indexMin, i)
    }
  }
}

//归并排序
export const mergeSort = (arr) => {
  let { length } = arr
  if (length > 1) {
    //中间
    const middle = ~~(length >> 1)
    //分区
    const left = mergeSort(arr.slice(0, middle))
    const right = mergeSort(arr.slice(middle, length))
    arr = merge(left, right)
  }
  return arr
}

const merge = (left, right) => {
  const res = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    res.push(left[i] < right[j] ? left[i++] : right[j++])
  }
  return res.concat(i >= left.length ? right.slice(j) : left.slice(i))
}

//希尔排序
export function shellSort(arr) {
  let d = arr.length
  while (d > 1) {
      d = d >> 1
      for (let i = 0; i < d; i++) {
          for (let j = i + d; j < arr.length; j++) {
              let temp = arr[j]
              let index = j - d;
              while (index >= 0 && arr[index] > temp) {
                  arr[index + d] = arr[index];
                  index = index - d;
              }
              arr[index + d] = temp;
          }

      }
  }
  return arr
}


