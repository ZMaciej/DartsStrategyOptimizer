class HitRegistratorVM
{
    constructor(hitRegistrator, targetView)
    {
        this.HitRegistrator = hitRegistrator;
        this.HitVMArray = new Array();
        this.HitEvent = new HitRegisteredEvent();
        this._scale = targetView.LocalScale;
        this._centerX = targetView.CenterX;
        this._centerY = targetView.CenterY;
        var that = this;
        this.HitRegistrator.HitEvent.addCallback(function ()
        {
            that.updateHitVMArray();
            that.HitEvent.trigger();
        });
    }

    updateHitVMArray()
    {
        var hit = this.HitRegistrator.HitArray.at(-1);
        var hitVM = new HitVM((hit.x * this._scale) + this._centerX, -(hit.y * this._scale) + this._centerY);
        this.HitVMArray.push(hitVM);
    }
}