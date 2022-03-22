// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";
import { GameManager } from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends cc.Component {
    mapSize:cc.Size=null//地图大小
    tileSize:cc.Size=null//图块大小
    tiledMap:cc.TiledMap=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       cc.loader.loadRes("tilemap/Round1",cc.TiledMapAsset,(err,tmxAsset)=>{
           if(err){
               return console.error(err)
           }
           this.createTiledMap(tmxAsset)
       })
    }

    createTiledMap(tmxAsset:cc.TiledMapAsset):void{
        this.tiledMap=this.node.addComponent(cc.TiledMap)
        this.tiledMap.tmxAsset=tmxAsset

        GameManager.getInstance().setTiledMap(this.tiledMap)

        cc.loader.loadRes("prefab/player",cc.Prefab,(err,player)=>{
            if(err){
                return console.error(err)
            }
            this.createPlayer(player)
        })

        cc.loader.loadRes("prefab/enemy",cc.Prefab,(err,enemyPrefab)=>{
            if(err){
                return console.error(err)
            }
            this.createEnemy(enemyPrefab)
        })
    }

    createEnemy(enemyPrefab:cc.Prefab):void{
        let layer:cc.TiledLayer=this.tiledMap.getLayer("layer_0")

        let enemy=cc.instantiate(enemyPrefab)
        enemy.parent=layer.node//坦克生成在layer_0层,包括之后的敌军
        let nodePos=DataManager.getInstance().tileTransfromPoint(this.tiledMap,new cc.Vec2(0,1))
        let distance=DataManager.getInstance().getTileMapDistance(this.tiledMap)
        //默认生成的位置是屏幕中间
        enemy.x=nodePos.x-cc.winSize.width/2+distance.x
        enemy.y=nodePos.y-cc.winSize.height/2+distance.y
    }

    createPlayer(playerPrefab:cc.Prefab):void{
        let layer:cc.TiledLayer=this.tiledMap.getLayer("layer_0")

        let player=cc.instantiate(playerPrefab)
        player.parent=layer.node//坦克生成在layer_0层,包括之后的敌军
        let nodePos=DataManager.getInstance().tileTransfromPoint(this.tiledMap,new cc.Vec2(9,25))
        let distance=DataManager.getInstance().getTileMapDistance(this.tiledMap)
        //默认生成的位置是屏幕中间
        player.x=nodePos.x-cc.winSize.width/2+distance.x
        player.y=nodePos.y-cc.winSize.height/2+distance.y

        GameManager.getInstance().setPlayer(player)
    }

    test():void{
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this) 
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this)   
    }

    touchStart(event:cc.Event.EventTouch):boolean{
        return true
    }
    touchMove(event:cc.Event.EventTouch):void{

    }
    touchEnd(event:cc.Event.EventTouch):void{
        let p=event.getLocation()
        let tf_p=DataManager.getInstance().pointTransfromTile(this.tiledMap,p)
        let layer:cc.TiledLayer=this.tiledMap.getLayer("layer_0")
        layer.setTileGIDAt(0,tf_p.x,tf_p.y)

        let nodePos=DataManager.getInstance().tileTransfromPoint(this.tiledMap,tf_p)
        layer=this.tiledMap.getLayer("layer_0")
        let tiledTile:cc.TiledTile=layer.getTiledTileAt(12,5,true)
        tiledTile.node.active=true//tiledTile
        tiledTile.node.x=nodePos.x
        tiledTile.node.y=nodePos.y
    }
    touchCancel(event:cc.Event.EventTouch):void{

    }
}
