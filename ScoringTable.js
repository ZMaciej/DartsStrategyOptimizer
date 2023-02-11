class ScoringTable
{
    constructor(resolution, tagetDimensions, scoringInfo)
    {
        this.Position = new Array(resolution);
        this.ScoringCellWidth = tagetDimensions.bigDiameter / resolution;
        for (let i = 0; i < resolution; i++)
        {
            this.Position[i] = new Array(resolution);
        }
        // calculating points value of the scoring cell in center
    }
}