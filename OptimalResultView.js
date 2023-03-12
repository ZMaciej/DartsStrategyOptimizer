class OptimalResultView
{
    constructor(optimalResultVM)
    {
        this.OptimalResultVM = optimalResultVM;
        var that = this;
        this.OptimalResultVM.PropertyChanged.addCallback(function ()
        {
            that.drawResult();
        });
    }

    drawResult()
    {
        strokeWeight(3);
        stroke('black');
        fill(255, 255, 255, 120);
        circle(this.OptimalResultVM.ResultX, this.OptimalResultVM.ResultY, 47);
        circle(this.OptimalResultVM.ResultX, this.OptimalResultVM.ResultY, 25);
        strokeWeight(7);
        point(this.OptimalResultVM.ResultX, this.OptimalResultVM.ResultY);
    }
}