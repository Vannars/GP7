//The Game Project 7
var isLeft;
var isRight;
var isFalling;
var gameChar_x;
var gameChar_y;

var floorPos_y;
var CameraPosX;
var CameraPosY;

var gameOver
var gameOvertext
var levelComplete
var levelCompletetext

var scoreCounter
var lives

var livesImgX
var liveImgY
var lifeLost
var collectImgX
var collectImgY
var collectImgS

var canyons

var raindrops = []
let pitter, pickup, death, end, base, moveit, fin

function preload() {
    pickup = loadSound("pickup.wav")
    pitter = loadSound("Rainfall.wav")
    death = loadSound("death.wav")
    end = loadSound('gameover.wav')
    base = loadSound('base.wav')
    moveit = loadSound('moveit.wav')
    fin = loadSound('fin.wav')
}
function backgroundMusic() {
    pitter.setVolume(0.5)
    pitter.play()
    pitter.loop()

    base.setVolume(0.125)
    base.play()
    base.duration(30)
    base.loop()
    userStartAudio();
}
function pickupitem() {
    pickup.setVolume(0.3);
    pickup.play();

}

function deathSound() {
    death.setVolume(0.8);
    death.currentTime(2)
    death.play();
}
function gameoverSound() {
    end.setVolume(0.8);
    end.play()
}
function finish() {
    fin.setVolume(0.8);
    fin.play()
}
function movementSound() {
    var len = moveit.duration();
    moveit.play()
    moveit.jump(len - 2.81)
    moveit.setVolume(0.8);
}
//CREATING RAIN IN THE DRAW LOOP USING A FOR LOOP AND RAIN FUNCTION() 
function RainFall() {
    for (var i = 0; i < 200; i++) {
        raindrops[i].draw();
        raindrops[i].fall();
    }
}
//THE FUNCTION HERE USES THIS. TO REFERENCE ITSELF WITH X Y AND DRAW VALUES
function Rain() {
    this.x = random(0, width);
    this.y = random(0, width);
    //HERE IS A NESTED FUNCTION THAT DRAWS RAINDROPS WITH X AND Y RECT AND FILL
    this.draw = function () {
        noStroke();
        fill(70, 130, 180, 150);
        rect(this.x, this.y, random(1, 2), (5 * 0.98));

        // HERE IS A NESTED FUNCTION THAT MAKES THE RAIN FALL BY AFFECTING THE THIS.X AND THIS.Y VARIABLES IF THE RAINDROPS ARE > FLOORPOS_Y
        this.fall = function () {
            this.y = this.y + random(1, 30);
            this.x = this.x + random(0, 7.5)
            if (this.y > floorPos_y) {
                this.y = 0;
            }
            // HERE IS A NESTED IF STATEMENT THAT RESETS THE X VALUE OF RAINDROPS IF THIS.X IS GREATER THAN THE WIDTH OF THE CANVAS
            if (this.x > width) {
                this.x = 0
            }
        }
    }
}
//CREATING THE END FLAG
function endPoint() {
    "Draw the Flag"
    // if the player stands near the flag it "activates"
    if (dist(gameChar_x - 15 || gameChar_x + 15,
            gameChar_y + 100, flag.flagPos_X + 20,
            flag.flagPos_Y - 100 || flag.flagPos_Y + 18) < 85 && (isFalling == true || isFalling == false)) {
        //Rocket Ship
        flag.isReached = true
        flag.beamLength -= 30
        beginShape()
        strokeWeight(2);
        stroke(255);
        fill(0);
        //Ship Wing
        triangle(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 107 * flag.size,
            flag.flagPos_X - 2 * flag.size,
            flag.flagPos_Y - 75 * flag.size,
            flag.flagPos_X + 37 * flag.size,
            flag.flagPos_Y - 75 * flag.size);
        //Ship Flag(beam)
        noStroke()
        fill(random(200, 255),
            0, 0)
        rect(flag.flagPos_X + 48,
            flag.flagPos_Y - 240,
            4,
            flag.beamLength);
        //Ship Tip
        stroke(255)
        fill(0)
        triangle(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 110 * flag.size,
            flag.flagPos_X + 12 * flag.size,
            flag.flagPos_Y - 100 * flag.size,
            flag.flagPos_X + 24 * flag.size,
            flag.flagPos_Y - 100 * flag.size);
        //Ship Booster 1
        triangle(flag.flagPos_X + 15 * flag.size,
            flag.flagPos_Y - 73 * flag.size,
            flag.flagPos_X + 05 * flag.size,
            flag.flagPos_Y - 61 * flag.size,
            flag.flagPos_X + 19 * flag.size,
            flag.flagPos_Y - 61 * flag.size);
        //Ship Booster 2
        triangle(flag.flagPos_X + 21 * flag.size,
            flag.flagPos_Y - 73 * flag.size,
            flag.flagPos_X + 19 * flag.size,
            flag.flagPos_Y - 61 * flag.size,
            flag.flagPos_X + 28 * flag.size,
            flag.flagPos_Y - 61 * flag.size);
        triangle(flag.flagPos_X + 21 * flag.size,
            flag.flagPos_Y - 73 * flag.size,
            flag.flagPos_X + 19 * flag.size,
            flag.flagPos_Y - 61 * flag.size,
            flag.flagPos_X + 17 * flag.size,
            flag.flagPos_Y - 61 * flag.size);
        //Body
        fill(0)
        rect(flag.flagPos_X + 12 * flag.size,
            flag.flagPos_Y - 100 * flag.size,
            flag.size * 12,
            flag.size * 30);
        //Ship Body Detailing
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 12);
        fill(random(200, 255),
            0,
            random(200, 255))
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 8);
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 4);
        fill(random(200, 255),
            0,
            random(200, 255))
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 2);
        endShape();
    } else {
        beginShape()
        strokeWeight(2);
        stroke(255);
        fill(0);
        //Ship Wing
        triangle(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 107 * flag.size,
            flag.flagPos_X - 2 * flag.size,
            flag.flagPos_Y - 75 * flag.size,
            flag.flagPos_X + 37 * flag.size,
            flag.flagPos_Y - 75 * flag.size);
        //Ship Tip
        triangle(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 110 * flag.size,
            flag.flagPos_X + 12 * flag.size,
            flag.flagPos_Y - 100 * flag.size,
            flag.flagPos_X + 24 * flag.size,
            flag.flagPos_Y - 100 * flag.size);
        //Ship Booster 2
        triangle(flag.flagPos_X + 21 * flag.size,
            flag.flagPos_Y - 73 * flag.size,
            flag.flagPos_X + 19 * flag.size,
            flag.flagPos_Y - 61 * flag.size,
            flag.flagPos_X + 28 * flag.size,
            flag.flagPos_Y - 61 * flag.size);
        triangle(flag.flagPos_X + 21 * flag.size,
            flag.flagPos_Y - 73 * flag.size,
            flag.flagPos_X + 19 * flag.size,
            flag.flagPos_Y - 61 * flag.size,
            flag.flagPos_X + 17 * flag.size,
            flag.flagPos_Y - 61 * flag.size);
        //Ship Booster 2
        triangle(flag.flagPos_X + 15 * flag.size,
            flag.flagPos_Y - 73 * flag.size,
            flag.flagPos_X + 05 * flag.size,
            flag.flagPos_Y - 61 * flag.size,
            flag.flagPos_X + 19 * flag.size,
            flag.flagPos_Y - 61 * flag.size);
        //Booster
        rect(flag.flagPos_X + 12 * flag.size,
            flag.flagPos_Y - 100 * flag.size,
            flag.size * 12, flag.size * 30);
        //Ship Body Detailing
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 12);
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 8);
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 4);
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 2);
        endShape();
    }

    if (flag.isReached) {
        fill(random(200, 255),
            0,
            random(200, 255))
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 8);
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 4);
        fill(random(200, 255),
            0,
            random(200, 255))
        ellipse(flag.flagPos_X + 18 * flag.size,
            flag.flagPos_Y - 90 * flag.size,
            flag.size * 2);
    }

}
//SETUP OTHER VARIABLES OBJECTS AND ARRAYS
function setup() {
    backgroundMusic()

    //Camera Setup
    CameraPosX = 0
    CameraPosY = gameChar_y
    //CANVAS SETUP
    createCanvas(1280, 786);
    floorPos_y = height * 4 / 5;

    //Raindrops SETUP
    for (var i = 0; i < 200; i++) {
        raindrops[i] = new Rain();
    }
    //GAME CHARACTER CONDITIONS
    gameChar_x = 100;
    gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;

    scoreCounter = 0
    livesImgX = 50
    livesImgY = 100
    lives = 3
    lifeLost = false
    collectImgX = 150
    collectImgY = 64
    collectImgS = 24

    gameOver = false
    levelComplete = false
    gameOvertext = "Mission Failed"
    levelCompletetext = "Mission Accomplished"

    //CANYON SETUP

    canyons = [
//Canyon Objects within the array
        {
            x_pos: 520,
            width: 200,
            isPlummeting: false
        },
        {
            x_pos: 850,
            width: 180,
            isPlummeting: false
        },
        {
            x_pos: 1150,
            width: 25,
            isPlummeting: false
        },
        {
            x_pos: 1200,
            width: 29,
            isPlummeting: false
        },
        {
            x_pos: 520,
            width: 200,
            isPlummeting: false
        },

]

    //below is the mountain object and X Y Size array
    mountain = {
        mountainPos_X: 643,
        mountainPos_Y: 650,
        size: 1000
    };
    mountains_X = [643]
    mountains_Y = [800]
    mountains_size = [1000]
    //BackgroundHillsArray
    //start with a function that draws hill and set parameters for the hills x y width and height
    //create an array for the hills to be drawn into and a for loop that addresse that array with the number index i set to zero and the condition traversing for number of desired hills
    hills = [
        {
            x: 50,
            y: 680,
            w: 100,
            h: 100
},

        {
            x: 300,
            y: 755,
            w: 100,
            h: 100
},

        {
            x: 1120,
            y: 820,
            w: 100,
            h: 100
},

        {
            x: width + 50,
            y: 680,
            w: 100,
            h: 100
},

        {
            x: width + 300,
            y: 755,
            w: 100,
            h: 100
},

        {
            x: width * 2 + 1120,
            y: 810,
            w: 100,
            h: 100
},
        {
            x: width * 2 + 50,
            y: 680,
            w: 100,
            h: 100
},

        {
            x: width + 300,
            y: 755,
            w: 100,
            h: 100
},

        {
            x: width + 1120,
            y: 810,
            w: 100,
            h: 100
},
        {
            x: width + 50,
            y: 680,
            w: 100,
            h: 100
},

        {
            x: width + 300,
            y: 755,
            w: 100,
            h: 100
},

        {
            x: width + 1120,
            y: 810,
            w: 100,
            h: 100
},

        {
            x: 1350,
            y: 680,
            w: 100,
            h: 100
},

]

    //Below instialises the Cloud (planet with a belt)
    //Cloud Object
    clouds = [
        {
            cloud_X: 680,
            cloud_Y: 145,
            cloud_size: 150
},

        {
            cloud_X: 280,
            cloud_Y: 45,
            cloud_size: 108
},

        {
            cloud_X: 100,
            cloud_Y: 145,
            cloud_size: 45
}
]


    //Below inisialises annd makes an array for drawing tree positions 
    trees = [
        {
            trees_X: 100,
            trees_Y: 250,
            trees_size: .3
},

        {
            trees_X: 1000,
            trees_Y: 370,
            trees_size: .2
},

        {
            trees_X: 1200,
            trees_Y: 390,
            trees_size: .2
},

        {
            trees_X: 1350,
            trees_Y: 300,
            trees_size: .7
},

        {
            trees_X: width * +1300,
            trees_Y: 200,
            trees_size: .5
},

        {
            trees_X: width + 1700,
            trees_Y: 290,
            trees_size: .5
}


]

    trees2_X = [100, 400, 1100, width + 100, width + 400, width + 1100] //Tree Array
    trees2_Y = [195, 195, 195, 195, 195, 195]
    trees2_size = [1, 1, 1, 1, 1, 1]

    //initialise the collectable
    collectables = [

        {
            Pos_x: 354,
            Pos_y: 580,
            size: 15,
            isFound: false,
            score: 1
},

        {
            Pos_x: 520 + 8,
            Pos_y: 580,
            size: 15,
            isFound: false,
            score: 1
},

        {
            Pos_x: 520 + 354,
            Pos_y: 580,
            size: 15,
            isFound: false,
            score: 1
},

        {
            Pos_x: 800 + 368,
            Pos_y: 380,
            size: 15,
            isFound: false,
            score: 1
},

        {
            Pos_x: 800 + 368,
            Pos_y: 420,
            size: 15,
            isFound: false,
            score: 1
},

        {
            Pos_x: 800 + 684,
            Pos_y: 490,
            size: 15,
            isFound: false,
            score: 1
},
        {
            Pos_x: 1300 + 354,
            Pos_y: 380,
            size: 15,
            isFound: false,
            score: 1
},

        {
            Pos_x: 800 + 354,
            Pos_y: 1380,
            size: 15,
            isFound: false,
            score: 1
},
        {
            Pos_x: 800 + 354,
            Pos_y: 1480,
            size: 15,
            isFound: false,
            score: 1
}

]
    //FLAG setup
    flag = {
        flagPos_X: 1950,
        flagPos_Y: 801,
        size: 2.8,
        isReached: false,
        beamLength: 0
    };
}
//DRAWING THE SCENE
function draw() {
    //The following prevents the camera from travelling outside the game bounds relative to gameCharX
    if (gameChar_x < 100 || gameChar_x > 1700) {
        constrain(CameraPosX, -100, 1700)

    } else {
        CameraPosX = gameChar_x - 300
    }
    ///////////DRAWING CODE//////////
    background(0, 9, 0); //space
    //Bellow draws the mountain or the Planet X with a for loop
    for (i = 0; i < mountains_X.length && mountains_Y.length && mountains_size.length; i++) {
        //Atmosphere
        stroke(105, 80, 105);
        fill(80, 0, 100, );
        ellipse(mountains_X[i], mountains_Y[i], mountains_size[i] * 1.06);
        //Surface
        stroke(105, 80, 105);
        fill(140, 0, 80);
        ellipse(mountains_X[i], mountains_Y[i], mountains_size[i]);
    }
    //Bellow is a for loop for drawing the cloud (planet)
    for (var i = 0; i < clouds.length; i++) {
        //Planet 2 belt
        fill(140, 0, 80)
        stroke(255);
        strokeWeight(1);
        ellipse(clouds[i].cloud_X, clouds[i].cloud_Y, clouds[i].cloud_size, clouds[i].cloud_size * 0.2);
        ellipse(clouds[i].cloud_X, clouds[i].cloud_Y, clouds[i].cloud_size * 0.9336, clouds[i].cloud_size * 0.2);
        ellipse(clouds[i].cloud_X, clouds[i].cloud_Y, clouds[i].cloud_size * 0.8667, clouds[i].cloud_size * 0.2);
        ellipse(clouds[i].cloud_X, clouds[i].cloud_Y, clouds[i].cloud_size * 0.8, clouds[i].cloud_size * 0.2);
        ellipse(clouds[i].cloud_X, clouds[i].cloud_Y, clouds[i].cloud_size * 0.7335, clouds[i].cloud_size * 0.2);
        //Planet 2 Surface
        strokeWeight(5)
        stroke(80, 145, 205);
        fill(100, 130, 255);
        ellipse(clouds[i].cloud_X, clouds[i].cloud_Y, clouds[i].cloud_size * 0.6);
        endShape();
    }
    push()
    translate(-CameraPosX, 0)

    // begins moving the background elements relative to the character
    //below is a for loop that draws strees behind the hills
    for (var j = 0; j < trees.length; j++) {
        "Draw the Tree"
        //"Pylon" = Tree
        strokeWeight(0.5);
        stroke(0, 255, 0);
        fill(0);
        rect(trees[j].trees_X * trees[j].trees_size, trees[j].trees_Y + 143 * trees[j].trees_size, trees[j].trees_size * 30, trees[j].trees_size * 290);
        fill(0);
        ellipse((trees[j].trees_X + 15) * trees[j].trees_size, trees[j].trees_Y + 143 * trees[j].trees_size, trees[j].trees_size * 125);
        ellipse((trees[j].trees_X + 15) * trees[j].trees_size, trees[j].trees_Y + 143 * trees[j].trees_size, trees[j].trees_size * 115);
        fill(0, 255, 0);
        ellipse((trees[j].trees_X + 15) * trees[j].trees_size, trees[j].trees_Y + 143 * trees[j].trees_size, trees[j].trees_size * 25);
    }

    "Draw the Floor and canyons"
    //PLanet Surface
    //1
    for (i = 0; i < hills.length; i++) {
        beginShape()
        fill(0, 0, 40, 250);
        stroke(0, 255, 0, );
        strokeWeight(1);
        fill(0, 0, 0)
        //2
        ellipse(hills[i].x, hills[i].y, hills[i].w * 5, hills[i].h * 6);
        ellipse(hills[i].x, hills[i].y, hills[i].w * 4.7, hills[i].h * 5.7);
        ellipse(hills[i].x, hills[i].y, hills[i].w * 4.4, hills[i].h * 5.3);
        ellipse(hills[i].x, hills[i].y, hills[i].w * 4, hills[i].h * 4.9);
        endShape();
    }

    //Draw Walking Ground
    stroke(255, 255, 255, 50)
    fill(0);
    rect(-3 * width,
        floorPos_y,
        width * 6,
        height - floorPos_y);
    //The lines of code below draw the canyon
    for (var i = 0; i < canyons.length; i++) {
        noStroke()
        fill(50, 50, 100)
        rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y)
    }

    //Below is a for loop that draws trees in front of the hills
    for (var j = 0; j < trees2_X.length && trees2_Y.length && trees2_size.length; j++) {
        "Draw the Trees2"
        //"Pylon" = Tree
        strokeWeight(0.5);
        stroke(0, 255, 0);
        fill(0);
        rect(trees2_X[j] * trees2_size[j], trees2_Y[j] + 143 * trees2_size[j], trees2_size[j] * 30, trees2_size[j] * 290);
        fill(0);
        ellipse((trees2_X[j] + 15) * trees2_size[j], trees2_Y[j] + 143 * trees2_size[j], trees2_size[j] * 125);
        ellipse((trees2_X[j] + 15) * trees2_size[j], trees2_Y[j] + 143 * trees2_size[j], trees2_size[j] * 115);
        fill(0, 255, 0);
        ellipse((trees2_X[j] + 15) * trees2_size[j], trees2_Y[j] + 143 * trees2_size[j], trees2_size[j] * 25);
    }

    "Draw the Collectable"
    //if the player comes close with the collectable it disappears

    for (i = 0; i < collectables.length; i++) {
        if (collectables[i].isFound == false) {
            r = random(-2, 2);
            fill(255, 0, 0);
            rect(collectables[i].Pos_x,
                collectables[i].Pos_y - 6 + r,
                collectables[i].size * 0.5,
                collectables[i].size);
            fill(255, 255, 0);
            rect(collectables[i].Pos_x,
                collectables[i].Pos_y + r,
                collectables[i].size * 0.5,
                collectables[i].size);
        }

        if (dist(gameChar_x + 2 || gameChar_x - 10,
                gameChar_y + 5 || gameChar_y - 5,
                collectables[i].Pos_x + 5 || collectables[i].Pos_x - 5,
                collectables[i].Pos_y + 20 || collectables[i].Pos_y) < 40) {
            if (collectables[i].isFound == false) {
                pickupitem()
                scoreCounter = scoreCounter + collectables[i].score
            }
            collectables[i].isFound = true
        }
    }

    if (levelComplete == true) {
        fill(0)
        stroke(255, 215, 0)
        strokeWeight(4)
        textSize(84)
        text(levelCompletetext, gameChar_x + 90, 10, height / 4 + 50)
        console.log(levelComplete)
        strokeWeight(1)
    }
    if (flag.isReached) {
        levelComplete = true
        //Ship Flag(beam)
        noStroke()
        fill(random(200, 255),
            0,
            random(200, 255), )
        rect(flag.flagPos_X + 48,
            flag.flagPos_Y - 240,
            4,
            flag.beamLength);

    }
    endPoint()
    "RetroFilter"
    background(0, 255, 0, 8);

    //the game character
    "Draw the MovableGame Character"
    if (isLeft && isFalling) {
        // code below draws jumping left
        //LeftFacingInterior
        stroke(255);
        strokeWeight(0.7)
        fill(0)
        arc(gameChar_x,
            -60, 30, 8, -91.18, -18.8);
        strokeWeight(0.2)
        //Pilot
        fill(50);
        ellipse(gameChar_x + 1,
            gameChar_y - 61, 8, 12);
        fill(255);
        ellipse(gameChar_x - 1,
            gameChar_y - 62, 6, 8);
        //Viewport
        fill(0, 0, 0, 100);
        arc(gameChar_x,
            gameChar_y - 60, 30, 30, -91.18, -18.8);

        //P0DChasis
        fill(0);
        arc(gameChar_x,
            gameChar_y - 60, 30.5, 30, 150,
            PI);
        //HoverBeams
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 45, 5, 2);
        ellipse(gameChar_x + 3,
            gameChar_y - 39, 8, 3);
        ellipse(gameChar_x + 6,
            gameChar_y - 32, 15, 4);
        ellipse(gameChar_x + 10,
            gameChar_y - 22, 20, 5);
        fill(0)
        ellipse(gameChar_x + 3,
            gameChar_y - 39, 4, 1.5);
        ellipse(gameChar_x + 6,
            gameChar_y - 32, 7.5, 2);
        ellipse(gameChar_x + 10,
            gameChar_y - 22, 10, 2.5);
    } else if (isRight && isFalling) {
        // Code below draws jumping right
        //RightFacingInterior
        stroke(255);
        strokeWeight(0.7)
        fill(0)
        arc(gameChar_x,
            gameChar_y - 40, 30, 8, -91.18, -18.8);
        strokeWeight(0.2)
        //Pilot
        fill(50);
        ellipse(gameChar_x - 1,
            gameChar_y - 41, 8, 12);
        fill(255);
        ellipse(gameChar_x + 1,
            gameChar_y - 42, 6, 8);
        //Viewport
        fill(0, 0, 0, 100);
        arc(gameChar_x,
            gameChar_y - 40, 30, 30, -91.18, -18.8);
        //P0DChasis
        fill(0)
        arc(gameChar_x,
            gameChar_y - 40, 30.5, 30, 0,
            PI + QUARTER_PI * 1.3);
        //HoverBeams
        fill(255)
        ellipse(gameChar_x,
            gameChar_y - 25, 5, 2);
        ellipse(gameChar_x - 3,
            gameChar_y - 19, 8, 3);
        ellipse(gameChar_x - 6,
            gameChar_y - 12, 15, 4);
        ellipse(gameChar_x - 10,
            gameChar_y - 2, 20, 5);
        fill(0);
        ellipse(gameChar_x - 3,
            gameChar_y - 19, 4, 1.5);
        ellipse(gameChar_x - 6,
            gameChar_y - 12, 7.5, 1);
        ellipse(gameChar_x - 10,
            gameChar_y - 2, 10, 2.5);
    } else if (isLeft) {
        // Code below draws walking left
        stroke(255);
        strokeWeight(0.7)
        fill(0)
        arc(gameChar_x,
            gameChar_y - 30, 30, 8, -91.18, -18.8);
        strokeWeight(0.2)
        //Pilot
        fill(50);
        ellipse(gameChar_x + 1,
            gameChar_y - 30.5, 8, 12);
        fill(255);
        ellipse(gameChar_x - 1,
            gameChar_y - 31, 6, 8);
        //Viewport
        fill(0, 0, 0, 100);
        arc(gameChar_x,
            gameChar_y - 30, 30, 30, -91.18, -18.8);
        //P0DChasis
        fill(0);
        arc(gameChar_x,
            gameChar_y - 30, 30.5, 30, 150,
            PI);
        //HoverBeams
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 15, 6, 3);
        ellipse(gameChar_x + 5,
            gameChar_y - 10, 14, 3);
        fill(0);
        ellipse(gameChar_x + 5,
            gameChar_y - 10, 7, 1.5);
    } else if (isRight) {
        // Code Below draws walking right
        stroke(255);
        strokeWeight(0.7)
        fill(0)
        arc(gameChar_x,
            gameChar_y - 30, 30, 8, -91.18, -18.8);
        strokeWeight(0.2)
        //Pilot
        fill(50);
        ellipse(gameChar_x - 1,
            gameChar_y - 30.5, 8, 12);
        fill(255);
        ellipse(gameChar_x + 1,
            gameChar_y - 31, 6, 8);
        //Viewport
        fill(0, 0, 0, 100);
        arc(gameChar_x,
            gameChar_y - 30, 30, 30, -91.18, -18.8);
        //P0DChasis
        fill(0)
        arc(gameChar_x,
            gameChar_y - 30, 30.5, 30, 0,
            PI + QUARTER_PI * 1.3);
        //HoverBeams
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 15, 6, 3);
        ellipse(gameChar_x - 5,
            gameChar_y - 10, 14, 3);
        fill(0);
        ellipse(gameChar_x - 5,
            gameChar_y - 10, 7, 1.5);
    } else if (isFalling) {
        // Code below draws falling vertically
        //FrontFacingInterior
        stroke(255);
        strokeWeight(0.7);
        fill(0);
        arc(gameChar_x,
            gameChar_y - 39, 30, 21.8, -91.18, -18.8);
        //Pilot
        strokeWeight(0.2);
        fill(50);
        ellipse(gameChar_x,
            gameChar_y - 39.5, 13, 11);
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 34.5, 6, 3);
        ellipse(gameChar_x,
            gameChar_y - 40, 5.5, 7.5);
        //Viewport
        fill(0, 0, 0, 100);
        arc(gameChar_x,
            gameChar_y - 39, 30, 30, -91.18, -18.8);
        //P0DChasis
        fill(0);
        arc(gameChar_x,
            gameChar_y - 39, 30.5, 30, 0,
            PI);
        //HoverBeams
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 24, 5, 2);
        ellipse(gameChar_x,
            gameChar_y - 18, 8, 3);
        ellipse(gameChar_x,
            gameChar_y - 12, 15, 4);
        ellipse(gameChar_x,
            gameChar_y - 5, 20, 5);
        fill(0);
        ellipse(gameChar_x,
            gameChar_y - 18, 4, 1.5);
        ellipse(gameChar_x,
            gameChar_y - 12, 7.5, 2);
        ellipse(gameChar_x,
            gameChar_y - 5, 10, 2.5);
    } else {
        // Code below draws facing forwards
        stroke(255);
        strokeWeight(1);
        fill(0);
        arc(gameChar_x,
            gameChar_y - 30, 30, 21.8, -91.18, -18.8);
        strokeWeight(.5);
        //Pilot
        fill(50);
        ellipse(gameChar_x,
            gameChar_y - 30.5, 13, 11);
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 32.5, 6, 6);
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 32, 5.5, 7.5);
        //Viewport
        fill(0, 0, 0, 100);
        arc(gameChar_x,
            gameChar_y - 30, 30, 30, -91.18, -18.8);
        //P0DChasis
        fill(0);
        arc(gameChar_x,
            gameChar_y - 30, 30.5, 30, 0,
            PI);
        //HoverBeams
        fill(255);
        ellipse(gameChar_x,
            gameChar_y - 15, 6, 2);
        ellipse(gameChar_x,
            gameChar_y - 10, 14, 3);
        fill(0);
        ellipse(gameChar_x,
            gameChar_y - 10, 6, 1.5);
    }
    //RETURN TO THE TOP OF THE DRAW
    pop()


    //THE FOLLOWING CODE DRAWS THE UI FEATURES OF THE LIVES AND COLLECTIBLES
    stroke(255);
    strokeWeight(1);
    fill(0);
    arc(livesImgX,
        livesImgY - 30, 30, 21.8, -91.18, -18.8);
    strokeWeight(.5);
    //Pilot
    fill(50);
    ellipse(livesImgX,
        livesImgY - 30.5, 13, 11);
    fill(255);
    ellipse(livesImgX,
        livesImgY - 32.5, 6, 6);
    fill(255);
    ellipse(livesImgX,
        livesImgY - 32, 5.5, 7.5);
    //Viewport
    fill(0, 0, 0, 100);
    arc(livesImgX,
        livesImgY - 30, 30, 30, -91.18, -18.8);
    //P0DChasis
    fill(0);
    arc(livesImgX,
        livesImgY - 30, 30.5, 30, 0,
        PI);
    //HoverBeams
    fill(255);
    ellipse(livesImgX,
        livesImgY - 15, 6, 2);
    ellipse(livesImgX,
        livesImgY - 10, 14, 3);
    fill(0);
    ellipse(livesImgX,
        livesImgY - 10, 6, 1.5);
    //COLLECTABLES
    fill(255, 0, 0);
    rect(collectImgX,
        collectImgY - 6,
        collectImgS * 0.5,
        collectImgS);
    fill(255, 255, 0);
    rect(collectImgX,
        collectImgY,
        collectImgS * 0.5,
        collectImgS);

    //HERE DRAWS THE SCORE COUNTER
    fill(255)
    textSize(30)
    stroke(255, 215, 0)
    text(scoreCounter, 170, 85)
    text(lives, 75, 85)


    //Returns to to start state of draw
    //Canyon PHYSICS - if player moves over canyon they fall down
    if (gameOver == true) {
        fill(0)
        stroke(255, 0, 0)
        strokeWeight(4)
        textSize(84)
        text(gameOvertext, width / 2 - 480, width / 4 + 50)
        console.log(gameOver)
        strokeWeight(1)
    }
    for (i = 0; i < canyons.length; i++) {
        lifeLost = false
        if ((gameChar_x > canyons[i].x_pos && gameChar_y >= floorPos_y) &&
            (gameChar_x < canyons[i].x_pos + canyons[i].width && gameChar_y >= floorPos_y) && lives < 1) {
            canyons[i].isPlummeting = true
            isFalling = true
            isLeft = false
            isRight = false
            gameChar_y += 5
            gameOver = true
        }
        if ((gameChar_x > canyons[i].x_pos && gameChar_y >= floorPos_y) &&
            (gameChar_x < canyons[i].x_pos + canyons[i].width && gameChar_y >= floorPos_y) && lives > 0) {
            gameChar_y = floorPos_y
            gameChar_x = 300
            lives = lives - 1
            scoreCounter = 0
            lifeLost = true
            deathSound()
        }
    }
    //interaction physics - canyon and player movement
    //MOVE LEFT
    if (flag.isReached == false) {
        if (isLeft == true && gameChar_x > -178) {
            gameChar_x -= 3;

        }
        if (isLeft == true && isFalling == true && gameChar_x > -178) {
            gameChar_x -= 4

        }
        //MOVE RIGHT
        if (isRight == true && gameChar_x < 2060) {
            gameChar_x += 3;

        }
        if (isRight == true && isFalling == true && gameChar_x < 2060) {
            gameChar_x += 4;
        }
    }
    //JUMPING
    if (gameChar_y < floorPos_y && isFalling == true) {
        gameChar_y += 5;
        gameChar_y = gameChar_y - 1;

    }
    //GRAVITY
    else if (gameChar_y == floorPos_y) {
        isFalling = false;
    }

    RainFall()
}
//MOVEMENT CODE
function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed.
    // if player falls down canyon controls stop working
    //open up the console to see how these work
    //MOVE LEFT
    // HERE ALLOWS THE KEYPRESSED FUNCTION TO RESET THE GAME WORLD USING SETUP() IF EITHER END STATE IS REACHED 
    if ((levelComplete == true || gameOver == true) && key == 'r') {
        setup()
    }
    //HERE IS AN IF STATMENT THAT USES ISPLUMMETTING TO SET THE GAME OVER STATE AND ANIMATION
    if (canyons.isPlummeting == true && gameChar_y == canyons[i].height) {
        gameOver = true
        keyPressed = false
        gameChar_y -= 5
    }
    //HERE IS AN IF STATEMENT THAT INITIATES THE END STATE OF THE GAME IF THE FLAG IS REACHED
    if (flag.isReached == true) {
        levelComplete = true
        keyPressed = false
        isLeft = false
        isRight = false
    }
    console.log("keyPressed: " + key);

    for (i = 0; i < canyons.length; i++) {
        if (key == "a" && canyons[i].isPlummeting == false) {
            isLeft = true;
        }
        //MOVE RIGHT
        if (key == "d" && canyons[i].isPlummeting == false) {
            isRight = true;
        }
        //JUMP
        if (isFalling == false && key == "w" && canyons[i].isPlummeting == false) {
            gameChar_y -= 300;
            isFalling = true;
            movementSound()
        }
    }
}
function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released.
    console.log("keyReleased: " + key);
    //RELEASE LEFT
    if (key == "a") {
        isLeft = false;
    }
    //RELEASE RIGHT
    if (key == "d") {
        isRight = false;
    }
}