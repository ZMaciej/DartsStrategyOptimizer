class TargetView
{
    constructor(targetDimensions, scoringInfo)
    {
        this.TargetDimensions = targetDimensions;
        this.ScoringInfo = scoringInfo;
        this.LocalScale = 0;
        this.XOffset = 0;
        this.YOffset = 0;
        this.Width = 0;
        this.Height = 0;
        this.CenterX = 0;
        this.CenterY = 0;
    }

    draw(xOffset, yOffset, width, height)
    {
        this.XOffset = xOffset;
        this.YOffset = yOffset;
        this.Width = width;
        this.Height = height;
        var targetHeightPercentage = 0.85;
        this.LocalScale = this.Height / this.TargetDimensions.bigDiameter * targetHeightPercentage;
        this.CenterX = this.XOffset + this.Width * 0.5;
        this.CenterY = this.YOffset + this.Height * 0.5;
        strokeWeight(3);
        var targetDimensionsVM = new TargetDimsVM(this.LocalScale, this.TargetDimensions);
        stroke(0);
        this.drawCircle(this.CenterX, this.CenterY, targetDimensionsVM.bigDiameter);
        this.drawCircle(this.CenterX, this.CenterY, targetDimensionsVM.bigDiameter - 2 * targetDimensionsVM.doubleMultiplierWidth);
        this.drawCircle(this.CenterX, this.CenterY, targetDimensionsVM.mediumDiameter);
        this.drawCircle(this.CenterX, this.CenterY, targetDimensionsVM.mediumDiameter - 2 * targetDimensionsVM.trippleMultiplierWidth);
        var angleStep = 360 / 20;
        var startAngle = angleStep / 2;
        for (let i = 0; i < 20; i++)
        {
            var angle = (radians(startAngle + i * angleStep));
            line(this.CenterX - sin(angle) * targetDimensionsVM.bigDiameter / 2,
                this.CenterY - cos(angle) * targetDimensionsVM.bigDiameter / 2,
                this.CenterX + sin(angle) * targetDimensionsVM.bigDiameter / 2,
                this.CenterY + cos(angle) * targetDimensionsVM.bigDiameter / 2);
        }
        this.drawCircle(this.CenterX, this.CenterY, targetDimensionsVM.smallDiameter);
        this.drawCircle(this.CenterX, this.CenterY, targetDimensionsVM.smallMultiplierDiameter);
        var labelHeightPercentage = 1 - targetHeightPercentage;
        var marginPercentage = 0.4; //percentage of the margin in text label
        var textHeightPercentage = labelHeightPercentage - (labelHeightPercentage * marginPercentage);
        var textHeight = this.Height * textHeightPercentage * 0.66;
        var marginHeight = this.Height * labelHeightPercentage * marginPercentage / 2;
        this.drawNumbers(this.CenterX, this.CenterY, targetDimensionsVM.bigDiameter * 0.5 + marginHeight / 2, textHeight, this.ScoringInfo);
    }

    getRelativeScoreBoardMousePosition()
    {
        var mappedX = (mouseX - this.CenterX) / this.LocalScale;
        var mappedY = (-mouseY + this.CenterY) / this.LocalScale;
        return [mappedX, mappedY];
    }

    drawNumbers(xloc, yloc, textBaseRadius, textHeight, scoringInfo)
    {
        textSize(textHeight);
        stroke(0, 0, 0);
        strokeWeight(5);
        fill(256);
        textAlign(CENTER);
        translate(xloc, yloc);
        var angleStep = 360 / 20;
        for (let i = 0; i < 20; i++)
        {
            var angle = radians(i * angleStep);
            push();
            rotate(angle);
            if (angle > PI / 2 && angle < 3 / 2 * PI)
            {
                rotate(PI);
                translate(0, 2 * textBaseRadius + 0.72 * textHeight);
            }
            text(scoringInfo.BasicScoreValues[i], 0, 0 - textBaseRadius);
            pop();
        }
    }

    drawTarget(xloc, yloc, size, num)
    {
        const grayvalues = 255 / num;
        const steps = size / num;
        for (let i = 0; i < num; i++)
        {
            fill(i * grayvalues);
            ellipse(xloc, yloc, size - i * steps, size - i * steps);
        }
    }

    drawCircle(xloc, yloc, size)
    {
        stroke(0);
        fill(255, 255, 255);
        circle(xloc, yloc, size);
    }
}