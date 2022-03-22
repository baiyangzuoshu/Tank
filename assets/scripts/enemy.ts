// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";
import { MOVE_TYPE, TANK_DIRCTION, TANK_SPEED, TANK_TYPE } from "./enum";
import TankBase from "./TankBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends TankBase {

    _moveType:MOVE_TYPE=MOVE_TYPE.RANDOM
    _moveTime:number=0
    _bulletTime:number=0
    onLoad () {
        this.setType(TANK_TYPE.ENEMY)
        this.setDirection(TANK_DIRCTION.DOWN)
        this.init()
    }

    setMoveType(moveType:MOVE_TYPE):void{
        if(moveType>MOVE_TYPE.NORMAL&&moveType<MOVE_TYPE.MAX)
            this._moveType=moveType
    }

    getMoveType():MOVE_TYPE{
        return this._moveType
    }

    move():void{
        switch(this.getMoveType())
        {
            case MOVE_TYPE.RANDOM://随机移动
                {
                    this.randomMove()
                    break
                }
            default:
                break
        }
        
        //半径移动
        //直线移动
        //A*目标移动
        //深度搜索移动
    }

    randomMove(){
        let pArr=DataManager.getInstance().getDirection3Point(this.getDirection(),this.sprite.node,TANK_SPEED)
        if(DataManager.getInstance().isWalkByPointArray(pArr)){
            if(0==this._moveTime%100){//增加随机性
                this.updateDirection()
            }
            else
            {
                this.setDirection(this.getDirection())
            }
        }
        else{//转向
           this.updateDirection()
        }
    }

    updateDirection(){
        let arr=[];
        arr.push(TANK_DIRCTION.LEFT)
        arr.push(TANK_DIRCTION.RIGHT)
        arr.push(TANK_DIRCTION.UP)
        arr.push(TANK_DIRCTION.DOWN)
        let ran=Math.floor(Math.random()*arr.length)
        this.setDirection(arr[ran])
    }

    createBullet() {
        let ts=this.getComponent("enemy")
        ts.fire()
    }

    update (dt) {
        this._moveTime++
        this._bulletTime++
        if(0==this._moveTime%10)
        {
            this.move()
        }
        if(0==this._bulletTime%30)
        {
            this.createBullet()
        }
    }
}
