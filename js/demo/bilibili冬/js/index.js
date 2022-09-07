window.onload = function () {
  const container = document.querySelector('.container');
  const imgs = container.querySelectorAll('img');
  const video = container.querySelector('video');
  const canvas = container.querySelector('canvas');

  /** 鼠标移入 */
  container.addEventListener('mouseenter', function (e) {
    this.x = e.clientX; // 鼠标移入的位置
    imgs.forEach(img => {
      img.style.transition = 'none';
      video.style.transition = 'none';
    })
  })

  /** 鼠标移动 */
  container.addEventListener('mousemove', function (e) {
    const disX = this.x - e.clientX; // 鼠标移入后移动的距离

    imgs.forEach((img, index) => {
      if (index === 2 || index === 4 || index === 5 || index === 6) { // 雪球 树枝 的轨迹跟图片不一样
        imgs[2].style.transform = `scale(1) translate(${46.4516 + (250 * disX / 1920)}px, ${18.5806 - (5 * disX / 1920)}px) rotate(${10 + (5 * disX / 1920)}deg)`; // 雪球偏移量
        imgs[4].style.transform = `scale(1) translate(${140 * disX / 1920}px, 0px) rotate(0deg)`;
        imgs[5].style.transform = `scale(1) translate(${140 * disX / 1920}px, 0px) rotate(0deg)`;
        imgs[6].style.transform = `scale(1) translate(${140 * disX / 1920}px, 0px) rotate(0deg)`;
        return
      }
      img.style.transform = `scale(1) translate(${100 * disX / 1920}px, 0px) rotate(0deg)`; // 设置图片的偏移量
      video.style.transform = `scale(1) translate(${100 * disX / 1920}px, 0px) rotate(0deg)`;
    })

    imgs[1].style.opacity = Math.min(Math.max(1 - disX / 800, 0), 1); // 计算第二张图片透明度  最大1 最小0
    video.style.opacity = Math.min(Math.max(0 - disX / 800, 0), 1); // 第三张图片透明度
    imgs[2].style.opacity = Math.min(Math.max(1 - disX / 780, 0), 1); // 雪球透明度
    imgs[3].style.opacity = Math.min(Math.max(0 - disX / 800, 0), 1); // 窗上的雾
    imgs[5].style.opacity = Math.min(Math.max(1 - disX / 800, 0), 1); // 第二种树枝的透明度
    imgs[6].style.opacity = Math.min(Math.max(0 - disX / 800, 0), 1); // 第三种树枝的透明度
  })

  /** 鼠标离开 */
  container.addEventListener('mouseleave', function () {
    imgs.forEach((img, index) => {
      img.style.transition = 'all 1s';
      video.style.transition = 'all 1s';
      if (index === 2) return;
      img.style.transform = `scale(1) translate(0px, 0px) rotate(0deg)`;
      video.style.transform = `scale(1) translate(0px, 0px) rotate(0deg)`;
    })

    imgs[2].style.transform = `scale(1) translate(46.4516px, 18.5806px) rotate(10deg)`;
    imgs[1].style.opacity = 1;
    imgs[2].style.opacity = 1;
    video.style.opacity = 0;
    imgs[3].style.opacity = 0;
    imgs[5].style.opacity = 1;
    imgs[6].style.opacity = 0;
  })

  var W = container.offsetWidth;
  var H = container.offsetHeight;
  canvas.width = W;
  canvas.height = H;
  canvas.style.filter = 'blur(1px)';
  var ctx = canvas.getContext('2d');

  var flakesCount = 80; // 雪花的个数
  var flakes = []; // 存放雪花的属性

  // 生成随机大小位置的雪花
  for (var i = 0; i < flakesCount; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3,
      d: Math.random() + 1
    });
  }

  // 在画布上画出全部雪花
  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    for (var i = 0; i < flakesCount; i++) {
      var flake = flakes[i];
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  var angle = 0;
  
  // 移动雪花
  function moveFlakes(disX) {
    angle += 0.01;
    for (var i = 0; i < flakesCount; i++) {
      var flake = flakes[i];
      flake.y += flake.d; // 向下移动
      flake.x += Math.sin(angle) * 2; // 左右移动

      if (flake.y > H) {
        flakes[i] = { x: Math.random() * W, y: 0, r: flake.r, d: flake.d };
      }
    }
  }

  setInterval(drawFlakes, 30);
}