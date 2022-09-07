const $p = document.getElementsByTagName('p')[0]
// 字体大小
const fontSize = 14
// 背景图片
const imgUrl = 'http://kaysama.gitee.io/blog-source-host/%E5%AD%97%E7%AC%A6%E7%94%BB/mememe.gif'
$p.style.cssText = `font-size:${fontSize}px;line-height:${fontSize}px;`
const text = $p.innerHTML.replace(/(\s+)/g, '')
const textLength = text.length

console.log('textLength', textLength)

const img = new Image()
img.src = imgUrl
img.complete ? onImgLoaded() : (img.onload = onImgLoaded)

function onImgLoaded () {
  const imgRatio = img.width / img.height
  let imgWidth = window.innerWidth
  let imgHeight = imgWidth / imgRatio
  if (imgHeight > window.innerHeight) {
    imgHeight = window.innerHeight
    imgWidth = imgHeight * imgRatio
  }
  const needTextLength = (imgWidth / fontSize) * (imgHeight / fontSize)
  if (needTextLength > textLength) {
    $p.innerHTML = new Array(Math.floor(needTextLength / textLength) + 1).fill(text).join('')
  }
   $p.style.cssText += `margin-left:${-imgWidth/2}px;margin-top:${-imgHeight/2}px;width:${imgWidth}px;height:${imgHeight}px;background-image:url(${imgUrl});`
}