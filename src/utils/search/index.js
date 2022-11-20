//精确查询
export const queryWidthExact = function (source, target, isIgnoreCase = true) {
  return isIgnoreCase
    ? source.toLocaleLowerCase() === target.toLocaleLowerCase()
    : source === target
}

//模糊查询
export const queryWidthBlur = function (source, target, isIgnoreCase = true) {
  return isIgnoreCase
    ? source.toLocaleLowerCase().indexOf(target.toLocaleLowerCase()) >= 0
    : source.indexOf(target)
}


//统一过滤查询
export const filterDataBySearch = function (sourceData,keys,target,isIgnoreCase = true) {
    if(!target) return sourceData
    const flags = []
    //使用源数据进行过滤  交给过滤
    const result = sourceData.filter(data=>{
        keys.forEach(key=>{
            const res = queryWidthBlur(data[key],target,isIgnoreCase)
            flags.push(res)
        })
        return flags.includes(true)
    })

    return result //交给filterData
}