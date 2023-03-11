class HeatMap
{
    constructor(resolution)
    {
        this.Resolution = resolution;

        this.HeatMatrix = new Array(this.Resolution);
        for (let i = 0; i < this.HeatMatrix.length; i++)
        {
            this.HeatMatrix[i] = new Array(this.Resolution);
        }
        this.maxValue = 0;
        this.minValue = 0;
    }

    resetMinMaxValues()
    {
        this.maxValue = 0;
        this.minValue = Number.MAX_VALUE;
    }

    addValue(i, j, value)
    {
        this.HeatMatrix[i][j] = value;
        if (value > this.maxValue)
            this.maxValue = value;
        else if (value < this.minValue)
            this.minValue = value;
    }
}