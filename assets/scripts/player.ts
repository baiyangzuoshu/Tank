// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";
import { TANK_DIRCTION } from "./enum";
import { GameManager } from "./gameManager";

const {ccclass, property} = cc._decorator;

const   TANK_SPEED:number=5

enum TANK_ATLAS_NAME{
    LEFT="player2L",
    RIGHT="player2R",
    UP="player2U",
    DOWN="player2D"
}

@ccclass
export default class Player extends cc.Component {
    @property(cc.Sprite)
    playerSprite:cc.Sprite=null
    @property(cc.SpriteAtlas)
    tankAtlas:cc.SpriteAtlas=null

    _drection:TANK_DIRCTION=TANK_DIRCTION.UP
    _time:number=0
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
    }

    fire(){
        cc.loader.loadRes("prefab/bullet",cc.Prefab,(err,bulletPrefab:cc.Prefab)=>{
            let tiledMap=GameManager.getInstance().getTiledMap()
            let layer:cc.TiledLayer=tiledMap.getLayer("layer_0")

            let bullet=cc.instantiate(bulletPrefab)
            bullet.parent=layer.node//敌军以及子弹、坦克生成在layer_0层
            
            let pArr=DataManager.getInstance().getDirection3Point(this.getDirection(),this.playerSprite.node,TANK_SPEED)
            //取中间点为起始点，layer起始位置是(cc.winSize.width/2,cc.winSize.height/2)
            let bulletX=pArr[1].x-cc.winSize.width/2
            let bulletY=pArr[1].y-cc.winSize.height/2
            bullet.x=bulletX
            bullet.y=bulletY

            let ts=bullet.getComponent("bullet")
            ts.setDirection(this.getDirection())
        })
    }

    getDirection():TANK_DIRCTION{
        return this._drection
    }

    setDirection(direction:TANK_DIRCTION){
        //perf:转向和行走需要分开
        switch(direction)
        {
            case TANK_DIRCTION.LEFT:
                {
                    let speed=0//默认是转向
                    if(this._drection==direction)//行走
                    {
                        speed=TANK_SPEED
                    }

                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.playerSprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction

                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.LEFT)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.x-=TANK_SPEED
                    break;
                }
            case TANK_DIRCTION.RIGHT:
                {
                    let speed=0//默认是转向
                    if(this._drection==direction)//行走
                    {
                        speed=TANK_SPEED
                    }

                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.playerSprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction
                    
                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.RIGHT)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.x+=TANK_SPEED
                    break;
                }
            case TANK_DIRCTION.UP:
                {
                    let speed=0//默认是转向
                    if(this._drection==direction)//行走
                    {
                        speed=TANK_SPEED
                    }

                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.playerSprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction
                    
                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.UP)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.y+=TANK_SPEED
                    break;
                }
            case TANK_DIRCTION.DOWN:
                {
                    let speed=0//默认是转向
                    if(this._drection==direction)//行走
                    {
                        speed=TANK_SPEED
                    }
                    
                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.playerSprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction
                    
                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.DOWN)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.y-=TANK_SPEED
                    break;
                }
            default:
                break;
        }
    }

    init():void{
        let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.UP)
        this.playerSprite.spriteFrame=spriteFrame
    }

    start () {

    }

    update (dt) {

    }
}
