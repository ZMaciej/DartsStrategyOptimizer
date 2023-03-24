class OptimalPointCalculator
{
    constructor(distibutionCalculator, scoreCalculator, optimalResult)
    {
        this.DistributionCalculator = distibutionCalculator;
        this.AverageScoreHeatMap = new HeatMap(
            distibutionCalculator.HeatMap.Resolution);
        this.ScoreCalculator = scoreCalculator;
        this.OptimalResult = optimalResult;
    }

    calculate(pointsToCalculateScoreIntegral)
    {
        var x = 0;
        var y = 0;
        var xx = 0;
        var yy = 0;
        var targetDimensions = this.DistributionCalculator.TargetDimensions;
        let fullWidth = targetDimensions.bigDiameter;
        let width = fullWidth / this._centeredHeatMap.Resolution;

        for (let p = 0; p < pointsToCalculateScoreIntegral.length; p++)
        {
            let i = pointsToCalculateScoreIntegral[p].i;
            let j = pointsToCalculateScoreIntegral[p].j;
            x = (i * width + width / 2 - targetDimensions.bigRadius) / this.DistributionCalculator.TargetHeightPercentage;
            y = (targetDimensions.bigRadius - j * width - width / 2) / this.DistributionCalculator.TargetHeightPercentage;
            var score = this.ScoreCalculator.getScore(x, y);
            if (score > 0) // if center of distribution is inside of the score board
            {
                let sum = 0;
                for (let ii = 0; ii < this._centeredHeatMap.Resolution; ii++)
                {
                    for (let jj = 0; jj < this._centeredHeatMap.Resolution; jj++)
                    {
                        xx = (ii * width + width / 2 - targetDimensions.bigRadius) / this.DistributionCalculator.TargetHeightPercentage;
                        yy = (targetDimensions.bigRadius - jj * width - width / 2) / this.DistributionCalculator.TargetHeightPercentage;
                        var score2 = this.ScoreCalculator.getScore(xx, yy);
                        if (score2 > 0)
                        {
                            let iii = this._centeredHeatMap.Resolution / 2 + i - ii;
                            let jjj = this._centeredHeatMap.Resolution / 2 + j - jj;
                            iii = this._crop(iii, 0, this._centeredHeatMap.Resolution - 1);
                            jjj = this._crop(jjj, 0, this._centeredHeatMap.Resolution - 1);
                            sum += this._centeredHeatMap.HeatMatrix[iii][jjj] * score2;
                        }
                    }
                }
                this.AverageScoreHeatMap.addValue(i, j, sum);
                if (sum > this._biggestSum)
                {
                    this._biggestSum = sum;
                    this._biggestSumX = x;
                    this._biggestSumY = y;
                }
            }
            else
            {
                this.AverageScoreHeatMap.addValue(i, j, 0);
            }
        }
        this.OptimalResult.setOptimalResultPoint(this._biggestSumX, this._biggestSumY);
    }

    reset()
    {
        this.AverageScoreHeatMap.resetMinMaxValues();
        this.AverageScoreHeatMap.resetValues();
        this._biggestSum = 0;
        this._biggestSumX = null;
        this._biggestSumY = null;
        this._centeredHeatMap =
            this.DistributionCalculator.
                createDistributionHeatMapWithInvertedMean(
                    this.AverageScoreHeatMap.Resolution);
    }

    _crop(value, min, max)
    {
        if (value < min)
        {
            return min;
        } else if (value > max)
        {
            return max;
        }
        return Math.floor(value);
    }
}