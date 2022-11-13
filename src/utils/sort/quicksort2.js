function getMiddle(a, b, c) {
    var min = Math.min(a, b, c);
    var max = Math.max(a, b, c);
    var middle = a + b + c - min - max;
    return middle;
}

function insertArr(arr){
    for(let i = 1 , len = arr.length; i < len ; i++){
        let preIndex = i - 1;
        let current = arr[i];
        while(preIndex >= 0 && current < arr[preIndex] ){
            arr[preIndex+1] = arr[preIndex]
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}
        
export const sort = arr => {

    if (arr.length < 2) return arr;

    // 当数组长度小于10用插入排序
    if (arr.length < 10) {
        return insertArr(arr);
    }

    // 使用三数取中
    let start = arr[0];
    let middle = arr[Math.floor(arr.length / 2)];
    let end = arr[arr.length - 1];
    let pivot = getMiddle(start, middle, end);

    let left = [];
    let right = [];
    let alike = [];

    for (let i = 0, total = arr.length; i < total; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        }else {
            alike.push(arr[i])
        }
    }

    return [
        ...sort(left),
        ...alike,
        ...sort(right)
    ];
};