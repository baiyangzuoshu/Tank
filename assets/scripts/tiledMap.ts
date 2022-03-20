// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.TiledMap)
    tiledMap:cc.TiledMap|null=null

    mapSize:cc.Size=null//地图大小
    tileSize:cc.Size=null//图块大小
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mapSize=this.tiledMap.getMapSize()
        this.tileSize=this.tiledMap.getTileSize()

        let layer:cc.TiledLayer=this.tiledMap.getLayer("layer_0")
        let tiledTile:cc.TiledTile=layer.getTiledTileAt(12,5,true)
        tiledTile.node.active=true//tiledTile

        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this)
    }

    pointTransfromTile(worldPos:cc.Vec2):cc.Vec2{
        let nodePos=this.tiledMap.node.convertToNodeSpaceAR(worldPos)
        console.log(nodePos.x,nodePos.y)
        //Tiled工具是以左上角为原点，OpenGL则是以左下角为原点
        let x=Math.floor(nodePos.x/this.tileSize.width)
        let y=Math.floor((this.mapSize.height*this.tileSize.height-nodePos.y)/this.tileSize.height)
        return new cc.Vec2(x,y)
    }

    TileTransfromPoint(tileP:cc.Vec2):cc.Vec2{
        let x=tileP.x*this.tileSize.width
        let y=(this.mapSize.height-1-tileP.y)*this.tileSize.height
        return new cc.Vec2(x,y)
    }

    touchStart(event:cc.Event.EventTouch):boolean{
        return true
    }
    touchMove(event:cc.Event.EventTouch):void{

    }
    touchEnd(event:cc.Event.EventTouch):void{
        let p=event.getLocation()
        let tf_p=this.pointTransfromTile(p)
        //let layer:cc.TiledLayer=this.tiledMap.getLayer("layer_0")
        //layer.setTileGIDAt(0,tf_p.x,tf_p.y)

        let nodePos=this.TileTransfromPoint(tf_p)
        let layer:cc.TiledLayer=this.tiledMap.getLayer("layer_0")
        let tiledTile:cc.TiledTile=layer.getTiledTileAt(12,5,true)
        tiledTile.node.active=true//tiledTile
        tiledTile.node.x=nodePos.x
        tiledTile.node.y=nodePos.y
    }
    touchCancel(event:cc.Event.EventTouch):void{

    }
}
