
/** border-radius setting */
const shape = document.getElementById('shape')
const outputIpt = document.getElementById('output-ipt')
let borderRadius = ''

const borderRadiusMap = {
  "border-top-left-radius": [],
  "border-top-right-radius": [],
  "border-bottom-right-radius": [],
  "border-bottom-left-radius": []
}

for (const key of Object.keys(borderRadiusMap)) {
  const value = getComputedStyle(shape).getPropertyValue(key)
  // console.log(key + ' => ' + value)
  borderRadiusMap[key] = value.split(' ')
  if (borderRadiusMap[key].length === 1) {
    borderRadiusMap[key].push(value)
  }
}
console.log(borderRadiusMap)

const setBorderRadius = () => {
  borderRadius = borderRadiusMap["border-top-left-radius"][0] + ' '
    + borderRadiusMap["border-top-right-radius"][0] + ' '
    + borderRadiusMap["border-bottom-right-radius"][0] + ' '
    + borderRadiusMap["border-bottom-left-radius"][0]
    + ' / '
    + borderRadiusMap["border-top-left-radius"][1] + ' '
    + borderRadiusMap["border-top-right-radius"][1] + ' '
    + borderRadiusMap["border-bottom-right-radius"][1] + ' '
    + borderRadiusMap["border-bottom-left-radius"][1]

  shape.style.borderRadius = borderRadius

  outputIpt.innerText = borderRadius
}
setBorderRadius()


/** size setting */
const box = document.getElementById('box')
const boxRect = box.getBoundingClientRect()
const widthIpt = document.getElementById('width')
const heightIpt = document.getElementById('height')

widthIpt.value = boxRect.width.toFixed(0)
heightIpt.value = boxRect.height.toFixed(0)

widthIpt.addEventListener('input', e => {
  box.style.width = e.target.value + 'px'
})

heightIpt.addEventListener('input', e => {
  box.style.height = e.target.value + 'px'
})

const handleReset = () => {
  box.style.width = '50vmin'
  box.style.height = '50vmin'
}


/** handle border-raidus */
const topHandle = document.getElementById('top')
const rightHandle = document.getElementById('right')
const bottomHandle = document.getElementById('bottom')
const leftHandle = document.getElementById('left')

topHandle.style.left = borderRadiusMap["border-top-left-radius"][0]
rightHandle.style.top = borderRadiusMap["border-top-right-radius"][1]
bottomHandle.style.left = borderRadiusMap["border-bottom-left-radius"][0]
leftHandle.style.top = borderRadiusMap["border-top-left-radius"][1]

let movingEl = null

const mousedown = e => {
  movingEl = e.target
  movingEl.classList.add('active')
}

topHandle.addEventListener('mousedown', mousedown)
rightHandle.addEventListener('mousedown', mousedown)
bottomHandle.addEventListener('mousedown', mousedown)
leftHandle.addEventListener('mousedown', mousedown)

document.addEventListener('mousemove', e => {
  if (!movingEl) { return }
  // console.log('mousemove', e)
  // console.log(boxRect)
  switch (movingEl) {
    case topHandle: 
    case bottomHandle: 
      const moveLeft = minmax((e.clientX - box.offsetLeft) / boxRect.width * 100, 0, 100)
      const left = moveLeft.toFixed(0) + '%'
      // console.log(left)
      movingEl.style.left = left

      // borderRadiusMap["border-top-left-radius"][0] = left
      // borderRadiusMap["border-top-right-radius"][0] = (100 - moveLeft).toFixed(0) + '%'

      // setBorderRadius()
      break
    case rightHandle: 
    case leftHandle: 
      const moveTop = ((e.clientY - box.offsetTop) / boxRect.width * 100).toFixed(0)
      const top = Math.max(Math.min(moveTop, 100), 0) + '%'
      // console.log(top)
      movingEl.style.top = top
      break
  }
})

document.addEventListener('mouseup', e => {
  movingEl = null
  topHandle.classList.remove('active')
  rightHandle.classList.remove('active')
  bottomHandle.classList.remove('active')
  leftHandle.classList.remove('active')
})

const minmax = (n, min, max) => {
  return Math.max(Math.min(n, max), min)
}