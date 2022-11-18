const range = document.getElementById('range')

range.addEventListener('input', e => {
  const value = +e.target.value
  const label = e.target.nextElementSibling
  label.innerText = value

  const rangeWidth = +getComputedStyle(e.target).getPropertyValue('width').replace('px', '')
  const labelWidth = +getComputedStyle(label).getPropertyValue('width').replace('px', '')
  
  const max = +e.target.max
  const min = +e.target.min

  const left = value * (rangeWidth / max) - labelWidth / 2 - scale(value, min, max, -10, 10)
  label.style.left = left + 'px'
})

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
// 将一个数字范围映射到另一个数字范围
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}