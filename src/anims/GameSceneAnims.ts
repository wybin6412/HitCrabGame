export default class GameSceneAnims extends Laya.Script {

    private scene: Laya.Scene;

    constructor() { super(); }

    onEnable(): void {
        //
    }

    onStart() {
        this.init();
    }

    init() {
        this.scene = this.owner.scene;
    }

    onPlayAnim(animName: string) {

    }

    onDisable(): void {
    }
}