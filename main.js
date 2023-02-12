function setup()
{
    createCanvas(1300, 900);
    background(255);
    noStroke();
    // frameRate(5);
    noLoop();
}

function draw()
{
    targetDimensions = new TargetDimensions();
    scoringInfo = new ScoringInfo();
    targetView = new TargetView(targetDimensions, scoringInfo);
    targetView.draw(0, 0, 900, 900);
    hitRegistrator = new HitRegistrator();
    hitRegistratorVM = new HitRegistratorVM(hitRegistrator, targetView);
    hitRegistratorView = new HitRegistratorView(hitRegistratorVM);
    scoreCalculator = new ScoreCalculator(scoringInfo, targetDimensions);
}

function mouseClicked(event)
{
    position = targetView.getRelativeScoreBoardMousePosition();
    score = scoreCalculator.getScore(position[0], position[1]);
    console.log("score: " + score);
    hitRegistrator.addHit(position[0], position[1], score);
}

function mouseMoved()
{
}