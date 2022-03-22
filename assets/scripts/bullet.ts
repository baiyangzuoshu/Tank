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
const   BULLET_SPEED=5
@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    _direction:TANK_DIRCTION=-1

    onLoad () {

    }

    getDirection():TANK_DIRCTION{
        return this._direction
    }

    setDirection (drection:TANK_DIRCTION) {
        if(drection>TANK_DIRCTION.NORMAL&&drection<TANK_DIRCTION.MAX)
            this._direction=drection
    }

    update (dt) {
        switch(this.getDirection())
        {
            case TANK_DIRCTION.LEFT:
                {
                    this.node.x-=BULLET_SPEED
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(0,0))
                    break;
                }
            case TANK_DIRCTION.RIGHT:
                {
                    this.node.x+=BULLET_SPEED
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(0,0))
                    break;
                }
            case TANK_DIRCTION.UP:
                {
                    this.node.y+=BULLET_SPEED
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(0,0))
                    break;
                }
            case TANK_DIRCTION.DOWN:
                {
                    this.node.y-=BULLET_SPEED
                    let worldPos=this.node.convertToWorldSpaceAR(new cc.Vec2(0,0))
                    break;
                }
            default:
                break;
        }
    }
}
