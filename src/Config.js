var Sprite = laya.display.Sprite;
var Text = laya.display.Text;
var Bitmap = laya.resource.Bitmap;
var Texture = laya.resource.Texture;
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var Animation = laya.display.Animation;
var Rectangle = laya.maths.Rectangle;
var Event = laya.events.Event;
var Pool = laya.utils.Pool;
var Browser = laya.utils.Browser;
var Stat = laya.utils.Stat;
var SoundManager = laya.media.SoundManager;
var Pool = laya.utils.Pool;
var Point = laya.maths.Point;
var Tween = laya.utils.Tween;
var LocalStorage = laya.net.LocalStorage;
var SoundManager = laya.media.SoundManager;


var Config = {
    
    //游戏宽 高
    GameWidth : 852,
    GameHeight : 480,

    //游戏速度
    speed : 8,
    //最低速度
    SPEED_SLOW : 8,
    //最高速度
    SPEED_FAST : 12,

    //是否暂停
    isPause : true,
    //是否结束
    isOver : false
};