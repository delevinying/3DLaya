(function () {
	/**
	 * 游戏入口
	 */
	function RunGame(){

		this.bg = null;
		this.mapFloor = null;
		this.player = null;

		this.flyEnergy = null;
		this.speedEnergy = null;

		this.scoreTxt = null;
		this.score = 0;

		this.gameOver = null;

		//物品碰撞检测坐标点
        this.itemPoint = new Point();

		RunGame.__super.call(this);
		this.init();
	}
	//RunGame 是一个显示对象 继承此 Sprite
	Laya.class(RunGame,"RunGame", laya.display.Sprite);
	
	//定义RunGame的prototype
	var _proto = RunGame.prototype;
	
	//初始化
	_proto.init = function(){
		console.log('RunGame Init');

		//背景
		this.bg = new Background();
		this.addChild(this.bg);
		// //地板
		// this.mapFloor = new MapFloor();
		// this.addChild(this.mapFloor);
		
		// //飞行能量条
		// this.flyEnergy = new Hp(Hp.HP_TYPE_ENERGY);
		// this.flyEnergy.y = 7;
		// this.addChild(this.flyEnergy);
		
		// //速度能量条
		// this.speedEnergy = new Hp(Hp.HP_TYPE_SPEED);
		// this.speedEnergy.y = 7;
		// this.speedEnergy.x = this.flyEnergy.width + 10;
		// this.addChild(this.speedEnergy);
		
		// //玩家
		// this.player = new Player(this.flyEnergy, this.speedEnergy);
		// this.player.x = 32 * 8;
		// this.player.y = 32 * 4;
		// this.player.on(Player.DIE, this, this.playerDie);
		// this.addChild(this.player);

		//分数
		this.scoreTxt = new Text();
		this.scoreTxt.color = "#ffffff";
		this.scoreTxt.fontSize = 30;
		this.scoreTxt.text = "0";
		this.scoreTxt.width = Config.GameWidth;
		this.scoreTxt.align = "right";
		this.scoreTxt.x = -10;
		this.scoreTxt.y = 10;
		this.addChild(this.scoreTxt);

		
		//游戏结束
		// this.gameOver = new GameOver();
		// this.gameOver.visible = false;
		// this.addChild(this.gameOver);

		
		//监听 按下 弹起 事件
		Laya.stage.on(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
		Laya.stage.on(laya.events.Event.MOUSE_UP, this, this.onMouseUp);
		
		// this.gameOver.once(laya.events.Event.MOUSE_DOWN, this, this.gameReset);
		// this.NpcTime = new Date().getTime();

        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
	}
	_proto.onLoop = function(){
		// 检测人物是否踩在地板上面了
		// for(var i = this.mapFloor.numChildren - 1; i > -1; i--){
		// 	var floor = this.mapFloor.getChildAt(i);
		// 	//检测人物是否踩在地板上面了
		// 	if(floor.checkHit(this.player.x, this.player.y)){
		// 		//检测是否碰到道具了
		// 		var itemList = floor.getItems();
		// 		for(var j = 0; j < itemList.length; j++){
		// 			var item = itemList[j];
		// 			//只有显示的物品才做碰撞检测
		// 			if(item.visible){
		// 				//拿到物品的坐标 
		// 				this.itemPoint.x = item.x + floor.x + this.player.width;
		// 				this.itemPoint.y = item.y + floor.y + this.player.height;
		// 				//物品碰到人物了
		// 				if(this.player.hitTestPoint(this.itemPoint.x, this.itemPoint.y)){
		// 					//物品有多个类型 分类型进行判断
		// 					if(item.type == Item.ITEM_TYPE_SPEED){
		// 						item.visible = false;
		// 						this.player.showEffect();
		// 					}else if(item.type == Item.ITEM_TYPE_FLY){
		// 						item.visible = false;
		// 						//如果碰到悬空道具能量直接加满
		// 						this.flyEnergy.changeValue(100);
		// 					}else{
		// 						//星星物品播放动画
        // 						Tween.to(item, {y : -10, scaleX : 0.1, alpha : 0}, 300, null, Handler.create(this, this.itemTweenComplete, [item]));
		// 						this.updateScore();
		// 					}
		// 				}
		// 			}
		// 		}
		// 		//人物如果踩到地板了 就把人物的坐标设置到地板上面
		// 		this.player.y = floor.y;
		// 		//如果到地板上面的 就得重置跳的方法
		// 		this.player.jumpReset();
		// 	}
		// }
		//1500毫秒生成一个NPC
		var leftTime = new Date().getTime() - this.NpcTime;
		if(leftTime > 1500){
			// this.NpcTime = new Date().getTime();
			// var npc = Pool.getItemByClass("npc",Npc);
			// this.addChild(npc);
		}
	}
	//星星物品动画结束回调 重置星星物品的状态
	_proto.itemTweenComplete = function(item){
		item.visible = false;
		item.y = 0;
		item.alpha = 1;
		item.scale(1,1);
	}
	//点击 出发人物 跳跃
	_proto.onMouseDown = function(){
		this.player.jump();
	}
	_proto.onMouseUp = function(){
		this.player.gotoJump();
	}
	//游戏重新开始 这里简单点 就刷新页面吧
	_proto.gameReset = function(){
		location.reload();
	}
	//玩家死亡了
	_proto.playerDie = function(){
		Config.isOver = true;
		this.gameOver.setScore(this.score);
		this.gameOver.visible = true;
	}
	//更新分数
	_proto.updateScore = function(){
		this.score++;
		this.scoreTxt.text = this.score;
	}
})();