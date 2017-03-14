(function () {
	
    /**
     * 玩家类 
     */
    
	function Player(flyEnergy, speedEnergy){
        
        //悬空能量条引用
        this.flyEnergy = flyEnergy;
        //加速能量条引用
        this.speedEnergy = speedEnergy;

        //记录当前动作
        this.action = null;
        //玩家
        this.body = null;

        //跳 统计数
        this.jumpCount = 0;
        //跳 最大次数 如果想三连跳 改成 3 即可
        this.jumpCountMax = 2;

        //下落变量
        this.vy = 0;
        //下落速度
        this.downSpeed = 3;
        //最大下路值
        this.maxVy = 32;

        //残影
        this.bodyEffect1 = null;
        this.bodyEffect2 = null;
        //特效
        this.spiritEffect = null;

		Player.__super.call(this);

        //这里我们强制设置一下 玩家的宽度和高度
        this.width = 96;
        this.height = 96;
        
		this.init();
	}
    //玩家动作

    //跑
    Player.RUN = "player_run";
    //飞
    Player.FLY = "player_fly";
    //暂时没有用到的动作
    Player.HERT = "player_hert";
    //跳
    Player.JUMP = "player_jump";

    //状态
    Player.DIE = "player_die";
    
	//Player
	Laya.class(Player,"Player", laya.display.Sprite);
	
	var _proto = Player.prototype;

    //是否缓存了
	Player.cached = false;
    
	_proto.init = function(){
        //动画缓存起来
		if(!Player.cached){
            
            Player.cached = true;
            //根据不同的动画 来创建动画模板
            laya.display.Animation.createFrames(['player/chara_01.png','player/chara_02.png','player/chara_03.png','player/chara_04.png'], Player.RUN);
            laya.display.Animation.createFrames(['player/chara_05.png','player/chara_06.png','player/chara_07.png','player/chara_08.png'], Player.FLY);
            //Animation.createFrames(['player/chara_09.png','player/chara_10.png','player/chara_11.png','player/chara_12.png'], Player.HERT);
            laya.display.Animation.createFrames(['player/chara_13.png','player/chara_14.png','player/chara_15.png','player/chara_16.png'], Player.JUMP);
                        
        }
		
        if(this.body == null){
            
            var texture = Laya.loader.getRes("res/spiritEffect.png");
            this.spiritEffect = new Sprite();
            this.spiritEffect.pivot(154 * 0.5, 190 * 0.5);
            this.spiritEffect.visible = false;
            this.spiritEffect.scale(5, 5);
            this.spiritEffect.graphics.drawTexture(texture, 0, 0, 154, 190);
            this.addChild(this.spiritEffect);

            this.bodyEffect1 = new Animation();
            this.bodyEffect1.alpha = 0.6;
            this.bodyEffect1.pivot(80,60);
            this.bodyEffect1.interval = 100;
            this.bodyEffect1.visible = false;
            this.addChild(this.bodyEffect1);
            
            this.bodyEffect2 = new Animation();
            this.bodyEffect2.alpha = 0.3;
            this.bodyEffect2.pivot(110,60);
            this.bodyEffect2.interval = 100;
            this.bodyEffect2.visible = false;
            this.addChild(this.bodyEffect2);

            this.body = new laya.display.Animation();
            this.body.pivot(48,60);
            this.body.interval = 100;
            this.addChild(this.body);
            
        }
        //播放动作对应的动画
        this.playAction(Player.RUN);
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop)
	}
    /**
     * 播放动作对应的动画
     * action String 动作名称
     */
	_proto.playAction = function(action){
        //如果是重复的动作 不执行
        if(this.action == action)return;
        this.action = action;
        this.body.play(0, true, this.action);
        this.bodyEffect1.play(0, true, this.action);
        this.bodyEffect2.play(0, true, this.action);
    }
    _proto.onLoop = function(){

        //玩家开始下落
        this.y += this.vy;
        this.vy += this.downSpeed;

        //判断玩家当前是否在特效中
        if(this.isEffect()){
            //如果在特效中的话 我们就慢慢的消耗能量 知道为1的时候 就变回原来的默认状态
            this.speedEnergy.changeValue(-0.2);
            if(this.speedEnergy.value <= 1){
                this.hideEffect();
                this.gotoRun();
            }
        }

        //控制最大值
        if(this.vy > this.maxVy){
            this.vy = this.maxVy;
        }
        
        //如果玩家y轴掉出屏幕以外100像素 就算游戏结束
        if( this.y > (Config.GameHeight + 100)){
            // console.log('gameOver');
            //派发事件通知游戏结束了
            this.event(Player.DIE, this);
            return;
        }

        switch(this.action){
            case Player.FLY:
	            //如果当前是飞行状态 将玩家Y轴慢慢往上提 并且不超过最大值
	            //没有加速特效的情况才会扣除能量值
                if(!this.isEffect())this.flyEnergy.changeValue(-0.5);
                if(this.flyEnergy.value <= 1){
                    this.gotoJump();
                }else{
                    this.vy = 0;
                    this.y -= 4;
                    if(this.y < 110)this.y = 110;
                }
            break;
            default:
                //悬空能量条 在非悬空状态下面会慢慢的增加
                this.flyEnergy.changeValue(0.05);
            break;
        }

    }
    //开始跳
    _proto.gotoJump = function(){
	   this.playAction(Player.JUMP);
    }
    //开始跑
    _proto.gotoRun = function(){
	   this.playAction(Player.RUN);
    }
    //开始飞
    _proto.gotoFly = function(){
        this.playAction(Player.FLY);
    };
    /**
     * 触发跳（二连跳）
     */
    _proto.jump = function(){
        //当跳跃计数小于最大计数的时候 可以连续跳跃
        if(this.jumpCount < this.jumpCountMax){
            this.vy = -30;
            this.jumpCount++;
            this.gotoJump();
        }else{
            this.gotoFly();
        }
        
    }
     //跳结束重置
    _proto.jumpReset = function(){
	    this.vy = 0;
        this.jumpCount = 0;
        this.gotoRun();
    }
    //是否处于特效效果中
    _proto.isEffect = function(){
        return this.bodyEffect1.visible;
    }
    //显示特效
    _proto.showEffect = function(){
        Config.isPause = true;
        Config.speed = Config.SPEED_FAST;
        this.spiritEffect.visible = true;
        Tween.to(this.spiritEffect, {scaleX : 0.1, scaleY : 0.1, rotation : 360}, 1000, null, Handler.create(this, this.spiritEffectTweenComplete));
    }
    //隐藏特效
    _proto.hideEffect = function(){
        this.bodyEffect1.visible = false;
        this.bodyEffect2.visible = false;
        Config.speed = Config.SPEED_SLOW;
    }
    _proto.spiritEffectTweenComplete = function(){
        this.spiritEffect.visible = false;
        this.spiritEffect.scale(5, 5);
        this.bodyEffect1.visible = true;
        this.bodyEffect2.visible = true;
        Config.isPause = false;
    }
})();