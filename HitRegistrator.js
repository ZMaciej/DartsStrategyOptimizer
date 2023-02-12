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
        this.HitEvent.trigger();
    }
}