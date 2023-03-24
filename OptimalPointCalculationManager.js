class OptimalPointCalculationManager
{
    constructor(optimalPointCalculator)
    {
        this.OptimalPointCalculator = optimalPointCalculator;
        this.HeatMap = optimalPointCalculator.AverageScoreHeatMap;
        this.PointsToCalculateScoreIntegral = new Array();
        for (let i = 0; i < this.HeatMap.Resolution; i++)
        {
            for (let j = 0; j < this.HeatMap.Resolution; j++)
            {
                this.PointsToCalculateScoreIntegral.push({ 'i': i, 'j': j });
            }
        }
        this.PointsToCalculateScoreIntegral = this._shuffle(this.PointsToCalculateScoreIntegral);
        this.reset();
    }

    computeNextPart()
    {
        var chunk = this.PointsToCalculateScoreIntegral.slice(this.StartIndex,
            this.StartIndex + this.Count);
        if (chunk.length > 0)
        {
            this.OptimalPointCalculator.calculate(chunk);
            this.StartIndex += this.Count;
        }
        if (this.StartIndex > this.PointsToCalculateScoreIntegral.length)
        {
            this.Ended = true;
        }
    }

    reset()
    {
        this.StartIndex = 0;
        this.Count = 100;
        this.Ended = false;
        this.OptimalPointCalculator.reset();
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