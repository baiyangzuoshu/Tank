// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";
import { TANK_DIRECTION } from "./enum";

const {ccclass, property} = cc._decorator;
const   BULLET_SPEED=5
@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    _direction:TANK_DIRECTION=-1

    onLoad () {

    }

    getDirection():TANK_DIRECTION{
        return this._direction
    }

    setDirection (drection:TANK_DIRECTION) {
        if(drection>TANK_DIRECTION.NORMAL&&drection<TANK_DIRECTION.MAX)
            this._direction=drection
    }

    update (dt) {
        if(this.getDirection()>TANK_DIRECTION.NORMAL&&this.getDirection()<TANK_DIRECTION.MAX)
        {
            //在下一帧处理，这样显得有质感
            let pArr=DataManager.getInstance().getDirection3Point(this.getDirection(),this.node,0)
            if(!DataManager.getInstance().isWalkByPointArray(pArr,true)){
                this.node.destroy()
                return
            }

            switch(this.getDirection())
            {
                case TANK_DIRECTION.LEFT:
                    {
                        this.node.x-=BULLET_SPEED
                        break
                    }
                case TANK_DIRECTION.RIGHT:
                    {
                        this.node.x+=BULLET_SPEED
                        break
                    }
                case TANK_DIRECTION.UP:
                    {
                        this.node.y+=BULLET_SPEED
                        break
                    }
                case TANK_DIRECTION.DOWN:
                    {
                        this.node.y-=BULLET_SPEED
                        break
                    }
                default:
                    break
            }
        }
    }
}
