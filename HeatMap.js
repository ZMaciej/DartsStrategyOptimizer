class HeatMap
{
    constructor(resolution, hitRegistrator, targetDimensions, targetHeightPercentage)
    {
        this.HitRegistrator = hitRegistrator;
        this.Resolution = resolution;
        this.TargetDimensions = targetDimensions;
        this.TargetHeightPercentage = targetHeightPercentage;
        this.HeatMatrix = new Array(this.Resolution);
        for (let i = 0; i < this.HeatMatrix.length; i++)
        {
            this.HeatMatrix[i] = new Array(this.Resolution);
        }
        this.NeedsUpdate = true;
        this.MeanX = 0;
        this.MeanY = 0;
        this.StandardDeviationX = 0;
        this.StandardDeviationY = 0;
        this.Correlation = 0;
        this.maxValue = 0;
        this.minValue = 0;

        let that = this;
        this.HitRegistrator.HitEvent.addCallback(
            function (hitRegisteredEventEnum)
            {
                that.updateHeatMap();
                that.NeedsUpdate = true;
            });
    }

    updateHeatMap()
    {
        this.calculateNormalDistributionParameters();
        let fullWidth = this.TargetDimensions.bigDiameter;
        let width = fullWidth / this.Resolution;
        var x = 0;
        var y = 0;
        var factor1 = 1 /
            (2 * Math.PI * this.StandardDeviationX * this.StandardDeviationY +
                Math.sqrt(1 - this.Correlation * this.Correlation));
        var factor2 = - 1 / (2 * (1 - this.Correlation * this.Correlation));
        this.maxValue = 0;
        this.minValue = Number.MAX_VALUE;
        for (let i = 0; i < this.Resolution; i++) 
        {
            for (let j = 0; j < this.Resolution; j++)
            {
                x = (i * width + width / 2 - this.TargetDimensions.bigRadius) / this.TargetHeightPercentage;
                y = (this.TargetDimensions.bigRadius - j * width - width / 2) / this.TargetHeightPercentage;
                // https://en.wikipedia.org/wiki/Multivariate_normal_distribution
                // implementation of Bivariate case
                this.HeatMatrix[i][j] = factor1 * Math.exp(factor2 * (
                    Math.pow((x - this.MeanX) / this.StandardDeviationX, 2) +
                    Math.pow((y - this.MeanY) / this.StandardDeviationY, 2) -
                    2 * this.Correlation *
                    ((x - this.MeanX) / this.StandardDeviationX) *
                    ((y - this.MeanY) / this.StandardDeviationY)));
                if (this.HeatMatrix[i][j] > this.maxValue)
                    this.maxValue = this.HeatMatrix[i][j];
                else if (this.HeatMatrix[i][j] < this.minValue)
                    this.minValue = this.HeatMatrix[i][j];
            }
        }
        console.log(this);
    }

    calculateNormalDistributionParameters()
    {
        let pointsCount = this.HitRegistrator.HitArray.length;
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < pointsCount; i++)
        {
            let hit = this.HitRegistrator.HitArray[i];
            sumX = sumX + hit.x;
            sumY = sumY + hit.y;
        }
        let meanX = sumX / pointsCount;
        let meanY = sumY / pointsCount;

        let deviationSqSumX = 0;
        let deviationSqSumY = 0;
        let covariance = 0;
        for (let i = 0; i < pointsCount; i++)
        {
            let hit = this.HitRegistrator.HitArray[i];
            let deviationX = hit.x - meanX;
            let deviationY = hit.y - meanY;
            deviationSqSumX = deviationSqSumX + deviationX * deviationX;
            deviationSqSumY = deviationSqSumY + deviationY * deviationY;
            covariance = covariance + deviationX * deviationY;
        }
        covariance = covariance / pointsCount;

        let standardDeviationX = Math.sqrt(deviationSqSumX / pointsCount);
        let standardDeviationY = Math.sqrt(deviationSqSumY / pointsCount);
        this.NeedsUpdate = false;

        this.MeanX = meanX;
        this.MeanY = meanY;
        this.StandardDeviationX = standardDeviationX;
        this.StandardDeviationY = standardDeviationY;
        this.Correlation = covariance /
            (standardDeviationX * standardDeviationY);
    }
}