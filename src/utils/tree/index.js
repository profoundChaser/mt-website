//数组转树状结构
export const arrayToTree = function (items,id,pid) {
    //所有最高级前置 参数id和pid表示对象的自身标识和父类的标识
    items.forEach((item,i)=>{
      if(item[pid] === 0){
        const temp = item
        items.splice(i,1)
        items.splice(0,0,temp)
      }
    })
  
    const result = [] // 存放结果集
    const itemMap = {}
  
    // 先转成map存储
    for (const item of items) {
      itemMap[item[id]] = {
        ...item,
        children: [],
      }
    }
  
    for (const item of items) {
      const idVal = item[id]
      const pidVal = item[pid]
      const treeItem = itemMap[idVal]
      if (pidVal === 0) {
        result.push(treeItem)
      } else {
          //循环这个过程
          loopTree(result,treeItem,id,pid)
      }
    }
    return result
  }
  
  const loopTree = (result,treeItem,id,pid) => {
    result.forEach(item=>{
        if(item[id] === treeItem[pid]){
          item.children.push(treeItem)
        }else {
          loopTree(item.children,treeItem,id,pid)
        }
    })
  }
  