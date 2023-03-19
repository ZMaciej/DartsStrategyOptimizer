class OptimalPointCalculator
{
    constructor(distibutionCalculator, scoreCalculator, optimalResult)
    {
        this.DistributionCalculator = distibutionCalculator;
        this.AverageScoreHeatMap = new HeatMap(
            distibutionCalculator.HeatMap.Resolution);
        this.ScoreCalculator = scoreCalculator;
        this.OptimalResult = optimalResult;
        this.PropertyChanged = new PropertyChangedEvent();
    }

    calculate()
    {
        var x = 0;
        var y = 0;
        var xx = 0;
        var yy = 0;
        var centeredHeatMap =
            this.DistributionCalculator.
                createDistributionHeatMapWithInvertedMean(
                    this.AverageScoreHeatMap.Resolution);
        var targetDimensions = this.DistributionCalculator.TargetDimensions;
        let fullWidth = targetDimensions.bigDiameter;
        let width = fullWidth / centeredHeatMap.Resolution;
        this.AverageScoreHeatMap.resetMinMaxValues();
        this.AverageScoreHeatMap.resetValues();
        var biggestSum = 0;
        var biggestSumX = null;
        var biggestSumY = null;

        let pointsToCalculateScoreIntegral = new Array();
        for (let i = 0; i < centeredHeatMap.Resolution; i++)
        {
            for (let j = 0; j < centeredHeatMap.Resolution; j++)
            {
                pointsToCalculateScoreIntegral.push({ 'i': i, 'j': j });
            }
        }
        pointsToCalculateScoreIntegral = this._shuffle(pointsToCalculateScoreIntegral);
        let showTriggerCounter = 0;
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
                if (sum > biggestSum)
                {
                    biggestSum = sum;
                    biggestSumX = x;
                    biggestSumY = y;
                }
            }
            else
            {
                this.AverageScoreHeatMap.addValue(i, j, 0);
            }
            if (showTriggerCounter < p / (pointsToCalculateScoreIntegral.length / 10))
            {
                showTriggerCounter++;
                this.PropertyChanged.trigger();
                this.OptimalResult.setOptimalResultPoint(biggestSumX, biggestSumY);
            }
        }
        this.PropertyChanged.trigger();
        this.OptimalResult.setOptimalResultPoint(biggestSumX, biggestSumY);
    }

    calculateIntegralOfPointsTimesProbability()
    {
        //TODO: move from above function to here
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

    _shuffle(array)
    {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0)
        {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}