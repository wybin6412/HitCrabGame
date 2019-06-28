import { ListenerMgr } from "../manger/ListenerManger";

export default class GameTopPanel extends Laya.Script {

    private chanceTime: Laya.ProgressBar;

    private gameScore: Laya.Box;
    private score: number;

    constructor() { super(); }

    onEnable(): void {
        ListenerMgr.Instance().on('onUpdateScoreMgr', this, this.onUpdateScoreHandler);
    }

    onStart() {
        this.chanceTime = this.owner.getChildByName('chanceTime') as Laya.ProgressBar;
        this.gameScore = this.owner.getChildByName('score') as Laya.Box;

        this.score = 0;
        this.initUI();
        Laya.timer.loop(1000,this,this.onLoop);
    }

    initUI() {
        this.setChanceTime(1);
        this.setScore(0);
        this.updateScoreUI();
    }


    setChanceTime(numb: number) {
        this.chanceTime.value = numb;
    }

    setScore(type: number): void {
        this.score += (type == 0 ? -100 : 100);
        if (this.score < 0) this.score = 0;
        this.updateScoreUI();
    }

    updateScoreUI() {
        let data = {};
        var temp: number = this.score;
        for (let i = 9; i > -1; i--) {
            data[`num${i}`] = { index: temp % 10 };
            temp /= 10;
        }
        this.gameScore.dataSource = data;
    }

    onDisable(): void {
    }

    onUpdateScoreHandler(type:number) {
        
        console.log('onUpdateScoreHandler ');
        this.setScore(type);
    }

    onLoop():void{
        this.chanceTime.value -= (1/90);
        if(this.chanceTime.value<=0){
            console.log('game over ');
            Laya.timer.clear(this,this.onLoop);
            Laya.Scene.open("Scene/GameStart.scene");
            return;
        }
    }
}