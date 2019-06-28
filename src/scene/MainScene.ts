
    
enum LayerEnum {
    loginLayer = 0,
    gameLayer,
    gameOerLayer
}
const LayerNameMap = {
    1: "",
    2: "",
    3: ''
}
export default class MainScene extends Laya.Script {

    private curLayerEnum

    constructor() { 
        super();
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    onClick(): void {
        Laya.Scene.open("Scene/GameMain.scene");
    }

    onStart() {
       
    }

    startGame(): void {

       
    }
}