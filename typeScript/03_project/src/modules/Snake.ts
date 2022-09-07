// 蛇
export default class Snake {

  snake: HTMLElement; // 蛇的容器
  head: HTMLElement;  // 蛇头
  bodies: HTMLCollection; // 蛇的身体
  validKey = true;

  constructor() {
    this.snake = document.getElementById('snake')!;
    this.head = this.snake.querySelector('div')!;
    this.bodies = this.snake.getElementsByTagName('div');
    this.head.style.left = 20 +'px';
    this.addBody();
    this.addBody();
    (this.bodies[1] as HTMLElement).style.left = 10 + 'px';
    (this.bodies[2] as HTMLElement).style.left = '0';
  }

  // 添加身体
  addBody() {
    this.snake.insertAdjacentHTML('beforeend', '<div></div>');
  }

  // 蛇移动
  move() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const preEl = this.bodies[i - 1] as HTMLElement;
      const lastEl = this.bodies[i] as HTMLElement;
      lastEl.style.left = preEl.style.left;
      lastEl.style.top = preEl.style.top;
    }
  }

  // 判断是否撞到自己
  checkBody() {
    Array.prototype.forEach.call(this.bodies, (item: HTMLElement, index) => {
      if (index === 0) return
      if (this.Y === item.offsetTop && this.X === item.offsetLeft) {
        throw new Error('撞到自己了');
      }
    })
  }

  setHeadPos(x: number, y: number) {
    if (this.X === x && this.Y === y) return;

    if (x < 0 || x > 290 || y < 0 || y > 290) throw new Error('撞墙了');
    this.move();
    // 设置蛇头位置
    this.head.style.left = x + 'px';
    this.head.style.top = y + 'px';
    this.checkBody()
  }

  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

}