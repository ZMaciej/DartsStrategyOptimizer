class ScoreCalculator
{
    constructor(scoringInfo, targetDimensions)
    {
        this.ScoringInfo = scoringInfo;
        this.TargetDimensions = targetDimensions;
    }

    getScore(xpos, ypos)
    {
        var radiusSqared = xpos * xpos + ypos * ypos; //radius squared
        var score = 0;
        if (radiusSqared < this.TargetDimensions.innerMediumRadius *
            this.TargetDimensions.innerMediumRadius)
        {
            if (radiusSqared > this.TargetDimensions.smallRadius *
                this.TargetDimensions.smallRadius)
            {
                score = this._calculateBasicScoreValue(xpos, ypos);
            } else
            {
                if (radiusSqared > this.TargetDimensions.smallMultiplierRadius *
                    this.TargetDimensions.smallMultiplierRadius)
                {
                    score = this.ScoringInfo.CenterScore;
                } else
                {
                    score = this.ScoringInfo.CenterScore * 2;
                }
            }
        } else
        {
            if (radiusSqared < this.TargetDimensions.innerBigRadius *
                this.TargetDimensions.innerBigRadius)
            {
                if (radiusSqared > this.TargetDimensions.mediumRadius *
                    this.TargetDimensions.mediumRadius)
                {
                    score = this._calculateBasicScoreValue(xpos, ypos);
                }
                else
                {
                    score = this._calculateBasicScoreValue(xpos, ypos) * 3;
                }
            } else
            {
                if (radiusSqared < this.TargetDimensions.bigRadius *
                    this.TargetDimensions.bigRadius)
                {
                    score = this._calculateBasicScoreValue(xpos, ypos) * 2;
                }
            }
        }
        return score;
    }

    _calculateBasicScoreValue(xpos, ypos)
    {
        var angle = degrees(Math.atan2(xpos, ypos));
        var stepAngle = 360 / this.ScoringInfo.BasicScoreValues.length;
        // convert angle to start at the beginning of 20 score field and rotate
        // clockwise from 0 to 360 deg
        angle = angle + stepAngle / 2;
        angle = (angle + 360) % 360;
        // determining score
        var basicScoreValue =
            this.ScoringInfo.BasicScoreValues[Math.floor(angle / stepAngle)];
        return basicScoreValue;
    }
}