class OptimalResult
{
    constructor()
    {
        this.PropertyChanged = new PropertyChangedEvent();
        this.x = null;
        this.y = null;
    }

    setOptimalResultPoint(x, y)
    {
        this.x = x;
        this.y = y;
        this.PropertyChanged.trigger();
    }
}