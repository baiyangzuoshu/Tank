// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TANK_DIRCTION } from "./enum";

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
                    this._drection=direction

                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.LEFT)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.x-=TANK_SPEED
                    break;
                }
            case TANK_DIRCTION.RIGHT:
                {
                    this._drection=direction
                    
                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.RIGHT)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.x+=TANK_SPEED
                    break;
                }
            case TANK_DIRCTION.UP:
                {
                    this._drection=direction
                    
                    let spriteFrame=this.tankAtlas.getSpriteFrame(TANK_ATLAS_NAME.UP)
                    this.playerSprite.spriteFrame=spriteFrame

                    this.node.y+=TANK_SPEED
                    break;
                }
            case TANK_DIRCTION.DOWN:
                {
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
