class TargetView
{
    constructor(targetDimensions, scoringInfo)
    {
        this.TargetDimensions = targetDimensions;
        this.TargetHeightPercentage = 0.85;
        this.ScoringInfo = scoringInfo;
        this.LocalScale = 0;
        this.XOffset = 0;
        this.YOffset = 0;
        this.Width = 0;
        this.Height = 0;
        this.CenterX = 0;
        this.CenterY = 0;
        this._targetDimensionsVM = null;
    }

    calculateParameters(xOffset, yOffset, width, height)
    {
        this.XOffset = xOffset;
        this.YOffset = yOffset;
        this.Width = width;
        this.Height = height;
        this.LocalScale = this.Height / this.TargetDimensions.bigDiameter
            * this.TargetHeightPercentage;
        this._targetDimensionsVM =
            new TargetDimsVM(this.LocalScale, this.TargetDimensions);
        this.CenterX = this.XOffset + this.Width * 0.5;
        this.CenterY = this.YOffset + this.Height * 0.5;
    }

    draw()
    {
        var bigDiameter = this._targetDimensionsVM.bigDiameter;
        var mediumDiameter = this._targetDimensionsVM.mediumDiameter;
        var smallDiameter = this._targetDimensionsVM.smallDiameter;
        var doubleMultiplierWidth =
            this._targetDimensionsVM.doubleMultiplierWidth;
        var trippleMultiplierWidth =
            this._targetDimensionsVM.trippleMultiplierWidth;
        var smallMultiplierDiameter =
            this._targetDimensionsVM.smallMultiplierDiameter;

        strokeWeight(3);
        stroke(0);
        this.drawCircle(this.CenterX, this.CenterY, bigDiameter);
        this.drawCircle(this.CenterX, this.CenterY, bigDiameter
            - 2 * doubleMultiplierWidth);
        this.drawCircle(this.CenterX, this.CenterY, mediumDiameter);
        this.drawCircle(this.CenterX, this.CenterY, mediumDiameter
            - 2 * trippleMultiplierWidth);
        var angleStep = 360 / 20;
        var startAngle = angleStep / 2;
        for (let i = 0; i < 20; i++)
        {
            var angle = (radians(startAngle + i * angleStep));
            line(this.CenterX + sin(angle) * (bigDiameter / 2),
                this.CenterY + cos(angle) * (bigDiameter / 2),
                this.CenterX + sin(angle) * (smallDiameter / 2),
                this.CenterY + cos(angle) * (smallDiameter / 2));
        }
        this.drawCircle(this.CenterX, this.CenterY, smallDiameter);
        this.drawCircle(this.CenterX, this.CenterY, smallMultiplierDiameter);
        var labelHeightPercentage = 1 - this.TargetHeightPercentage;
        var marginPercentage = 0.4; //percentage of the margin in text label
        var textHeightPercentage = labelHeightPercentage
            - (labelHeightPercentage * marginPercentage);
        var textHeight = this.Height * textHeightPercentage * 0.66;
        var marginHeight = this.Height * labelHeightPercentage
            * marginPercentage / 2;
        this.drawNumbers(this.CenterX, this.CenterY,
            bigDiameter * 0.5 + marginHeight / 2, textHeight, this.ScoringInfo);
    }

    getRelativeScoreBoardMousePosition()
    {
        var mappedX = (mouseX - this.CenterX) / this.LocalScale;
        var mappedY = (-mouseY + this.CenterY) / this.LocalScale;
        return [mappedX, mappedY];
    }

    drawNumbers(xloc, yloc, textBaseRadius, textHeight, scoringInfo)
    {
        textFont(MontserratFont);
        textSize(textHeight);
        stroke(255, 255, 255, 0);
        strokeWeight(5);
        fill(0);
        textAlign(CENTER);
        push();
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
        pop();
    }

    drawCircle(xloc, yloc, size)
    {
        stroke(0);
        fill(255, 255, 255, 0);
        circle(xloc, yloc, size);
    }
}