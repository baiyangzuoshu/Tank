// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";
import { MOVE_TYPE, TANK_DIRECTION, TANK_SPEED, TANK_TYPE } from "./enum";
import { GameManager } from "./gameManager";
import { Step } from "./step";
import TankBase from "./TankBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends TankBase {

    _moveType:MOVE_TYPE=MOVE_TYPE.RANDOM
    _moveTime:number=0
    _bulletTime:number=0
    onLoad () {
        this.setType(TANK_TYPE.ENEMY)
        this.setDirection(TANK_DIRECTION.DOWN)
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
            case MOVE_TYPE.ASTAR://A*目标移动
                {
                    this.aStarMove()
                    break
                }
            default:
                break
        }
        
        //半径移动
        //直线移动
        //深度搜索移动
    }

    aStarMove():void{
        let tiledMap=GameManager.getInstance().getTiledMap()
        let openPath:Array<Step>=[]
        let closePath:Array<Step>=[]
        openPath.push(new Step(12,12,this.getDirection()))

        let index=0
        while(openPath.length)
        {
            let p=openPath.pop()

            let path:Array<Step>=[]
            //上下左右
            for(let direction=TANK_DIRECTION.LEFT;direction<TANK_DIRECTION.MAX;direction++)
            {
                let cur_p=new Step(p.getX(),p.getY(),p.getDirection())
                cur_p.setDirection(direction)
                if(TANK_DIRECTION.LEFT==direction)
                {
                    cur_p.addX(-TANK_SPEED)
                }
                else if(TANK_DIRECTION.RIGHT==direction)
                {
                    cur_p.addX(TANK_SPEED)
                }
                else if(TANK_DIRECTION.UP==direction)
                {
                    cur_p.addY(TANK_SPEED)
                }
                else if(TANK_DIRECTION.DOWN==direction)
                {
                    cur_p.addY(-TANK_SPEED)
                }
                
                let pArr=DataManager.getInstance().getDirection3Point(direction,this.node,TANK_SPEED)
                
                if(!DataManager.getInstance().isWalkByPointArray(pArr)){
                    continue
                }

                path.push(cur_p)
            }

            let worldPosEnemy=this.node.convertToWorldSpaceAR(new cc.Vec2(p.getX(),p.getY()))
            let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,worldPosEnemy)
            let distanceMin=DataManager.getInstance().getPlayerDistanceByTiledPos(tilePoint)
            let playerTiled=DataManager.getInstance().getPlayerTiled()

            let minStep
            for(let i=0;i<path.length;i++)
            {
                let cur_p=path[i]
                let worldPosEnemy=this.node.convertToWorldSpaceAR(new cc.Vec2(cur_p.getX(),cur_p.getY()))
                let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,worldPosEnemy)
                let distance=DataManager.getInstance().getPlayerDistanceByTiledPos(tilePoint)
                if(playerTiled.x==tilePoint.x&&playerTiled.y==tilePoint.y)
                {
                    break
                }

                if(distance<distanceMin)
                {
                    distanceMin=distance
                    minStep=cur_p
                }
                else if(!minStep)
                {
                    if(cur_p.getDirection()==p.getDirection())
                    {
                        distanceMin=distance
                        minStep=cur_p
                    }
                }
            }

            closePath.push(p)
            openPath.push(minStep)

            if(!minStep||100==index++){
                break
            }
        }

        let step=closePath[1]
        if(step)
        {
            this.setDirection(step.getDirection())
        }
        else{
            this.randomDirection()
        }
    }

    randomMove(){
        let pArr=DataManager.getInstance().getDirection3Point(this.getDirection(),this.sprite.node,TANK_SPEED)
        if(DataManager.getInstance().isWalkByPointArray(pArr)){
            if(0==this._moveTime%100){//增加随机性
                this.randomDirection()
            }
            else
            {
                this.setDirection(this.getDirection())
            }
        }
        else{//转向
           this.randomDirection()
        }
    }

    randomDirection(){
        let arr=[];
        arr.push(TANK_DIRECTION.LEFT)
        arr.push(TANK_DIRECTION.RIGHT)
        arr.push(TANK_DIRECTION.UP)
        arr.push(TANK_DIRECTION.DOWN)
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
