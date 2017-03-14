(function () {
	
    
    /**
     * 背景类
     * 
     */
	function Background(){
        //图片的宽度
        this.BG_WIDTH = 1600;
        //记录当前移动的值
        this.moveX = 0;
        //定义背景1
        this.bg1 = null;
        //定义背景2
        this.bg2 = null;
        //草堆
        this.grass = null;
        
		Background.__super.call(this);
		this.init();
	}
	//Background 是一个显示对象 继承此 Sprite
	Laya.class(Background, "Background", Sprite);
	
	var _proto = Background.prototype;
	
	_proto.init = function(){
        var texture1 = Laya.loader.getRes('res/background.png');
        var texture2 = Laya.loader.getRes('res/m_background.png');
        //创建背景1
        this.bg1 = new Sprite();
        //绘制背景图1
        this.bg1.graphics.drawTexture(texture1, 0, 0);
        //把背景1添加到当前容器对象里。
        this.addChild(this.bg1);

        //创建背景2
        this.bg2 = new Sprite();
        //绘制背景图2
        this.bg2.graphics.drawTexture(texture1, 0, 0);
        //设置背景2 的坐标。
        this.addChild(this.bg2);
        //把第二个背景放到第一个背景屁股后面紧跟着
        this.bg2.pos(this.BG_WIDTH, 0);
        
        //前景图片草垛
        this.grass = new Sprite();
        //绘制草垛
        this.grass.graphics.drawTexture(texture2, 0, 0);
        //把草垛居底部显示
        // this.grass.y = Browser.clientHeight - this.grass.height;
        this.addChild(this.grass);
        
        //创建一个帧循环处理函数，用于背景位置的更新，实现背景滚动效果。
        Laya.timer.frameLoop(1, this, this.onLoop);
	}
    
    _proto.onLoop = function(){

        if(Config.isPause || Config.isOver)return;

        //移动
        this.x -= Config.speed * 0.1;
        this.moveX = Math.abs(this.x);
        
        //当背景1向左移动出游戏的显示区域 1600，则将背景1的x轴坐标,向右移动 1600*2.
        if (this.moveX - this.bg1.x >= this.BG_WIDTH) {
            this.bg1.x += this.BG_WIDTH * 2;
        }
        //当背景2向左移动出游戏的显示区域 1600，则将背景2的x轴坐标,向右移动 1600*2.
        if (this.moveX - this.bg2.x >= this.BG_WIDTH) {
            this.bg2.x += this.BG_WIDTH * 2;
        }
        //草移动
        this.grass.x -= 5 * 0.5;
        if(this.grass.x + 960 < 0){
            this.grass.x = this.moveX + Config.GameWidth;
        }
    }
	
	
})();