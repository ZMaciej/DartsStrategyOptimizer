function preload()
{
    MontserratFont = loadFont('style/Montserrat-Regular.ttf');
}

function setup()
{
    isResultPresented = false;
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

    optimalResult = new OptimalResult();
    optimalResultVM = new OptimalResultVM(optimalResult, targetView);
    optimalResultView = new OptimalResultView(optimalResultVM);
    distributionCalculator = new DistributionCalculator(hitRegistrator,
        targetDimensions, targetHeightPercentage, heatMap);
    optimalPointCalculator = new OptimalPointCalculator(distributionCalculator,
        scoreCalculator, optimalResult);

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
        isResultPresented = false;
    }
    background(255);
    heatMapView.draw(0, 0, canvasWidth, canvasHeight);
    targetView.draw(0, 0, canvasWidth, canvasHeight);
    if (isResultPresented)
    {
        optimalResultView.drawResult();
    } else
    {
        hitRegistratorView.drawHits();
    }
}

function mouseMoved()
{
}

function calculate()
{
    optimalPointCalculator.calculate();
    heatMapView.setHeatMap(optimalPointCalculator.AverageScoreHeatMap);
    isResultPresented = true;
}

function setUpInterface()
{
    $('#buttonBack').on('click', function ()
    {
        hitRegistrator.removeHit()
        heatMapView.setHeatMap(heatMap);
        isResultPresented = false;
    });
    $('#buttonClear').on('click', function ()
    {
        hitRegistrator.clearHits()
        heatMapView.setHeatMap(heatMap);
        isResultPresented = false;
    });
    $('#buttonExample').on('click', function ()
    {
        hitRegistrator.clearHits()
        hitRegistratorManager._loadFromJson(example);
        heatMapView.setHeatMap(heatMap);
        isResultPresented = false;
    });
    $('#buttonCompute').on('click',
        function ()
        {
            calculate();
        });
    $(function ()
    {
        $('[data-toggle="tooltip"]').tooltip()
    })
}