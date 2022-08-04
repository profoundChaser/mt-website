import FileSaver from 'file-saver'
import JSZip from 'jszip'
export function imgToBase64(imgUrl) {
  let image = new Image()
  //联网必须添加的属性
  image.crossOrigin = 'anonymous';
  image.src = imgUrl
  let canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  let dataUrl = canvas.toDataURL()
  return dataUrl
}

export function saveFileWithA(blob, filename = 'vein' + Date.now()) {
  const a = document.createElement('a')
  a.download = filename
  let blobUrlFlag = false
  if (blob.indexOf('image')) {
    a.href = blob
  } else {
    a.href = URL.createObjectURL(blob)
    blobUrlFlag = true
  }
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  // 移除超链接
  document.body.removeChild(a)

  if (blobUrlFlag) {
    URL.revokeObjectURL(a.href)
  }
}

export function ImgWithSaveFile(imgUrl, fileName = 'vein' + Date.now()) {
  let image = new Image()
  image.src = imgUrl
  let canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)
  canvas.toBlob((blob) => {
    FileSaver.saveAs(blob, fileName)
  })
}

export function urlToBase64(url) {
  const _that = this
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = function () {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      canvas.getContext('2d').drawImage(image, 0, 0)
      let resp = _that.dataURLtoFile(canvas.toDataURL('image/png'))
      const fileOfBlob = new File([resp], new Date() + '.png')
      resolve(fileOfBlob)
    }
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = `${url}?${new Date()}`
    image.onerror = () => {
      reject(new Error('转换失败'))
    }
  })
}

export function dataURLtoFile(imgUrl) {
  //imgUrl这里是base64形式
  const binary = window.atob(imgUrl.split(',')[1])
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' })
}

// export function downloadWidthZip(){
//   const zip = new JSZip();
// let cache = {};
// let promises = [];
// this.loading.start();
// await _imageList.forEach(item => {
//   const promise = this.urlToBase64(item.pictureUrl).then((blobs) => {
//     let fileName = item.name + '.png';
//     zip.file(fileName, blobs, {
//       binary: true
//     });
//     cache[fileName] = blobs;
//   });
//   promises.push(promise);
// });
// Promise.all(promises).then(() => {
//   zip.generateAsync({
//     type: 'blob'
//   }).then(content => { // 生成二进制流
//     FileSaver.saveAs(content, 'myImage.zip'); // 利用file-saver保存文件
//     this.loading.close();
//   });
// });

// }

//下载多个文件或者图片则采用zip的形式
export function downloadMoreWidthZip(...urls) {
  const zip = new JSZip()
  urls[0].forEach(url=>{
    const blob = dataURLtoFile(imgToBase64(url))
    zip.file('mv' + Date.now()+'.png', blob, { binary: true })
  })
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'mv.zip')
  })
}


export function uploadFile(){
  
}