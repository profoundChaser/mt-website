const dragJS = {}
//开始拖拽
dragJS.dragStart = function (e) {
  this.dragItem = e.target
  this.dragItemNext = this.dragItem.nextElementSibling
}

dragJS.dragEnd = function (e) {
}

dragJS.dragLeave = function (e) {
}

dragJS.dragOver = function (e) {
  e.preventDefault()
}

dragJS.dragEnter = function (e) {
  e.preventDefault()
}

dragJS.drop = function (e) {
  this.dropItem = e.target
  this.dropItemNext = this.dropItem.nextElementSibling
  const dragItems = this.dragItem.parentNode //拖拽的对象
  const dropItems = this.dropItem.parentNode //放置的对象
  console.log(dragItems,dropItems)
  if (this.dropItem.parentNode === this.dragItem.parentNode) {//拖拽放置为同一对象
    if (this.dropItem === this.dragItemNext) {
      dragItems.removeChild(this.dragItem)
      dragItems.insertBefore(this.dragItem, this.dropItemNext)
    } else if (this.dragItem === this.dropItemNext) {
      dragItems.removeChild(this.dropItem)
      dragItems.insertBefore(this.dropItem, this.dragItemNext)
    } else {
      dragItems.removeChild(this.dropItem)
      dragItems.insertBefore(this.dropItem, this.dragItemNext)
      dragItems.removeChild(this.dragItem)
      dragItems.insertBefore(this.dragItem, this.dropItemNext)
    }
  } else {
    dragItems.removeChild(this.dragItem)
    dragItems.insertBefore(this.dropItem, this.dragItemNext)
    dropItems.insertBefore(this.dragItem, this.dropItemNext)
  }
}

export default dragJS
