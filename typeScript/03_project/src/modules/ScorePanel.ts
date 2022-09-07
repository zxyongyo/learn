// 计分
export default class ScorePanel {

  score= 0;
  level= 1;
  scoreEl: HTMLElement;
  levelEl: HTMLElement;
  maxLevel: number; // 最大等级
  upScore: number;  // 几分升一级

  constructor(maxLevel = 10, upScore = 10) {
    this.scoreEl = document.getElementById('score')!;
    this.levelEl = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 加分
  addScore() {
    this.score++;
    this.scoreEl.innerHTML = this.score.toString();
    // 每10分升一级
    if(this.score % this.upScore === 0){
      this.levelUp();
    }
  }

  // 升级
  levelUp() {
    if(this.level < this.maxLevel) this.level++;
    this.levelEl.innerHTML = this.level.toString();
  }
  
}