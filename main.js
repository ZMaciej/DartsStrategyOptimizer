function setup()
{
    createCanvas(720, 720);
    background(255);
    noStroke();
    noLoop();
}

function draw()
{
    scale = 1.8;
    targetDimensions = new TargetDimensions();
    targetDimensionsVM = new TargetDimsVM(scale, targetDimensions);
    stroke(0);
    drawCircle(width * 0.5, height * 0.5, targetDimensionsVM.bigDiameter);
    drawCircle(width * 0.5, height * 0.5, targetDimensionsVM.bigDiameter - 2 * targetDimensionsVM.doubleMultiplierWidth);
    drawCircle(width * 0.5, height * 0.5, targetDimensionsVM.mediumDiameter);
    drawCircle(width * 0.5, height * 0.5, targetDimensionsVM.mediumDiameter - 2 * targetDimensionsVM.trippleMultiplierWidth);
    angleStep = 360 / 20;
    startAngle = angleStep / 2;
    for (let i = 0; i < 20; i++)
    {
        angle = (radians(startAngle + i * angleStep));
        line(width * 0.5 - sin(angle) * targetDimensionsVM.bigDiameter / 2,
            height * 0.5 - cos(angle) * targetDimensionsVM.bigDiameter / 2,
            width * 0.5 + sin(angle) * targetDimensionsVM.bigDiameter / 2,
            height * 0.5 + cos(angle) * targetDimensionsVM.bigDiameter / 2);
    }
    drawCircle(width * 0.5, height * 0.5, targetDimensionsVM.smallDiameter);
    drawCircle(width * 0.5, height * 0.5, targetDimensionsVM.smallMultiplierDiameter);
}

function drawTarget(xloc, yloc, size, num)
{
    const grayvalues = 255 / num;
    const steps = size / num;
    for (let i = 0; i < num; i++)
    {
        fill(i * grayvalues);
        ellipse(xloc, yloc, size - i * steps, size - i * steps);
    }
}

function drawCircle(xloc, yloc, size)
{
    stroke(0);
    fill(255, 255, 255);
    circle(xloc, yloc, size);
}