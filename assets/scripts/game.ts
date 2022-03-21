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

    _time:number=0
    _keyCode:number=-1

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)
    }

    onKeyDown(event:cc.Event.EventKeyboard){
        this._keyCode=event.keyCode
        this.handlerDown(event.keyCode)
    }

    handlerDown(keyCode){
        switch(keyCode)
        {
            case cc.macro.KEY.a:
                {
                    this.onBtnEvent(null,BTN_NAME.LEFT)
                    break;
                }
            case cc.macro.KEY.d:
                {
                    this.onBtnEvent(null,BTN_NAME.RIGHT)
                    break;
                }
            case cc.macro.KEY.w:
                {
                    this.onBtnEvent(null,BTN_NAME.UP)
                    break;
                }
            case cc.macro.KEY.s:
                {
                    this.onBtnEvent(null,BTN_NAME.DOWN)
                    break;
                }
            default:
                break;
        }
    }

    onKeyUp(event:cc.Event.EventKeyboard){
        this._keyCode=-1
    }

    onBtnEvent(event,data:BTN_NAME){
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

    update(dt){
        this._time++;
        if(0==this._time%100)
        {
            this.handlerDown(this._keyCode)
        }
    }
}
