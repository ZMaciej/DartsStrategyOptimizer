function setup()
{
    createCanvas(900, 900);
    background(255);
    noStroke();
    frameRate(5);
}

function draw()
{
    targetDimensions = new TargetDimensions();
    scoringInfo = new ScoringInfo();
    targetView = new TargetView(targetDimensions, scoringInfo);
    targetView.draw(0, 0, 900, 900);
    position = targetView.getRelativeScoreBoardMousePosition();
    scoreCalculator = new ScoreCalculator(scoringInfo, targetDimensions);
    score = scoreCalculator.getScore(position[0], position[1]);
    console.log("score: " + score);
}