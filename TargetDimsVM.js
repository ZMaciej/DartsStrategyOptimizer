class TargetDimsVM
{
    constructor(scale, targetDimensions)
    {
        this.doubleMultiplierWidth = targetDimensions.doubleMultiplierWidth * scale;
        this.trippleMultiplierWidth = targetDimensions.trippleMultiplierWidth * scale;
        this.bigDiameter = targetDimensions.bigDiameter * scale;
        this.mediumDiameter = targetDimensions.mediumDiameter * scale;
        this.smallDiameter = targetDimensions.smallDiameter * scale;
        this.smallMultiplierDiameter = targetDimensions.smallMultiplierDiameter * scale;
    }
}