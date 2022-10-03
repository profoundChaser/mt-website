export function fullScreen() {
//全屏
  var docElm = document.documentElement //W3C
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } //FireFox
  else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } //Chrome等
  else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  } //IE11
  else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  }
}

export function outFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } //FireFox
  else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } //Chrome等
  else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } //IE11
  else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}
