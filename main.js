function setup()
{
    canvasWidth = 900;
    canvasHeight = 900;
    hitRegistrator = new HitRegistrator();
    createCanvas(canvasWidth, canvasHeight);
    background(255);
    noStroke();
    // frameRate(5);
    noLoop();
    setUpInterface();
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
    $('#buttonExample').on('click', function () { });
    $('#buttonCompute').on('click', function () { });
}