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

    _drection:TANK_DIRCTION=0
    _time:number=0
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
    }

    setDirection(direction:TANK_DIRCTION){
        switch(direction)
        {
            case TANK_DIRCTION.LEFT:
                {
                    let rect=this.playerSprite.node.getBoundingBoxToWorld()
                    let pArr:Array<cc.Vec2>=[]
                    let index=(rect.yMax-rect.yMin)/2
                    for(let y=rect.yMin;y<=rect.yMax;y=y+index)
                    {
                        pArr.push(new cc.Vec2(rect.xMin-TANK_SPEED,y))
                    }

                    if(!this.isWalkByPointArray(pArr)){
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
                    let rect=this.playerSprite.node.getBoundingBoxToWorld()
                    let pArr:Array<cc.Vec2>=[]
                    let index=(rect.yMax-rect.yMin)/2
                    for(let y=rect.yMin;y<=rect.yMax;y=y+index)
                    {
                        pArr.push(new cc.Vec2(rect.xMax+TANK_SPEED,y))
                    }

                    if(!this.isWalkByPointArray(pArr)){
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
                    let rect=this.playerSprite.node.getBoundingBoxToWorld()
                    let pArr:Array<cc.Vec2>=[]
                    let index=(rect.xMax-rect.xMin)/2
                    for(let x=rect.xMin;x<=rect.xMax;x=x+index)
                    {
                        pArr.push(new cc.Vec2(x,rect.yMax+TANK_SPEED))
                    }

                    if(!this.isWalkByPointArray(pArr)){
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
                    let rect=this.playerSprite.node.getBoundingBoxToWorld()
                    let pArr:Array<cc.Vec2>=[]
                    let index=(rect.xMax-rect.xMin)/2
                    for(let x=rect.xMin;x<=rect.xMax;x=x+index)
                    {
                        pArr.push(new cc.Vec2(x,rect.yMin-TANK_SPEED))
                    }

                    if(!this.isWalkByPointArray(pArr)){
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

    isWalkByPointArray(pArray:Array<cc.Vec2>):boolean{
        for(let i=0;i<pArray.length;i++)
        {
            let tiledMap=GameManager.getInstance().getTiledMap()
            let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,pArray[i])
            if(DataManager.getInstance().isTiledMapBorderByPoint(tiledMap,tilePoint)){
                return false
            }
            if(DataManager.getInstance().isExitTileByPoint(tiledMap,tilePoint)){
                return false
            }
        }

        return true
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
