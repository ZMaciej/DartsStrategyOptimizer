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
    screenBuff = get(0, 0, canvasWidth, canvasHeight);
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
    optimalPointCalculationManager = new OptimalPointCalculationManager(
        optimalPointCalculator);
    calculationStarted = false;

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
    //draw loop only used for calculation
    if (calculationStarted)
    {
        let chunk = optimalPointCalculationManager.computeNextPart();
        image(screenBuff, 0, 0);


        if (!optimalPointCalculationManager.Ended)
        {
            heatMapView.draw(0, 0, canvasWidth, canvasHeight, chunk);
            screenBuff = get(0, 0, canvasWidth, canvasHeight);
        }
        else
        {
            background(255);
            noLoop();
            calculationStarted = false;
            heatMapView.draw(0, 0, canvasWidth, canvasHeight);
        }
        targetView.draw(0, 0, canvasWidth, canvasHeight);
        optimalResultView.drawResult();
    }
    else
    {
        noLoop();
    }
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
        calculationStarted = false;
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
    background(255);
    screenBuff = get(0, 0, canvasWidth, canvasHeight);
    calculationStarted = true;
    isResultPresented = true;
    optimalPointCalculationManager.reset();
    heatMapView.setHeatMap(optimalPointCalculator.AverageScoreHeatMap);
    loop();
}

function changeResolution(resolution)
{
    calculationResolution = resolution;
    heatMap = new HeatMap(calculationResolution);
    heatMapView = new HeatMapView(heatMap);
    distributionCalculator = new DistributionCalculator(hitRegistrator,
        targetDimensions, targetHeightPercentage, heatMap);
    optimalPointCalculator = new OptimalPointCalculator(distributionCalculator,
        scoreCalculator, optimalResult);
    optimalPointCalculationManager =
        new OptimalPointCalculationManager(optimalPointCalculator);
    isResultPresented = false;
}

function setUpInterface()
{
    $('#buttonBack').on('click', function ()
    {
        hitRegistrator.removeHit()
        heatMapView.setHeatMap(heatMap);
        isResultPresented = false;
        noLoop();
    });
    $('#buttonClear').on('click', function ()
    {
        hitRegistrator.clearHits()
        heatMapView.setHeatMap(heatMap);
        isResultPresented = false;
        noLoop();
    });
    $('#buttonExample').on('click', function ()
    {
        hitRegistrator.clearHits()
        hitRegistratorManager._loadFromJson(example);
        heatMapView.setHeatMap(heatMap);
        isResultPresented = false;
        noLoop();
    });
    $('#buttonCompute').on('click', function ()
    {
        calculate();
    });
    $('#lowResolution').on('click', function ()
    {
        changeResolution(85);
    });
    $('#highResolution').on('click', function ()
    {
        changeResolution(175);
    });
    $(function ()
    {
        $('[data-toggle="tooltip"]').tooltip()
    })
}