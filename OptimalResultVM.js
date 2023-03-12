class OptimalResultVM
{
    constructor(optimalResult, targetView)
    {
        this.OptimalResult = optimalResult;
        this.PropertyChanged = new PropertyChangedEvent();
        this._scale = targetView.LocalScale;
        this._centerX = targetView.CenterX;
        this._centerY = targetView.CenterY;
        this.ResultX = null;
        this.ResultY = null;
        var that = this;
        this.OptimalResult.PropertyChanged.addCallback(function ()
        {
            that.update();
            that.PropertyChanged.trigger();
        });
    }

    update()
    {
        this.ResultX = (this.OptimalResult.x * this._scale) + this._centerX;
        this.ResultY = -(this.OptimalResult.y * this._scale) + this._centerY;
    }
}