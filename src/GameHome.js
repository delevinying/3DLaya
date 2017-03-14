//laya初始化
Laya.init(Config.GameWidth, Config.GameHeight, Laya.WebGL);
//FPS
Laya.Stat.show(0,100);
//设置适配模式
Laya.stage.scaleMode = "exactfit";
//设置剧中对齐
Laya.stage.alignH = "center";
//设置横屏
Laya.stage.screenMode = "horizontal";

//loading
var loading = new Loading();    
Laya.stage.addChild(loading);
//游戏介绍
var gameInfo = new GameInfo();


//加载单个资源
var asset = [];
asset.push({
    url : [
        "res/background.jpg",
        "res/bg.png",
         
    ],
    type : Laya.Loader.IMAGE
});
// //加载图集资源
// asset.push({
//     url:"res/player.json",
//     type : Laya.Loader.ATLAS
// });
    
    
//加载图集资源
Laya.loader.load(asset, Handler.create(this, onLoaded), Handler.create(this, onLoading, null, false));
gameInfo.once(laya.events.Event.MOUSE_DOWN, this, onMouseDown);


//游戏介绍点击进入 开始游戏咯
function onMouseDown(){
    gameInfo.removeSelf();
    Config.isPause = false;
}
//加载进度
function onLoading(progress){
    console.log("onLoading: " + progress);
}
//加载完毕
function onLoaded(){
    console.log("onLoaded");
    //加载完毕移除loading 显示游戏提示UI 并且初始化游戏
    Laya.stage.removeChild(loading);
    // //实例化RunGame
    Laya.stage.addChild(new RunGame());
    Laya.stage.addChild(gameInfo);
} 