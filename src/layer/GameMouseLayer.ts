import GameModel from "../module/GameModel";
import { ListenerMgr } from "../manger/ListenerManger";

export default class GameLayer extends Laya.Script {

    private mouseArr = [];

    private skis = ['ui/px_normal_1.png', 'ui/px_normal_2.png'];

    private hitSkis = ['ui/px_hit_1.png', 'ui/px_hit_2.png'];

    constructor() { super(); }

    onEnable(): void {
        ListenerMgr.Instance().on('onHammerHit', this, this.onCheckHit);
    }

    onStart() {
        this.mouseBirthAI();
    }

    mouseBirthAI() {
        let id = (Math.random() * 9 + 1) | 0;
        while (id == GameModel.Instacne().curHoleIdx) {
            id = (Math.random() * 9 + 1) | 0;
        }
        let type = ((Math.random() * 4) | 0);
        type = type == 0 ? 1 : 0;

        if (!this.mouseArr[id]) {
            this.mouseArr[id] = this.mousCreateById(id, type);
        }
        let mouse = this.mouseArr[id] as Laya.Image;
        mouse.skin = this.skis[type];

        this.mouseUpAnim(mouse);
        Laya.timer.once(1500, this, this.mouseDownAnim, [mouse]);

        GameModel.Instacne().curMouseType = type;
        GameModel.Instacne().curHoleIdx = id;
    }

    mousCreateById(id, type) {
        let mouseItem = this.owner.getChildByName('mouseItem_' + id);
        let bg = mouseItem.getChildByName('bg');

        let mouse = new Laya.Image(this.skis[type]);
        mouse.alpha = 0;
        bg.addChild(mouse);
        return mouse;
    }

    mouseUpAnim(celler: Laya.Image) {
        celler.visible = true;
        Laya.Tween.to(celler, { alpha: 1 }, 100);
        Laya.Tween.to(celler, { y: -23 }, 200, Laya.Ease.linearIn, null, 100);
    }

    stopMouseDownTimeout() {
        Laya.timer.clear(this, this.mouseDownAnim)
    }

    mouseDownAnim(celler: Laya.Image) {
        Laya.Tween.to(celler, { y: 0 }, 200);
        Laya.Tween.to(celler, { alpha: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
            celler.visible = false;
            this.mouseBirthAI();
        }), 200);
    }

    checkHit(bounds: Laya.Rectangle) {
        for (let i = 1; i <= 10; i++) {
            let mouse = this.mouseArr[i] as Laya.Image;
            if (!mouse) continue;
            let targetBounds = mouse.getBounds();
            let globalPos = mouse.localToGlobal(new Laya.Point(0, 0));
            targetBounds.x = globalPos.x;
            targetBounds.y = globalPos.y;
            let isHit = targetBounds.intersection(bounds);
            if (isHit) return i;
        }
        return -1;
    }

    hitMouseAnim(celler: Laya.Image) {
        celler.y = 0;
        celler.skin = this.hitSkis[GameModel.Instacne().curMouseType];
    }

    onCheckHit(hammer: Laya.Sprite) {
        let idx = this.checkHit(hammer.getBounds());
        console.log('hit mouse No is ', idx);
        let mouse = this.mouseArr[idx];
        mouse && this.hitMouseAnim(mouse);

        ListenerMgr.Instance().event('onUpdateScoreMgr',GameModel.Instacne().curMouseType)
    }

    onDisable(): void {
        ListenerMgr.Instance().offAllCaller(this);
    }
}