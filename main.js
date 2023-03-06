function setup()
{
    canvasWidth = 850;
    canvasHeight = 850;
    calculationResolution = 85;
    targetDimensions = new TargetDimensions();
    hitRegistrator = new HitRegistrator();
    hitRegistratorManager = new HitRegistratorManager(hitRegistrator);
    heatMap = new HeatMap(calculationResolution, hitRegistrator,
        targetDimensions);
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    background(255);
    noStroke();
    // frameRate(5);
    noLoop();
    setUpInterface();
    example = null;
    $.getJSON("data/example.json", function (json)
    {
        example = json;
    });
}

function draw()
{
    scoringInfo = new ScoringInfo();
    targetView = new TargetView(targetDimensions, scoringInfo);
    targetView.draw(0, 0, canvasWidth, canvasHeight);
    hitRegistratorVM = new HitRegistratorVM(hitRegistrator, targetView);
    hitRegistratorView = new HitRegistratorView(hitRegistratorVM);
    scoreCalculator = new ScoreCalculator(scoringInfo, targetDimensions);
    heatMapView = new HeatMapView(heatMap);
    heatMapView.draw(0, 0, canvasWidth, canvasHeight);
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
    }
    background(255);
    targetView.draw(0, 0, canvasWidth, canvasHeight);
    hitRegistratorView.drawHits();
    heatMapView.draw(0, 0, canvasWidth, canvasHeight);
}

function mouseMoved()
{
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
            heatMap.calculateNormalDistributionParameters();
            console.log(heatMap);
        });
}