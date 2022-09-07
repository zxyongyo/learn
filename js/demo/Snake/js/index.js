var sw = 20,     //一个方块的宽度
    sh = 20,     //一个方块的高度
    tr = 30,     //行数
    td = 30;     //列数、
var snake = null,   //蛇的实例  
    food = null,    //食物的实例
    game =  null,   //游戏的实例
    speed = 200;    //初始化蛇的速度

/**
 * @description 创建方块的构造函数
 * @param {*} x 块的x坐标
 * @param {*} y 块的y坐标
 * @param {*} classname 类名 规定块的类型 
 */
function Square(x, y, classname){
    //(20,20) ==>(1,1)
    this.x = x*sw;
    this.y = y*sh;
    this.class = classname;

    this.viewContent = document.createElement('div');    //创建对应的方块
    this.viewContent.className = this.class;     //给创建的div加上传进来的classname
    this.parent = document.getElementById('snakeWrap');     //方块的父级
}
Square.prototype.create = function (){  //创建方块DOM
    /*设置方块样式*/
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw+'px';
    this.viewContent.style.height = sh+'px';
    this.viewContent.style.left = this.x+'px';
    this.viewContent.style.top = this.y+'px';

    this.parent.appendChild(this.viewContent);  //把方块插入到DOM中
};
Square.prototype.remove = function (){  //移除方块
    this.parent.removeChild(this.viewContent);  
};


function Snake(){
    this.head = null;   //存放蛇头信息
    this.tail = null;   //存放蛇尾信息
    this.pos = [     //存放蛇身上每个方块的位置

    ];
    this.directionNum = {   //存放蛇走的方向
        left: {
            x: -1,
            y: 0,
            rotate: 90     //改变方向时 扭头
        },
        right: {
            x: 1,
            y: 0,
            rotate: -90
        },
        up: {
            x: 0,
            y: -1,
            rotate: 180
        },
        down: {
            x: 0,
            y: 1,
            rotate: 0
        }
    }
}
Snake.prototype.init = function (){     //初始化蛇
    var sankeHead = new Square(2,0,'snakeHead');    //创建蛇头
    sankeHead.create();
    this.head = sankeHead;      //存储蛇头的信息
    this.pos.push([2,0]);       //存放蛇头的位置

    /*创建蛇身体 */
    var snakeBody1 = new Square(1,0,'snakeBody');
    snakeBody1.create();
    this.pos.push([1,0]);       //存放蛇身1的坐标

    var snakeBody2 = new Square(0,0,'snakeBody');
    snakeBody2.create();
    this.tail = snakeBody2;     //存放蛇尾的信息
    this.pos.push([0,0]);       //存放蛇身2的坐标

    /*形成链表关系 */       
    sankeHead.last = null;      //前一个
    sankeHead.next = snakeBody1;        //后一个

    snakeBody1.last = sankeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    /**给蛇添加一条属性，表示蛇走的方向 */
    this.direction = this.directionNum.right;   //默认往右
};

/**获取蛇头下一个位置对应的元素，根据不同的元素做不同的事 */
Snake.prototype.getNextPos= function (){
    var nextPos = [     //蛇头要走的下个位置的坐标
        this.head.x/sw + this.direction.x,
        this.head.y/sh + this.direction.y
    ]

    /**下个点是自己  代表撞到自己  game over */
    var selfCollied = false;    //是否撞到自己
    this.pos.forEach(function (value){
        if(value[0]==nextPos[0] && value[1]==nextPos[1]){
            //如果数组里两个数都相等，说明下个位置是蛇的身体
            selfCollied = true;
        }
    });
    if(selfCollied){
        console.log('撞到自己了');
        this.strategies.die.call(this);
        return;
    }

    /**下个点是墙  game over */
    if(nextPos[0]<0 || nextPos[1]<0 |nextPos[0]>td-1 || nextPos[1]>tr-1){
        console.log('撞墙了');
        this.strategies.die.call(this);
        return;
    }

    /**下个点是食物  吃 */
    if(food && food.pos[0]==nextPos[0] && food.pos[1]==nextPos[1]){
        // console.log('eat');
        this.strategies.eat.call(this);

        return;     
    }

    /**下个点什么也没有  走 */
    this.strategies.move.call(this);
};

//处理碰撞后的方法
Snake.prototype.strategies= {
    move: function (format){    //这个参数决定要不要删除最后一个方块(蛇尾this.tail)
        /**创建一个新的身体（放在原来蛇头的位置） */
        var newBody = new Square(this.head.x/sw, this.head.y/sh, 'snakeBody');
        //更新链表关系
        newBody.next = this.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        this.head.remove();     //把原来的蛇头从原来的位置干掉
        newBody.create();

        //创建一个新的蛇头(蛇头下一个要走到的点)
        var newHead = new Square(this.head.x/sw + this.direction.x, this.head.y/sh + this.direction.y, 'snakeHead');
        //更新链表关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        newHead.viewContent.style.transform = 'rotate('+this.direction.rotate+'deg)';   //扭头
        newHead.create();  

        // 蛇身上每一个方块的坐标也要更新(pos[])
        this.pos.splice(0, 0, [this.head.x/sw + this.direction.x, this.head.y/sh + this.direction.y]);
        this.head = newHead;    //更新

        if(!format){    //如果format为false，表示需要删除
            this.tail.remove();
            this.tail = this.tail.last;

            this.pos.pop();
        }  
    },
    eat: function (){
        this.strategies.move.call(this, true);
        createFood();
        game.score++;
    },
    die: function (){
        game.over();
    }
}

snake = new Snake();



/*创建食物*/
function createFood(){
    var x = null,   //食物的随机坐标
        y = null;
    var include = true;     //循环跳出的条件 true表示食物坐标在蛇身上 继续循环
    while(include){
        x = Math.round(Math.random()*(td-1));
        y = Math.round(Math.random()*(tr-1));

        snake.pos.forEach(function (value){
            if(x!=value[0] && y!=value[1]){ //食物不在蛇身上
                include = false;
            }
        });

    }
    /**生成食物 */
    food = new Square(x, y, 'food');
    food.pos = [x, y];  //存储生成食物的坐标 用来判断蛇头是否碰到食物

    var foodDom = document.querySelector('.food');
    if(foodDom){
        foodDom.style.left = x*sw+'px';
        foodDom.style.top = y*sh+'px';
    }else{
        food.create();
    }
}


//创建游戏逻辑
function Game(){
    this.timer = null;
    this.score = 0;
}
Game.prototype.init = function (){
    snake.init();
    //snake.getNextPos();
    createFood();

    document.onkeydown = function (ev){
        if(ev.which == 37 && snake.direction != snake.directionNum.right){  //按下左键的时候 蛇不能是正在往右走的
            snake.direction = snake.directionNum.left;
        }else if(ev.which == 38 && snake.direction != snake.directionNum.down){
            snake.direction = snake.directionNum.up;
        }else if(ev.which == 39 && snake.direction != snake.directionNum.left){
            snake.direction = snake.directionNum.right;
        }else if(ev.which == 40 && snake.direction != snake.directionNum.up){
            snake.direction = snake.directionNum.down;
        }
    }

    this.start();
}
Game.prototype.start = function (){
    this.timer = setInterval(function (){
        snake.getNextPos();
    },speed);
}
Game.prototype.pause = function (){
    clearInterval(this.timer);
}
Game.prototype.over = function (){
    clearInterval(this.timer);
    alert('游戏结束 得分：'+this.score);

    //初始化游戏
    var snakeWrap = document.getElementById('snakeWrap');
    snakeWrap.innerHTML = '';

    snake = new Snake();
    game = new Game();

    var startBtnWrap = document.querySelector('.startBtn');
    startBtnWrap.style.display = 'block';
}

//开始游戏
game = new Game();
var startBtn = document.querySelector('.startBtn button');
startBtn.onclick = function (){
    startBtn.parentNode.style.display = 'none';
    game.init();
}

//暂停
var snakeWrap = document.getElementById('snakeWrap');
var pauseBtn = document.querySelector('.pauseBtn button');
snakeWrap.onclick = function (){
    game.pause();
    pauseBtn.parentNode.style.display = 'block';
}
pauseBtn.onclick = function (){
    game.start();
    pauseBtn.parentNode.style.display = 'none';
}