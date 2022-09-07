import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

// 游戏控制器
export default class GameControl {

  food: Food;
  scorePanel: ScorePanel;
  snake: Snake;
  direction = ''; // 移动方向
  speed: number;  // 移动速度
  isLive = true;  // 是否存活
  validKey = true; // 操作是否有效  每次操作后 等蛇转向成功后才能再次有效操作  防止按太快出现意外死亡的bug

  constructor() {
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.snake = new Snake();
    this.speed = 300 - (this.scorePanel.level - 1) * 30;

    this.init();
  }

  // 初始化游戏
  init() {
    document.querySelector('#start > span')!.addEventListener('click', (e: Event)=>{
      (e.target as HTMLElement).parentElement!.style.display = 'none'
      this.keydownListener();
      console.log(arguments.callee())
    })
    this.run();
  }

  // 键盘事件处理方法
  keydownListener() {
    if (!this.validKey) return
    this.validKey = false;
    if(this.direction === '') this.direction = 'ArrowRight'
    document.addEventListener('keydown', (e) => {
      // 不能回头
      if (this.snake.bodies[1]) {
        if (e.key === 'ArrowUp' && this.direction === 'ArrowDown') {
          return
        } else if (e.key === 'ArrowDown' && this.direction === 'ArrowUp') {
          return
        } else if (e.key === 'ArrowLeft' && this.direction === 'ArrowRight') {
          return
        } else if (e.key === 'ArrowRight' && this.direction === 'ArrowLeft') {
          return
        }
      }
      this.direction = e.key;
    });
  }

  // 控制蛇移动
  run() {
    // 蛇头当前位置
    let x = this.snake.X;
    let y = this.snake.Y;

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        x -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        x += 10;
        break;
    }

    // 吃到食物
    this.checkEat(x, y);

    // 移动蛇
    try {
      this.snake.setHeadPos(x, y);
    } catch (e) {
      alert(e.message + ' Game over!');
      window.location.reload();
      return;
    }
    this.validKey = true;
    // 设置定时器 让蛇一直动 等级越高移动越快
    this.isLive && window.setTimeout(this.run.bind(this), this.speed)
  }

  // 检查是否吃到食物
  checkEat(x: number, y: number) {
    if (this.food.X === x && this.food.Y === y) {
      this.snake.addBody(); // 加蛇身
      this.food.change(); // 重新生成食物
      this.scorePanel.addScore(); // 加分
    }
  }

}