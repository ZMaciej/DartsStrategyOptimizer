function setup()
{
    canvasWidth = 850;
    canvasHeight = 850;
    hitRegistrator = new HitRegistrator();
    hitRegistratorManager = new HitRegistratorManager(hitRegistrator);
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    background(255);
    noStroke();
    // frameRate(5);
    noLoop();
    setUpInterface();
    $.getJSON("data/example.json", function (json)
    {
        hitRegistratorManager._loadFromJson(json);
    });
}

function draw()
{
    targetDimensions = new TargetDimensions();
    scoringInfo = new ScoringInfo();
    targetView = new TargetView(targetDimensions, scoringInfo);
    targetView.draw(0, 0, canvasWidth, canvasHeight);
    hitRegistratorVM = new HitRegistratorVM(hitRegistrator, targetView);
    hitRegistratorView = new HitRegistratorView(hitRegistratorVM);
    scoreCalculator = new ScoreCalculator(scoringInfo, targetDimensions);
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
}

function mouseMoved()
{
}

function setUpInterface()
{
    $('#buttonBack').on('click', function () { hitRegistrator.removeHit() });
    $('#buttonClear').on('click', function () { hitRegistrator.clearHits() });
    $('#buttonExample').on('click', function () { hitRegistratorManager.load() });
    $('#buttonCompute').on('click', function () { hitRegistratorManager.save() });
}