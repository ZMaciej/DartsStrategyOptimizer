class HitRegistrator
{
    constructor()
    {
        this.HitArray = new Array();
        this.HitEvent = new HitRegisteredEvent();
    }

    addHit(x, y, score)
    {
        var hit = new Hit(x, y, score);
        this.HitArray.push(hit);
        this.HitEvent.trigger(HitRegisteredEventEnum.AddedLast);
    }

    removeHit()
    {
        this.HitArray.pop();
        this.HitEvent.trigger(HitRegisteredEventEnum.RemovedLast);
    }

    clearHits()
    {
        this.HitArray.length = 0;
        this.HitEvent.trigger(HitRegisteredEventEnum.Cleared);
    }

    addAll(array)
    {
        this.HitArray = array;
        this.HitEvent.trigger(HitRegisteredEventEnum.AddedAll);
    }
}