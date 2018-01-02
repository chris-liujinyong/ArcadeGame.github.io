// 定义Enemy的函数
var Enemy = function(x,y,speed) {
    //Bugs的下限速度
    var lowSpeed=150;
    //Bugs的上限速度
    var highSpeed=350;
    //Bugs出现的位置
    this.x=x;
    this.y=y;
    //Bugs的初始速度
    this.speed=lowSpeed+Math.random()*(highSpeed-lowSpeed);
    //加载Enemy的图片
    this.sprite = 'images/enemy-bug.png';
};

//用来更新敌人位置的函数
//Parameter: dt, 表示时间间隙
Enemy.prototype.update = function(dt) {
    // Bugs每一次的移动速度都乘以dt参数，来保证在所有的电脑上都是以同样的速度运行
    this.x += dt * this.speed;
    //如果Enemy越过边界，就自动回到起点重复出现
    if (this.x>=505){
        this.x=-100;
    }
};

// 游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 定义玩家的函数
// Parameter:x,y
var Player=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/char-boy.png';
};

/**定义更新玩家的函数,当玩家到达对岸之后显示游戏胜利并重新开始
 **Parameter:dt
 **/
//定义一个全局变量，避免在每毫秒刷新前，玩家没有到达对岸就弹出游戏胜利并返回原点的现象
var count=0;
Player.prototype.update=function(dt){
    if (this.y===-11) {
        count++;
        //经过测试，经过3ms后就可以到达对岸，并在网页输出胜利信息
        if (count%3===2) {
        alert("你赢了！点击确定重新开始游戏");
        player.reset();
        }
    }

};

//定义重置玩家位置的函数
Player.prototype.reset=function(){
    this.x=200;
    this.y=404;

}

/**定义操作玩家移动的函数,并防止玩家越出画面边界
**Parameter:movement
**/
Player.prototype.handleInput=function(movement){
    switch(movement){
        case'left':
        if(this.x>=0){
            this.x-=101;
        }break;
        case'right':
        if(this.x<=354){
            this.x+=101;
        }break;
        case'up':
        if(this.y>=72){
            this.y-=83;
        }break;
        case'down':
        if(this.y<=321){
            this.y+=83;
        }break;
    }

};

//定义一个render渲染函数，用来在屏幕上画出玩家
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

//定义一个碰撞函数
Player.prototype.checkCollisions=function(){
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.y===allEnemies[i].y) {
            if (Math.abs(this.x-allEnemies[i].x)<40) {
                player.reset();
            }
        }
    }
};

// 实例化所有对象
// 定义allEnemies的数组
var allEnemies=new Array();
//定义8个Enemy,每行两个
for(var n=0;n<8;n++){
      var Enemy_here=new Enemy(-30,83*(n%4)+72);
      //将所有Enemy添加到allEnemies的数组
      allEnemies.push(Enemy_here);
}
//把玩家对象放进一个叫player的变量里面
var player=new Player(200,404);



// 定义监听玩家的键盘点击事件，将按键的关键数字传递到Play.handleInput方法里面
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
