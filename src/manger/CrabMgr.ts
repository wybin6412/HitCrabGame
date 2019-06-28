import { ListenerMgr } from "../manger/ListenerManger";

export default class CrabMgr extends Laya.Script {

    private crab: Laya.Animation;

    constructor() { super(); }

    onEnable(): void {
        ListenerMgr.Instance().on('onCrabHit', this, this.onCrabPlay);
        ListenerMgr.Instance().on('onCrabMove', this, this.onCrabMove);
    }

    onStart() {
        let effect = Laya.Pool.getItemByCreateFun("CrabAnim", this.createAnim, this);
        this.owner.addChild(effect);
        this.crab = effect;
        this.crab.play(0, true);
        this.crab.pos(-100, -100);

        console.log('onStart Crab');
    }

    onCrabPlay() {
        console.log('onCrabPlay Crab');
        this.crab && this.crab.play(0, false);
    }

    onCrabMove(pos: Laya.Point) {
        this.crab && this.crab.pos(pos.x, pos.y);
    }

    createAnim(): Laya.Animation {
        let resPath = "Anims/Crab.ani";
        let ani: Laya.Animation = new Laya.Animation();
        ani.loadAnimation(resPath);
        console.log('createAnim Crab');
        return ani;
    }

    onMouseDown(data: Laya.Event) {
        this.onCrabPlay();
        ListenerMgr.Instance().event('onCrabHit',this.crab)
    }

    onMouseMove(data: Laya.Event) {
        this.onCrabMove(new Laya.Point(data.stageX, data.stageY));
    }

    onDisable(): void {
        ListenerMgr.Instance().offAllCaller(this);
    }
}