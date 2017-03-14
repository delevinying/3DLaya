(function () {
	
	/**
	 * 游戏介绍
	 */
	function GameInfo(){
		this.bg = null;
		this.txt = null;
		GameInfo.__super.call(this);
		this.init();
	}
	//GameInfo
	Laya.class(GameInfo,"GameInfo", laya.display.Sprite);
	
	var _proto = GameInfo.prototype;
	
	_proto.init = function(){
		this.width = Config.GameWidth;
		this.height = Config.GameHeight;
		//黑色背景
		this.bg = new Sprite();
		this.bg.alpha = 0.8;
		this.bg.graphics.drawRect(0,0,Config.GameWidth,Config.GameHeight,"#000000");
		this.addChild(this.bg);
		
		//loading文本
		this.txt = new Text();
		this.txt.color = "#ffffff";
		this.txt.fontSize = 30;
		this.txt.text = "游戏介绍\n\n点击可控制人物跳跃\n\n（小提示 点两次可触发人物连跳 再连跳后 再次点击可出发人物飞行哦！）\n\n左上角紫色条代表当前飞行的精力 黄色条 代表加速状态\n\n\n好了 点击屏幕开始狂奔之旅吧~~";
		this.txt.width = Config.GameWidth;
		this.txt.align = "center";
		this.txt.y = (Config.GameHeight - this.txt.height) * 0.5;
		this.addChild(this.txt);
		
	}
	
	
})();