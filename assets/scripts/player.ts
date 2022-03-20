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

const   TANK_SPEED:number=16

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
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
    }

    setDirection(direction:TANK_DIRCTION){
        switch(direction)
        {
            case TANK_DIRCTION.LEFT:
                {
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(-TANK_SPEED,0))
                    let tiledMap=GameManager.getInstance().getTiledMap()
                    let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,worldPos)
                    if(DataManager.getInstance().isTiledMapBorderByPoint(tiledMap,tilePoint)){
                        return
                    }
                    if(DataManager.getInstance().isExitTileByPoint(tiledMap,tilePoint)){
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
                    let nodeWidth=this.playerSprite.node.width*this.playerSprite.node.scaleX
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(TANK_SPEED+nodeWidth,0))
                    let tiledMap=GameManager.getInstance().getTiledMap()
                    let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,worldPos)
                    if(DataManager.getInstance().isTiledMapBorderByPoint(tiledMap,tilePoint)){
                        return
                    }
                    if(DataManager.getInstance().isExitTileByPoint(tiledMap,tilePoint)){
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
                    let nodeHeight=this.playerSprite.node.height*this.playerSprite.node.scaleX
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(0,TANK_SPEED+nodeHeight))
                    let tiledMap=GameManager.getInstance().getTiledMap()
                    let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,worldPos)
                    if(DataManager.getInstance().isTiledMapBorderByPoint(tiledMap,tilePoint)){
                        return
                    }
                    if(DataManager.getInstance().isExitTileByPoint(tiledMap,tilePoint)){
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
                    let nodeHeight=this.playerSprite.node.height*this.playerSprite.node.scaleX
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(0,-TANK_SPEED-nodeHeight))
                    let tiledMap=GameManager.getInstance().getTiledMap()
                    let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,worldPos)
                    if(DataManager.getInstance().isTiledMapBorderByPoint(tiledMap,tilePoint)){
                        return
                    }
                    if(DataManager.getInstance().isExitTileByPoint(tiledMap,tilePoint)){
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

    // update (dt) {}
}
