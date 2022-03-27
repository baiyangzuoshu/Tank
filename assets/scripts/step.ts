export  class Step{
    private _x:number=-1
    private _y:number=-1
    private _direction:number=-1

    constructor(x:number,y:number,direction:number){
        this._x=x
        this._y=y
        this._direction=direction
    }

    addX(add){
        this._x+=add
    }

    addY(add){
        this._y+=add
    }

    setX(x):void{
        this._x=x
    }
    getX():number{
        return this._x
    }
    setY(y):void{
        this._y=y
    }
    getY():number{
        return this._y
    }
    setDirection(direction):void{
        this._direction=direction
    }
    getDirection():number{
        return this._direction
    }
}