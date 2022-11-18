const canvas = document.querySelector('canvas')
const canvasRect = canvas.getBoundingClientRect()
canvas.width = canvasRect.width
canvas.height = canvasRect.height
const ctx = canvas.getContext('2d')

let isDrawing = false, // 正在绘制
  startX,
  endX,
  startY,
  endY

let lineWidth = 2,
  lineColor = '#333',
  historySteps = []

canvas.addEventListener('mousedown', e => {
  isDrawing = true
  startX = e.clientX - canvasRect.left
  startY = e.clientY - canvasRect.top

  endX = startX
  endY = startY

  draw()
})

canvas.addEventListener('mousemove', e => {
  if (!isDrawing) {
    return
  }
  endX = e.clientX - canvasRect.left
  endY = e.clientY - canvasRect.top

  draw()

  startX = endX
  startY = endY
})

canvas.addEventListener('mouseup', e => {
  endX = e.clientX - canvasRect.left
  endY = e.clientY - canvasRect.top
})

document.addEventListener('mouseup', e => {
  if (isDrawing) {
    startX = endX
    startY = endY

    endX = e.clientX - canvasRect.left
    endY = e.clientY - canvasRect.top
    draw()

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    historySteps.push(imageData)
  }
  isDrawing = false
})

const draw = () => {
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.stroke()
  ctx.closePath()
}

// 设置线条宽度
const setLineWidth = el => {
  lineWidth = el.value
  el.parentNode.querySelector('span').innerText = lineWidth
}

// 设置线条颜色
const setLineColor = el => {
  lineColor = el.value
}

// 清空
const handleClear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  historySteps = []
}

// 撤销
const reverse = () => {
  historySteps.pop()
  const len = historySteps.length
  if (len) {
    ctx.putImageData(historySteps[len - 1], 0, 0)
  } else {
    handleClear()
  }
}

// 预览
const preview = () => {
  const base64 = canvas.toDataURL('image/png')
  const img = document.querySelector('.preview')
  img.src = base64
  img.width = canvas.width
  img.height = canvas.height
}

// 保存
const save = () => {
  const a = document.createElement('a')
  a.download = 'image'
  a.href = canvas.toDataURL('image/png')
  a.dispatchEvent(new MouseEvent('click'))
}
