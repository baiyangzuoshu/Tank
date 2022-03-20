export  class   DataManager{
    private static  _instance:DataManager=null
    public  static  getInstance():DataManager
    {
        if(!this._instance)
        {
            this._instance=new DataManager
        }
        return this._instance
    }
    //地图的左下角距离屏幕的位置
    getTileMapDistance(tiledMap:cc.TiledMap):cc.Vec2{
        let mapSize=tiledMap.getMapSize()
        let tileSize=tiledMap.getTileSize()
        let distanceX=(cc.winSize.width-mapSize.width*tileSize.width)/2
        let distanceY=(cc.winSize.height-mapSize.height*tileSize.height)/2

        return new cc.Vec2(distanceX,distanceY)
    }
    //世界位置转换为地图位置
    pointTransfromTile(tiledMap:cc.TiledMap,worldPos:cc.Vec2):cc.Vec2{
        let mapSize=tiledMap.getMapSize()
        let tileSize=tiledMap.getTileSize()
        //Tiled工具是以左上角为原点，OpenGL则是以左下角为原点
        let dinstance=this.getTileMapDistance(tiledMap)
        let distanceX=tiledMap.node.x-dinstance.x
        let distanceY=tiledMap.node.y-dinstance.y

        let nodePos=tiledMap.node.convertToNodeSpaceAR(worldPos)
        nodePos.x=nodePos.x+distanceX
        nodePos.y=nodePos.y+distanceY
        
        let x=Math.floor(nodePos.x/tileSize.width)
        let y=Math.floor((mapSize.height*tileSize.height-nodePos.y)/tileSize.height)
        return new cc.Vec2(x,y)
    }
    //地图位置转换为世界位置
    tileTransfromPoint(tiledMap:cc.TiledMap,tileP:cc.Vec2):cc.Vec2{
        let mapSize=tiledMap.getMapSize()
        let tileSize=tiledMap.getTileSize()
        //Tiled工具是以左上角为原点，OpenGL则是以左下角为原点
        let dinstance=this.getTileMapDistance(tiledMap)

        let x=tileP.x*tileSize.width
        let y=(mapSize.height-1-tileP.y)*tileSize.height+dinstance.y
        return new cc.Vec2(x,y)
    }
}