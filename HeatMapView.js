class HeatMapView
{
    constructor(heatMap)
    {
        this.Resolution = heatMap.Resolution;
        this.HeatMap = heatMap;
    }

    draw(xOffset, yOffset, width, height, indexes)
    {
        noStroke();
        let xStep = width / this.Resolution;
        let yStep = height / this.Resolution;
        if (indexes == NaN || indexes == undefined)
        {
            for (let x = 0; x < this.Resolution; x++)
            {
                for (let y = 0; y < this.Resolution; y++)
                {
                    if (this.HeatMap.HeatMatrix[x][y] > 0)
                    {
                        var colorScale = new ColorScale();
                        fill(colorScale.calculate(this.HeatMap.HeatMatrix[x][y], this.HeatMap.minValue, this.HeatMap.maxValue));
                        rect(xOffset + x * xStep, yOffset + y * yStep, xStep, yStep);
                    }
                }
            }
        } else
        {
            indexes.forEach(idxs =>
            {
                let x = idxs.i;
                let y = idxs.j;
                let colorScale = new ColorScale();
                fill(colorScale.calculate(this.HeatMap.HeatMatrix[x][y], this.HeatMap.minValue, this.HeatMap.maxValue));
                rect(xOffset + x * xStep, yOffset + y * yStep, xStep, yStep);
            });
        }
    }

    setHeatMap(heatMap)
    {
        this.Resolution = heatMap.Resolution;
        this.HeatMap = heatMap;
    }
}