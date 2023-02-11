class TargetDimensions
{
    constructor()
    {
        this.doubleMultiplierWidth = 8;
        this.trippleMultiplierWidth = 8;
        this.bigDiameter = 340;
        this.bigRadius = this.bigDiameter / 2;
        this.innerBigDiameter = this.bigDiameter -
            this.doubleMultiplierWidth * 2;
        this.innerBigRadius = this.innerBigDiameter / 2;
        this.mediumDiameter = 214;
        this.mediumRadius = this.mediumDiameter / 2;
        this.innerMediumDiameter = this.mediumDiameter -
            this.trippleMultiplierWidth * 2;
        this.innerMediumRadius = this.innerMediumDiameter / 2;
        this.smallDiameter = 32;
        this.smallRadius = this.smallDiameter / 2;
        this.smallMultiplierDiameter = 12.7;
        this.smallMultiplierRadius = this.smallMultiplierDiameter / 2;
    }
}