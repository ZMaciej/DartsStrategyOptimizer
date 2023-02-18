class HitRegistratorView
{
    constructor(hitRegistratorVM)
    {
        this.HitRegistratorVM = hitRegistratorVM;
        var that = this;
        this.HitRegistratorVM.HitEvent.addCallback(function (hitRegisteredEventEnum)
        {
            that.drawHits();
        });
    }

    drawHits()
    {
        strokeWeight(10);
        stroke('black');
        this.HitRegistratorVM.HitVMArray.forEach(hitVM =>
        {
            point(hitVM.x, hitVM.y);
        });
    }
}