<template>
  <div class="container clear-fix">
    <div class="setting">
      <!-- 缩略图 -->
      <div class="thumb" :style="{backgroundImage: `url(${img})`}"></div>
      <!-- 选择图片 -->
      <div class="select-img iconfont">
        <span>图片：</span>
        <select v-model="img">
          <option
            v-for="(item, index) in images"
            :value="item.url"
            :key="item.id"
          >图{{ index }}</option>
        </select>
      </div>
      <!-- 选择难度 -->
      <div class="level">
        <span>难度：</span>
        <input id="easy" type="radio" name="level" value="0" v-model="level"> 
        <label for="easy">
          <i :class="['iconfont', level==0 ? 'icon-radio-active' : 'icon-radio']"></i> 简单
        </label>

        <input id="common" type="radio" name="level" value="1" v-model="level"> 
        <label for="common">
          <i :class="['iconfont', level==1 ? 'icon-radio-active' : 'icon-radio']"></i> 中等
        </label>

        <input id="difficult" type="radio" name="level" value="2" v-model="level"> 
        <label for="difficult">
          <i :class="['iconfont', level==2 ? 'icon-radio-active' : 'icon-radio']"></i> 困难
        </label>
      </div>
    </div>
    <div class="puzzle" :style="{width: width + 'px', height: height + 'px'}">
      <div
      class="puzzle-block"
      :ref="(index == correctPoints.length - 1) ? 'empty' : 'block'"
      v-for="(item, index) in block"
      :style="{
        width: blockWidth + 'px',
        height: blockHeight + 'px',
        top: item.y + 'px',
        left: item.x + 'px',
        backgroundImage: `url(${img})`,
        backgroundPosition: `-${correctPoints[index].x}px -${correctPoints[index].y}px`,
        opacity: (index == correctPoints.length - 1) ? 0 : 1
      }"
      @click="handleClick"
      :data-correctx="correctPoints[index].x"
      :data-correcty="correctPoints[index].y"
      :key="item.id"
      ></div>
    </div>
  </div>
</template>

<script>
module.exports= {
  data() {
    return {
      width: 500, // 宽度
      height: 500,  // 高度
      row: 3, // 一行块数
      col: 3, // 一列块数
      images: [
        {id: 4, url: 'img/4.jpg'},
        {id: 0, url: 'img/0.jpg'},
        {id: 1, url: 'img/1.jpg'},
        {id: 2, url: 'img/2.jpg'},
        {id: 3, url: 'img/3.jpg'},
      ],
      img: 'img/4.jpg', // 显示的图片
      level: 0,  // 难度
      block: null
    }
  },
  computed: {
    blockWidth() {  // 每个块的宽
      return this.width / this.row;
    },
    blockHeight() { // 每个块的高
      return this.height / this.col;
    },
    correctPoints() { // 每个块的图片偏移量
      const { row, col, blockWidth, blockHeight} = this;
      const arr = [];
      for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
          arr.push({
            id: Symbol('id'),
            x: j * blockWidth,
            y: i * blockHeight
          })
        }
      }
      return arr;
    },
    blockPoints() { // 打乱顺序后每个块的图片偏移量
      const img = this.img; // 为了使每次切换图片时 刷新
      const length = this.correctPoints.length;
      const lastEl = this.correctPoints[length - 1];
      const newArr = [...this.correctPoints];
      newArr.pop();
      newArr.sort(() => Math.random() - 0.5);
      newArr.push(lastEl);
      return newArr;
    }
  },
  watch: {
    img(){
      this.refreshBlock();
    },
    // 切换难度
    level(){
      switch (Number(this.level)) {
        case 0:
          this.row = 3;
          this.col = 3;
          break;
        case 1:
          this.row = 4;
          this.col = 4;
          break;
        case 2:
          this.row = 5;
          this.col = 5;
          break;
        default:
          this.row = 3;
          this.col = 3;
          break;
      }
      this.refreshBlock()
    }
  },
  mounted(){
    this.refreshBlock();
  },
  methods: {
    // 点击块
    handleClick(e){
      if(JSON.stringify(this.block) == JSON.stringify(this.correctPoints)) return;
      const blockEl = e.target;
      const emptyEl = this.$refs.empty[0];
      if(!this.canMove(blockEl, emptyEl)) return; // 判断能否移动
      const { left, top } = blockEl.style;  // 点击的块的偏移量
      // 让被点击的块到当前空白块的位置
      blockEl.style.left = emptyEl.style.left;
      blockEl.style.top = emptyEl.style.top;
      // 让空白块到点击块的位置
      emptyEl.style.left = left;
      emptyEl.style.top = top;
      this.checkWin(emptyEl);
    },
    // 判断点击的块是否能移动
    canMove(blockDom, emptyDom){
      const { width, height, left, top } = blockDom.style;
      const { left: eLeft, top: eTop } = emptyDom.style;
      const xDis = Math.floor(Math.abs(parseFloat(left) - parseFloat(eLeft)));
      const yDis = Math.floor(Math.abs(parseFloat(top) - parseFloat(eTop)));
      // 必须在一个y轴或一个x轴  之间距离等于一个块
      return (left === eLeft && parseInt(width) === yDis) || (top === eTop && parseInt(height) === xDis);
    },
    // 判断是否已经拼好
    checkWin(emptyEl){
      const blockEls = this.$refs.block;
      const flag = blockEls.every(block => {
        const { left, top } = block.style;
        const { correctx: x, correcty: y } = block.dataset;
        return parseInt(left) === parseInt(x) && parseInt(top) === parseInt(y)
      })
      if(flag){
        emptyEl.style.opacity = 1;
        setTimeout(() => {
          alert('拼好了，好厉害👏👏👏, 挑战一下更高的难度吧！');
          this.level < 2 ? this.level++ : this.level = 2;
        }, 300);
      }
    },
    // 刷新块
    refreshBlock(){
      this.block = this.correctPoints
      setTimeout(()=>{this.block = this.blockPoints}, 1000)
    }
  }
}
</script>

<style>
@import './iconfont/iconfont.css';
:root{
  --primary-color: #409EFF;
}
.clear-fix::after{
  content: "";
  display: block;
  clear: both;
}
.container{
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  color: #333;
  display: flex;
  flex-wrap: wrap-reverse;
}
.container .setting > div{
  margin-top: 20px;
}
.container  .setting .thumb{
  position: relative;
  width: 300px;
  height: 300px;
  background-size: cover;
}
/* .container  .setting .thumb::after{
  content: "";
  display: block;
  width: 33.33%;
  height: 33.33%;
  background: rgba(255, 255, 255, .8);
  position: absolute;
  bottom: 0;
  right: 0;
} */
.container .setting .select-img{
  position: relative;
}
.container .setting .select-img::before{
  content: "\e63c";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 275px;
  color: #333;
}
.container .setting .select-img select{
  border: none;
  outline: none;
  width: 240px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #fff;
  /* 去掉默认的图标 */
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  -ms-appearance:none;
}
.container .setting .select-img select::after{
  content: "\e63c";
  display: block;
  width: 20px;
  height: 20px;
}
.container .setting .level{
  margin-top: 20px;
  font-size: 20px;
}
.container .setting .level span, 
.container .setting .select-img span{
  font-size: 20px;
  font-weight: bold;
}
.container .setting .level input{
  display: none;
}
.container .setting .level label{
  font-size: 16px;
  padding: 3px 10px;
  margin-right: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
}
.container .setting .level input:checked + label{
  font-weight: 600;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}
.container .puzzle{
  position: relative;
  margin-left: 40px;
  border: 5px solid #fbc531;
;
}
.container .puzzle .puzzle-block{
  position: absolute;
  background-repeat: no-repeat;
  border: 1px solid #fff;
  box-sizing: border-box;
  transition: all .3s;
}

@media screen and (max-width: 1000px) {
  .container{
    width: 100%;
    margin: 0;
  }
  .container .puzzle{
    margin: 0 auto;
  }
  .container .setting{
    margin-left: 40px;
  }
  .container .setting .level label{
    font-size: 20px;
  }
}
</style>