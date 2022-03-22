// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";
import { TANK_DIRCTION, TANK_SPEED, TANK_TYPE } from "./enum";
import { GameManager } from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TankBase extends cc.Component {
    @property(cc.Sprite)
    sprite:cc.Sprite=null
    @property(cc.SpriteAtlas)
    tankAtlas:cc.SpriteAtlas=null

    _drection:TANK_DIRCTION=TANK_DIRCTION.UP
    _type:TANK_TYPE=TANK_TYPE.NORMAL
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    getType():TANK_TYPE{
        return this._type
    }

    setType(type:TANK_TYPE):void{
        if(type>TANK_TYPE.NORMAL&&type<TANK_TYPE.MAX)
        {
            this._type=type
        }
    }

    fire(){
        cc.loader.loadRes("prefab/bullet",cc.Prefab,(err,bulletPrefab:cc.Prefab)=>{
            let tiledMap=GameManager.getInstance().getTiledMap()
            let layer:cc.TiledLayer=tiledMap.getLayer("layer_0")

            let bullet=cc.instantiate(bulletPrefab)
            bullet.parent=layer.node//敌军以及子弹、坦克生成在layer_0层
            
            let pArr=DataManager.getInstance().getDirection3Point(this.getDirection(),this.sprite.node,TANK_SPEED)
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

                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.sprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction

                    this.updateTankSprite()

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

                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.sprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction
                    
                    this.updateTankSprite()

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

                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.sprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction
                    
                    this.updateTankSprite()

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
                    
                    let pArr=DataManager.getInstance().getDirection3Point(direction,this.sprite.node,TANK_SPEED)
                    if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                        return
                    }

                    this._drection=direction
                    
                    this.updateTankSprite()

                    this.node.y-=TANK_SPEED
                    break;
                }
            default:
                break;
        }
    }

    init():void{
        let tankAtlasName=this.getTankAtlasName()
        let spriteFrame=this.tankAtlas.getSpriteFrame(tankAtlasName)
        this.sprite.spriteFrame=spriteFrame
    }

    updateTankSprite():void{
        let tankAtlasName=this.getTankAtlasName()
        let spriteFrame=this.tankAtlas.getSpriteFrame(tankAtlasName)
        this.sprite.spriteFrame=spriteFrame
    }

    getTankAtlasName():string{
        let directionName=""
        switch(this.getDirection())
        {
            case TANK_DIRCTION.LEFT:
                {
                    directionName="L"
                    break;
                }
            case TANK_DIRCTION.RIGHT:
                {
                    directionName="R"
                    break;
                }
            case TANK_DIRCTION.UP:
                {
                    directionName="U"
                    break;
                }
            case TANK_DIRCTION.DOWN:
                {
                    directionName="D"
                    break;
                }
            default:
                break;
        }

        if(TANK_TYPE.PLAYER==this.getType())
        {
            return "player2"+directionName
        }
        else if(TANK_TYPE.ENEMY==this.getType())
        {
            return "normal"+directionName
        }

        return ""
    }

    start () {

    }

    update (dt) {

    }
}
