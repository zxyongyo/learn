// 食物类
export default class Food {

  food: HTMLElement;  // 食物对应的HTML元素

  constructor() {
    this.food = document.getElementById('food')!;
  }

  // 随机位置生成食物
  change() {
    const t = Math.round(Math.random() * 29) * 10;  // 横坐标
    const l = Math.round(Math.random() * 29) * 10;  // 纵坐标
    this.food.style.top = t + 'px';
    this.food.style.left = l + 'px';
  }

  // 获取食物坐标
  get X() { return this.food.offsetLeft; }
  get Y() { return this.food.offsetTop; }
  
}