class HeatMapView
{
    constructor(heatMap)
    {
        this.Resolution = heatMap.Resolution;
        this.HeatMap = heatMap;
    }
    draw(xOffset, yOffset, width, height)
    {
        noStroke();

        let xStep = width / this.Resolution;
        let yStep = height / this.Resolution;

        for (let x = 0; x < this.Resolution; x++)
        {
            for (let y = 0; y < this.Resolution; y++)
            {
                var colorScale = new ColorScale();
                fill(colorScale.calculate(this.HeatMap.HeatMatrix[x][y], this.HeatMap.minValue, this.HeatMap.maxValue));
                rect(xOffset + x * xStep, yOffset + y * yStep, xStep, yStep);
            }
        }
    }
    setHeatMap(heatMap)
    {
        this.Resolution = heatMap.Resolution;
        this.HeatMap = heatMap;
    }
}