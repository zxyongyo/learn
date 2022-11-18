const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
  panel.addEventListener('click', e => {
    panels.forEach(item => {
      item.classList.remove('active')
    })
    panel.classList.add('active')
  })
})