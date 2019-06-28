

export class ListenerMgr extends Laya.EventDispatcher {

    private static instance: Laya.EventDispatcher = new Laya.EventDispatcher();

    public static Instance(): ListenerMgr {
        return this.instance;
    }
   
}