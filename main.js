function setup()
{
    canvasWidth = 850;
    canvasHeight = 850;
    calculationResolution = 85;
    targetDimensions = new TargetDimensions();
    hitRegistrator = new HitRegistrator();
    hitRegistratorManager = new HitRegistratorManager(hitRegistrator);
    targetHeightPercentage = 0.85;
    heatMap = new HeatMap(calculationResolution);
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    background(255);
    noStroke();
    noLoop();
    setUpInterface();
    scoringInfo = new ScoringInfo();
    targetView = new TargetView(targetDimensions, scoringInfo);
    targetView.calculateParameters(0, 0, canvasWidth, canvasHeight);
    heatMapView = new HeatMapView(heatMap);
    hitRegistratorVM = new HitRegistratorVM(hitRegistrator, targetView);
    hitRegistratorView = new HitRegistratorView(hitRegistratorVM);
    scoreCalculator = new ScoreCalculator(scoringInfo, targetDimensions);

    distributionCalculator = new DistributionCalculator(hitRegistrator,
        targetDimensions, targetHeightPercentage, heatMap);
    optimalPointCalculator = new OptimalPointCalculator(distributionCalculator,
        scoreCalculator);

    example = null;
    $.getJSON("data/example.json", function (json)
    {
        example = json;
        hitRegistratorManager._loadFromJson(example);
        heatMapView.setHeatMap(heatMap);
        heatMapView.draw(0, 0, canvasWidth, canvasHeight);
        targetView.draw();
        hitRegistratorView.drawHits();
    });
}

function draw()
{

}

function mouseClicked(event)
{
    if (mouseX >= 0 && mouseX <= canvasWidth &&
        mouseY >= 0 && mouseY <= canvasHeight)
    {
        position = targetView.getRelativeScoreBoardMousePosition();
        score = scoreCalculator.getScore(position[0], position[1]);
        console.log("score: " + score);
        hitRegistrator.addHit(position[0], position[1], score);
        heatMapView.setHeatMap(heatMap);
    }
    background(255);
    heatMapView.draw(0, 0, canvasWidth, canvasHeight);
    targetView.draw(0, 0, canvasWidth, canvasHeight);
    hitRegistratorView.drawHits();
}

function mouseMoved()
{
}

function calculate()
{
    optimalPointCalculator.calculate();
    heatMapView.setHeatMap(optimalPointCalculator.AverageScoreHeatMap);
    heatMapView.draw(0, 0, canvasWidth, canvasHeight);
    targetView.draw(0, 0, canvasWidth, canvasHeight);
    hitRegistratorView.drawHits();
}

function setUpInterface()
{
    $('#buttonBack').on('click', function () { hitRegistrator.removeHit() });
    $('#buttonClear').on('click', function () { hitRegistrator.clearHits() });
    $('#buttonExample').on('click', function ()
    {
        hitRegistrator.clearHits()
        hitRegistratorManager._loadFromJson(example);
    });
    $('#buttonCompute').on('click',
        function ()
        {
            calculate();
        });
}