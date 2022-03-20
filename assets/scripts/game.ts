// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BTN_NAME, TANK_DIRCTION } from "./enum";
import { GameManager } from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onBtnEvent(event,data){
        if(BTN_NAME.LEFT==data)
        {
            let player=GameManager.getInstance().getPlayer()
            let ts=player.getComponent("player")
            ts.setDirection(TANK_DIRCTION.LEFT)
        }
        else if(BTN_NAME.RIGHT==data)
        {
            let player=GameManager.getInstance().getPlayer()
            let ts=player.getComponent("player")
            ts.setDirection(TANK_DIRCTION.RIGHT)
        }
        else if(BTN_NAME.UP==data)
        {
            let player=GameManager.getInstance().getPlayer()
            let ts=player.getComponent("player")
            ts.setDirection(TANK_DIRCTION.UP)
        }
        else if(BTN_NAME.DOWN==data)
        {
            let player=GameManager.getInstance().getPlayer()
            let ts=player.getComponent("player")
            ts.setDirection(TANK_DIRCTION.DOWN)
        }
        else if(BTN_NAME.FIRE==data)
        {
            
        }
    }

    onLoad () {

    }

    start () {

    }

    // update (dt) {}
}
