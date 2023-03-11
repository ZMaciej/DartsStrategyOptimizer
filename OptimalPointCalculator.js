class OptimalPointCalculator
{
    constructor(distibutionCalculator, scoreCalculator)
    {
        this.DistributionCalculator = distibutionCalculator;
        this.AverageScoreHeatMap = new HeatMap(
            distibutionCalculator.HeatMap.Resolution);
        this.ScoreCalculator = scoreCalculator;
    }

    calculate()
    {
        var x = 0;
        var y = 0;
        var xx = 0;
        var yy = 0;
        var centeredHeatMap =
            this.DistributionCalculator.createDistributionHeatMap(
                this.AverageScoreHeatMap.Resolution);
        var targetDimensions = this.DistributionCalculator.TargetDimensions;
        let fullWidth = targetDimensions.bigDiameter;
        let width = fullWidth / centeredHeatMap.Resolution;
        this.AverageScoreHeatMap.resetMinMaxValues();
        for (let i = 0; i < centeredHeatMap.Resolution; i++)
        {
            for (let j = 0; j < centeredHeatMap.Resolution; j++)
            {
                x = (i * width + width / 2 - targetDimensions.bigRadius) / this.DistributionCalculator.TargetHeightPercentage;
                y = (targetDimensions.bigRadius - j * width - width / 2) / this.DistributionCalculator.TargetHeightPercentage;
                var score = this.ScoreCalculator.getScore(x, y);
                if (score > 0) // if center of distribution is inside of the score board
                {
                    let sum = 0;
                    for (let ii = 0; ii < centeredHeatMap.Resolution; ii++)
                    {
                        for (let jj = 0; jj < centeredHeatMap.Resolution; jj++)
                        {
                            xx = (ii * width + width / 2 - targetDimensions.bigRadius) / this.DistributionCalculator.TargetHeightPercentage;
                            yy = (targetDimensions.bigRadius - jj * width - width / 2) / this.DistributionCalculator.TargetHeightPercentage;
                            var score2 = this.ScoreCalculator.getScore(xx, yy);
                            if (score2 > 0)
                            {
                                let iii = centeredHeatMap.Resolution / 2 + i - ii;
                                let jjj = centeredHeatMap.Resolution / 2 + j - jj;
                                iii = this._crop(iii, 0, centeredHeatMap.Resolution - 1);
                                jjj = this._crop(jjj, 0, centeredHeatMap.Resolution - 1);
                                sum += centeredHeatMap.HeatMatrix[iii][jjj] * score2;
                            }
                        }
                    }
                    this.AverageScoreHeatMap.addValue(i, j, sum);
                }
                else
                {
                    this.AverageScoreHeatMap.addValue(i, j, 0);
                }
            }
        }
    }

    calculateIntegralOfPointsTimesProbability()
    {

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