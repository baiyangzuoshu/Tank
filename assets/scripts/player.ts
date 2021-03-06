// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TANK_TYPE } from "./enum";
import TankBase from "./TankBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends TankBase {

    onLoad () {
        this.setType(TANK_TYPE.PLAYER)
        this.init()
    }

    start () {

    }

    update (dt) {

    }
}
