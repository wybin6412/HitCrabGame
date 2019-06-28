
export default class GameModel {

    private static instance: GameModel;

    constructor() {

    }

    public static Instacne() {
        if (!GameModel.instance) {
            GameModel.instance = new GameModel();
        }
        return GameModel.instance;
    }

    private _curMouseType: number;

    public get curMouseType() {
        return this._curMouseType;
    }

    public set curMouseType(type: number) {
        this._curMouseType = type;
    }

    private _curHoleIdx: number;

    public get curHoleIdx() {
        return this._curHoleIdx;
    }

    public set curHoleIdx(idx) {
        this._curHoleIdx = idx;
    }

    private _hearCount: number;

    public getHearCount() {
        return this._hearCount;
    }

    public hearCountMinus() {
        this._hearCount--;
        if (this._hearCount < 0) {
            this._hearCount = 0;
        }
    }

    private _gameScore: number;

    public get gameScore() {
        return this._gameScore;
    }

    public set gameScore(num: number) {
        this._gameScore = num;
    }
    

}