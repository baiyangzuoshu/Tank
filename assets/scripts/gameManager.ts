export  class   GameManager{
    private static  _instance:GameManager=null
    private _tiledMap:cc.TiledMap=null
    private _player:cc.Node=null

    public  static  getInstance():GameManager{
        if(!this._instance)
        {
            this._instance=new GameManager
        }
        return this._instance
    }

    public  setTiledMap(tiledMap:cc.TiledMap):void{
        this._tiledMap=tiledMap
    }
    public  getTiledMap():cc.TiledMap{
        return this._tiledMap
    }
    public  setPlayer(player:cc.Node):void{
        this._player=player
    }
    public  getPlayer():cc.Node{
        return this._player
    }
}