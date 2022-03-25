import { TANK_DIRCTION, TILE_ID } from "./enum"
import { GameManager } from "./gameManager"

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
       
        let dinstance=this.getTileMapDistance(tiledMap)
        let distanceX=tiledMap.node.x-dinstance.x
        let distanceY=tiledMap.node.y-dinstance.y

        let nodePos=tiledMap.node.convertToNodeSpaceAR(worldPos)
        nodePos.x=nodePos.x+distanceX
        nodePos.y=nodePos.y+distanceY
         //Tiled工具是以左上角为原点，OpenGL则是以左下角为原点
        let x=Math.floor(nodePos.x/tileSize.width)
        let y=Math.floor((mapSize.height*tileSize.height-nodePos.y)/tileSize.height)
        //临界点
        //[1-mapSize.width]=>[0,mapSize.width-1]
        if(x>=mapSize.width)
        {
            x--
        }
        //[1-mapSize.height]=>[0,mapSize.height-1]
        if(y>=mapSize.height)
        {
            y--
        }
        return new cc.Vec2(x,y)
    }
    //地图位置转换为世界位置
    tileTransfromPoint(tiledMap:cc.TiledMap,tileP:cc.Vec2):cc.Vec2{
        let mapSize=tiledMap.getMapSize()
        let tileSize=tiledMap.getTileSize()
        
        let dinstance=this.getTileMapDistance(tiledMap)
        //Tiled工具是以左上角为原点，OpenGL则是以左下角为原点
        let x=tileP.x*tileSize.width
        let y=(mapSize.height-1-tileP.y)*tileSize.height+dinstance.y
        return new cc.Vec2(x,y)
    }
    //边界判断
    isTiledMapBorderByPoint(tiledMap:cc.TiledMap,tileP):boolean{
        //边界判断
        let mapSize=tiledMap.getMapSize()
        if(tileP.x<0||tileP.x>=mapSize.width)
        {
            return true
        }
        if(tileP.y<0||tileP.y>=mapSize.height)
        {
            return true
        }

        return false
    }
    //是否存在图块
    isExitTileByPoint(tiledMap:cc.TiledMap,tileP:cc.Vec2,isClear=false):boolean{
        let layers:cc.TiledLayer[]=tiledMap.getLayers()

        for(let i=0;i<layers.length;i++)
        {
            let layer=layers[i]
            
            let gID=layer.getTileGIDAt(tileP)
            if(gID>0){
                if(TILE_ID.WALL_13==gID||TILE_ID.WALL_14==gID||TILE_ID.WALL_19==gID||TILE_ID.WALL_20==gID)
                {
                    if(isClear)
                    {
                        layer.setTileGIDAt(TILE_ID.NULL_1,tileP.x,tileP.y)
                    }
                    return true
                }
                else if(TILE_ID.STEEL_5==gID||TILE_ID.STEEL_6==gID||TILE_ID.STEEL_11==gID||TILE_ID.STEEL_12==gID)
                {
                    return true
                }
            }
        }

        return false
    }
    //坦克、子弹是否能行走
    isWalkByPointArray(pArray:Array<cc.Vec2>,isClear=false):boolean{
        for(let i=0;i<pArray.length;i++)
        {
            let tiledMap=GameManager.getInstance().getTiledMap()
            let tilePoint=DataManager.getInstance().pointTransfromTile(tiledMap,pArray[i])
            if(DataManager.getInstance().isTiledMapBorderByPoint(tiledMap,tilePoint)){
                return false
            }
            if(DataManager.getInstance().isExitTileByPoint(tiledMap,tilePoint,isClear)){
                return false
            }
        }

        return true
    }
    //坦克、子弹朝向的三个点
    getDirection3Point(direction:TANK_DIRCTION,node:cc.Node,speed:number):Array<cc.Vec2>{
        let pArr:Array<cc.Vec2>=[]
        switch(direction)
        {
            case TANK_DIRCTION.LEFT:
                {
                    let rect=node.getBoundingBoxToWorld()
                    let index=(rect.yMax-rect.yMin)/2
                    for(let y=rect.yMin;y<=rect.yMax;y=y+index)
                    {
                        pArr.push(new cc.Vec2(rect.xMin-speed,y))
                    }

                    break;
                }
            case TANK_DIRCTION.RIGHT:
                {
                    let rect=node.getBoundingBoxToWorld()
                    let index=(rect.yMax-rect.yMin)/2
                    for(let y=rect.yMin;y<=rect.yMax;y=y+index)
                    {
                        pArr.push(new cc.Vec2(rect.xMax+speed,y))
                    }

                    break;
                }
            case TANK_DIRCTION.UP:
                {
                    let rect=node.getBoundingBoxToWorld()
                    let index=(rect.xMax-rect.xMin)/2
                    for(let x=rect.xMin;x<=rect.xMax;x=x+index)
                    {
                        pArr.push(new cc.Vec2(x,rect.yMax+speed))
                    }

                    break;
                }
            case TANK_DIRCTION.DOWN:
                {
                    let rect=node.getBoundingBoxToWorld()
                    let index=(rect.xMax-rect.xMin)/2
                    for(let x=rect.xMin;x<=rect.xMax;x=x+index)
                    {
                        pArr.push(new cc.Vec2(x,rect.yMin-speed))
                    }

                    break;
                }
            default:
                break;
        }

        return pArr
    }
}