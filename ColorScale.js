class ColorScale
{
    constructor()
    {

    }

    calculate(value, minValue, maxValue)
    {
        var span = maxValue - minValue;
        if (isNaN(value) || value == undefined || span == 0)
        {
            return color(255, 255, 255, 100);
        }
        else
        {
            value = (value - minValue) / span;
            var colors = new Array(new Array(1, 1, 1), new Array(0, 0, 1),
                new Array(0, 1, 1), new Array(0, 1, 0), new Array(1, 1, 0),
                new Array(1, 0, 0), new Array(0, 0, 0));
            var numColors = colors.length;


            var idx1;
            var idx2;
            var fractBetween = 0;

            if (value <= 0) { idx1 = idx2 = 0; }
            else if (value >= 1) { idx1 = idx2 = numColors - 1; }
            else
            {
                value = value * (numColors - 1);
                idx1 = Math.floor(value);
                idx2 = idx1 + 1;
                fractBetween = value - float(idx1);
            }

            var red = (colors[idx2][0] - colors[idx1][0]) *
                fractBetween + colors[idx1][0];
            var green = (colors[idx2][1] - colors[idx1][1]) *
                fractBetween + colors[idx1][1];
            var blue = (colors[idx2][2] - colors[idx1][2]) *
                fractBetween + colors[idx1][2];
        }
        return color(red * 255, green * 255, blue * 255, 100);
    }
}