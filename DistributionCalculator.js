class DistributionCalculator
{
    constructor(hitRegistrator, targetDimensions, targetHeightPercentage,
        heatMap)
    {
        this.HitRegistrator = hitRegistrator;
        this.TargetDimensions = targetDimensions;
        this.TargetHeightPercentage = targetHeightPercentage;
        this.MeanX = 0;
        this.MeanY = 0;
        this.StandardDeviationX = 0;
        this.StandardDeviationY = 0;
        this.Correlation = 0;
        this.NeedsUpdate = true;
        this.HeatMap = heatMap;
        let that = this;
        this.HitRegistrator.HitEvent.addCallback(
            function (hitRegisteredEventEnum)
            {
                that.calculateNormalDistributionParameters();
                that.updateDistributionHeatMap(that.HeatMap.Resolution);
                that.NeedsUpdate = true;
            });
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

    createHeatMap(resolution, meanX, meanY, heatMap)
    {
        if (heatMap == null)
        {
            heatMap = new HeatMap(resolution);
        } else if (heatMap.Resolution != resolution)
        {
            throw new Error("Resolution of existing HeatMap does not math size"
                + " of passed resolution");
        }
        let fullWidth = this.TargetDimensions.bigDiameter;
        let width = fullWidth / heatMap.Resolution;
        var x = 0;
        var y = 0;
        var factor1 = 1 /
            (2 * Math.PI * this.StandardDeviationX * this.StandardDeviationY +
                Math.sqrt(1 - this.Correlation * this.Correlation));
        var factor2 = - 1 / (2 * (1 - this.Correlation * this.Correlation));
        heatMap.resetMinMaxValues();
        for (let i = 0; i < heatMap.Resolution; i++)
        {
            for (let j = 0; j < heatMap.Resolution; j++)
            {
                x = (i * width + width / 2 - this.TargetDimensions.bigRadius)
                    / this.TargetHeightPercentage;
                y = (this.TargetDimensions.bigRadius - j * width - width / 2)
                    / this.TargetHeightPercentage;
                // https://en.wikipedia.org/wiki/Multivariate_normal_distribution
                // implementation of Bivariate case
                var value = factor1 * Math.exp(factor2 * (
                    Math.pow((x - meanX) / this.StandardDeviationX, 2) +
                    Math.pow((y - meanY) / this.StandardDeviationY, 2) -
                    2 * this.Correlation *
                    ((x - meanX) / this.StandardDeviationX) *
                    ((y - meanY) / this.StandardDeviationY)));
                heatMap.addValue(i, j, value);
            }
        }
        return heatMap;
    }

    createCenteredDistributionHeatMap(resolution)
    {
        return this.createHeatMap(resolution, 0, 0);
    }

    createDistributionHeatMap(resolution)
    {
        return this.createHeatMap(resolution, this.MeanX, this.MeanY);
    }

    updateDistributionHeatMap(resolution)
    {
        this.HeatMap = this.createHeatMap(resolution, this.MeanX, this.MeanY,
            this.HeatMap);
    }
}