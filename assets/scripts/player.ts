// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    
    @property(cc.Sprite)
    playerSprite:cc.Sprite=null
    @property(cc.SpriteAtlas)
    tankAtlas:cc.SpriteAtlas=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let spriteFrame=this.tankAtlas.getSpriteFrame("player2U")
        this.playerSprite.spriteFrame=spriteFrame
    }

    start () {

    }

    // update (dt) {}
}
