import { swap } from "../utils"

export const quickSort = (arr) => {
    if (arr.length <= 10) {
        return insertSort(arr,0,arr.length - 1)
    }
    return quick(arr, 0, arr.length - 1)
}

//三点取中 返回对象
export const getMiddle = (a, b, c) => {
  const min = Math.min(a, b, c)
  const max = Math.max(a, b, c)
  return a + b + c - min - max
}

//优化一 三点取中
const getMiddleAndIndex = (arr, left, right) => {
  const middle = arr[~~((right + left) >> 1)]
  const start = arr[left]
  const end = arr[right]
  const res = getMiddle(middle, start, end)
  if (middle == res) {
    return {
      value: middle,
      index: ~~((right + left) >> 1),
    }
  } else if (start == res) {
    return {
      value: start,
      index: left,
    }
  } else {
    return {
      value: end,
      index: right,
    }
  }
}
//快排优化之插入排序
const insertSort = (arr, left, right) => {
    for (let i = left; i <= right; i++) {
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


//核心代码
const quick = (arr, left, right) => {
    let index
    if (arr.length > 1) {
        //优化二 子数组长度过小时，直接使用插入排序
        if ((right - left + 1) <= 10) insertSort(arr, left, right)
        index = partition(arr, left, right)
        if (left < index - 1) {
            quick(arr, left, index - 1)
        }
        if (right > index) {
            quick(arr, index, right)
        }
    }
    return arr
}

const partition = (arr, left, right) => {
    const { value, index } = getMiddleAndIndex(arr, left, right)
    const pivot = value
    const pivotIndex = index
    let i = left
    let j = right
    // const alike = []
    while (i < j) {
        while (arr[i] <= pivot) {
            if (i == pivotIndex) break
            // if (arr[i] == pivot){
            //     alike.push(i)
            //     break
            // }
            i++
        }
        while (arr[j] >= pivot) {
            if (j == pivotIndex) break
            // if (arr[j] == pivot){
            //     alike.push(j)
            //     break
            // }
            j--
        }
        if (i <= j) {
            swap(arr, i, j)
            // if(alike){
            //     alike.forEach(item=>{
            //         const val = arr[item]
            //         arr.splice(item,1)
            //         arr.splice(j-1,0,val)
            //     })

            //     alike.length = 0
            // }
            i++
            j--
        }
    }
    return i
}