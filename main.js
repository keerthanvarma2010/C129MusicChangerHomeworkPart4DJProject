Lily = "LilyByAlanWalkerMusic.mp3";
PeterPan = "PeterPanMusicForMusicChangerAppCodingHomework.mp3";

LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;

LeftWristScore = 0;
Song1Status = "";

function setup() {
    canvas = createCanvas(560, 500);
    canvas.center();

    Video = createCapture(VIDEO);
    Video.position(325);
    Video.hide();

    poseNet = ml5.poseNet(Video, ModelLoaded);
    poseNet.on('pose', GotPoses);
}

function preload() {
    Lily = loadSound("LilyByAlanWalkerMusic.mp3");
    PeterPan = loadSound("PeterPanMusicForMusicChangerAppCodingHomework.mp3");
}

function draw() {
    image(Video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    LeftWristScore = Lily.isPlaying()

    if (LeftWristScore > 0.2) {
        circle(LeftWristX,LeftWristY,20);

        PeterPan.stop()

        if (Song1Status = false) {
            Lily.play()
        }
    }
}

function ModelLoaded() {
    console.log("Posenet Is Initialized");
}


function GotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        LeftWristScore = results[0].pose.keypoints[9].score;

        console.log("ScoreLeftWrist = " + LeftWristScore);

        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;

        console.log("LeftWristX  = " + LeftWristX + " RightWristX = " + RightWristX);
    }
}