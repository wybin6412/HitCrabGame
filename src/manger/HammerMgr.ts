import { ListenerMgr } from "../manger/ListenerManger";

export default class HannerMgr extends Laya.Script {

    private hammer: Laya.Animation;

    constructor() { super(); }

    onEnable(): void {
        ListenerMgr.Instance().on('onHammerHit', this, this.onHammerPlay);
        ListenerMgr.Instance().on('onHammerMove', this, this.onHammerMove);
    }

    onStart() {
        let effect = Laya.Pool.getItemByCreateFun("HammnerAnim", this.createAnim, this);
        // let effect = Laya.Pool.getItemByCreateFun("CrabAnim", this.createAnim, this);
        this.owner.addChild(effect);
        this.hammer = effect;
        this.hammer.play(0, false);
        // this.hammer.play(0, true);
        this.hammer.pos(-100, -100);
    }

    onHammerPlay() {
        this.hammer && this.hammer.play(0, false);
    }

    onHammerMove(pos: Laya.Point) {
        this.hammer && this.hammer.pos(pos.x, pos.y);
    }

    createAnim(): Laya.Animation {
        let resPath = "Anims/Hammer.ani";
        let ani: Laya.Animation = new Laya.Animation();
        ani.loadAnimation(resPath);
        return ani;
    }

    onMouseDown(data: Laya.Event) {
        this.onHammerPlay();
        ListenerMgr.Instance().event('onHammerHit',this.hammer)
    }

    onMouseMove(data: Laya.Event) {
        this.onHammerMove(new Laya.Point(data.stageX, data.stageY));
    }

    onDisable(): void {
        ListenerMgr.Instance().offAllCaller(this);
    }
}