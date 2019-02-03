/*CREATED BY JUSTIN BATTAGLIA*/

function setup() {
    var cnv = createCanvas(windowWidth-100, windowHeight-120);
    /*drawingContext.shadowColor = '#444';
    drawingContext.shadowBlur = 20;
    drawingContext.fill();*/
    var cnvx = (windowWidth - width) / 2;
    var cnvy = (windowHeight - height) / 2;
    cnv.position(cnvx, cnvy);
    frameRate(-1);
    gameOver = false;

    //Main Character
    circle = new Circle(); 
    enemys = [];
    keys = [false, false, false, false]

    //Enemys
    numberOfBalls = 15;
    for (var i = 0; i < numberOfBalls; i++) {
        enemys.push(new Enemy());
    }
    checkEnemysSize = 0;
    highscore = 0;
    theHighscore = document.getElementById("highscore").innerHTML= "Highscore: " + highscore;
    reset = true;
    SPEED = 3;   
    /*setInterval(
        function() {
            checkScore = document.getElementById("score").innerHTML;
            checkScoreArray = [].slice.call(checkScore);
            if (checkScoreArray[7,checkScoreArray.length-1]+10 < this.score) {
                console.log('No Cheating fam')
                circle.UpdateScore(-this.score);
            }
            
            }, 100);*/
}

function draw() {
    score = circle.UpdateScore();
    document.getElementById("score").innerHTML = "Score: " + score;
    if (score % 50 == 0 && score != 0 && reset) {
        circle.size[0] = 30;
        circle.size[1] = 30;
        for (var p = 0; p < enemys.length; p++) {
            enemys[p].reset(circle.size[0]);  
            enemys[p].xspeed = enemys[p].xspeed * 1.075;
            enemys[p].yspeed = enemys[p].yspeed * 1.075;
        }
        SPEED+=.4;
        reset = false;
    }
    if (score % 50 != 0) {
        reset = true;
    }
    background(51);

//**************************************** ENEMY CHARACTER (CIRCLE) *****************************************//
//**************************************** ENEMY CHARACTER (CIRCLE) *****************************************//
    var enemyBoundryCollision = false;

    for (var j = 0; j < enemys.length; j++) {
        enemys[j].show("#FF0000");
        enemys[j].diameter = enemys[j].size[0]
        enemys[j].update();
        if (enemys[j].boundryCollide("rw")) {
            enemys[j].x = 0;
            enemys[j].y = enemys[j].y;
        } if (enemys[j].boundryCollide("lw")) {

            enemys[j].x = width;
            enemys[j].y = enemys[j].y;
        } if (enemys[j].boundryCollide("bw")) {

            enemys[j].x = enemys[j].x;
            enemys[j].y = 0;
        } if (enemys[j].boundryCollide("tw")) {

            enemys[j].x = enemys[j].x;
            enemys[j].y = height;
        }
        if (circle.collidesWith(enemys[j])) {
            if (enemys[j].size[0] <= circle.size[0] && enemys[j].size[1] <= circle.size[1]) {
                var sizeIncrease = (2)
                enemys[j].reset(circle.size[0]);
                circle.size[0] += (sizeIncrease);
                circle.size[1] += (sizeIncrease);
                score = circle.UpdateScore(1);
                enemys[j].xspeed = random(-4,4);
                enemys[j].yspeed = random(-2,4);

            } else {
                gameOver = true;
                if (gameOver) {
                    if (score > highscore) {
                        highscore = score;
                        theHighscore = document.getElementById("highscore").innerHTML= "Highscore: " + highscore;
                    }
                }
            }
        }
        if (enemys[j].size[0]  >= circle.size[0]) {
            checkEnemysSize += 1;
        }
        if (checkEnemysSize >= numberOfBalls) {
            var x1 = int(random(0,numberOfBalls));
            enemys[x1].size[0] = circle.size[0]/2;
            enemys[x1].size[1] = circle.size[0]/2;

            var x2 = int(random(0,numberOfBalls));
            enemys[x2].size[0] = circle.size[0]/2;
            enemys[x2].size[1] = circle.size[0]/2;
        }
    }
    checkEnemysSize = 0;
//**************************************** MAIN CHARACTER (CIRCLE) *****************************************//
//**************************************** MAIN CHARACTER (CIRCLE) *****************************************//

    circle.show();
    circle.update();

    if (changeRed == true) {
        circle.show("#FF0000");
    } else {
        circle.show();
    }


// *********************** KEY PRESSED *************************//       
    // ****** DOWN AND LEFT/RIGHT ****** //
    //DOWN AND RIGHT
    if (keys[1] && keys[0]) { 
        circle.dir(SPEED, SPEED); 
    }

    //DOWN AND LEFT
    if (keys[1] && keys[2]) { 
        circle.dir(-SPEED, SPEED); 
    }


    // ****** UP AND LEFT/RIGHT ****** //
    // ****** UP AND RIGHT
    if (keys[3] && keys[0]) { 
        circle.dir(SPEED, -SPEED); 
    }

    //UP AND LEFT
    if (keys[3] && keys[2]) { 
        circle.dir(-SPEED, -SPEED); 
    }  


// *********************** KEY RELEASED *************************//     
    // ****** DOWN ****** //
    if (keys[1] && keys[0] == false && keys[2] == false && keys[3] == false) { 
        circle.dir(0, SPEED); 
    }

    // ****** UP ****** //
    if (keys[3] && keys[0] == false && keys[2] == false && keys[1] == false) { 
        circle.dir(0, -SPEED); 
    }

    // ****** RIGHT ****** //
    if (keys[0] && keys[3] == false && keys[2] == false && keys[1] == false) { 
        circle.dir(SPEED, 0); 
    }

    // ****** LEFT ****** //
    if (keys[2] && keys[0] == false && keys[3] == false && keys[1] == false) { 
        circle.dir(-SPEED, 0); 
    }

    if (gameOver) {
        background(51);
        for (var w = 0; w < enemys.length; w++) {
            enemys[w].xspeed = 0;
            enemys[w].yspeed = 0;
            circle.xspeed = 0;
            circle.yspeed = 0;
        }
        fill(255,255,255);
        //textFont()
        textSize(100);
        text("GAME OVER", width/3.5, height/1.75);
        score = circle.UpdateScore(-score);
        var playAgainBtn = document.getElementById("playAgain");
        playAgainBtn.onclick = function () {
            score = circle.UpdateScore(-score);
            circle.x = width/2;
            circle.y = height/2;
            circle.xspeed = 0;
            circle.yspeed = 0;
            circle.size = [30,30]
            for (w = 0; w < enemys.length; w++) {
                enemys[w].reset(circle.size[0]);
                enemys[w].xspeed = random(-4,4);
                enemys[w].yspeed = random(-2,4);
            }
            background(51);
            SPEED = 3;
            gameOver = false;
        }
    }
}

function keyPressed() {  
    if (keyCode === 39) {
        //RIGHT 0
        circle.dir(SPEED, 0);
        keys[0] = true;
    } 
    if (keyCode === 40) {
        //DOWN 1
        circle.dir(0, SPEED);
        keys[1] = true;
    }
    if (keyCode === 37) {
        //LEFT 2
        circle.dir(-SPEED, 0);
        keys[2] = true;
    }
    if (keyCode === 38) {
        //UP 3
        circle.dir(0, -SPEED);
        keys[3] = true;
    }
}                 

function keyReleased() {
    if (keyCode === 39) {
        //RIGHT
        keys[0] = false;
    } if (keyCode === 40) {
        //DOWN
         keys[1] = false;
    } if (keyCode === 37) {
        //LEFT
         keys[2] = false;
    } if (keyCode === 38) {
        //UP
         keys[3] = false;
    }


    if (keys[0] == false) {
        //RIGHT
        circle.dir(0, 0); 
    } if (keys[1] == false) {
        //DOWN
        circle.dir(0, 0); 
    } if (keys[2] == false) {
        //LEFT
        circle.dir(0, 0); 
    } if (keys[3] == false) {
        //UP
        circle.dir(0, 0); 
    }
}

function Circle() {
    this.x = width/2;
    this.y = height/2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.size = [30,30]
    this.score = 0;
    changeRed = false;

    this.UpdateScore = function (addToScore=0) {
        this.score += addToScore;
        return this.score;
    }

    this.update = function() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        //Both Edges border detection  
        //BOTTOM
        if (((this.x + (this.size[0]/2)) > width) && ((this.y + (this.size[1]/2)) > height)) {
            this.x = (width - (this.size[0]/2));
            this.y = (height - (this.size[1]/2));
//                        changeRed = true;
//                        this.score -= 1;
        }
        else if (((this.x - (this.size[0]/2)) < 0) && ((this.y + (this.size[1]/2)) > height)) {
            this.x = (0 + (this.size[0]/2));
            this.y = (height - (this.size[1]/2));   
//                        changeRed = true;
//                        this.score -= 1; 
        }  
        //TOP
        else if (((this.x + (this.size[0]/2)) > width) && ((this.y - (this.size[1]/2)) < 0)) {
            this.x = (width - (this.size[0]/2));
            this.y = (0 + (this.size[1]/2));
//                        changeRed = true;
//                        this.score -= 1; 
        } 
        else if (((this.x - (this.size[0]/2)) < 0) && ((this.y - (this.size[1]/2)) < 0)) {
            this.x = (0 + (this.size[0]/2));
            this.y = (0 + (this.size[1]/2));
//                        changeRed = true;
//                        this.score -= 1; 
        } 

        //Edges border detection 
        else if ((this.x + (this.size[0]/2)) > width) {
            this.x = (width - (this.size[0]/2));
//                        changeRed = true;
//                        this.score -= 1;
        } 
        else if ((this.x - (this.size[0]/2)) < 0) {
            this.x = (0 + (this.size[0]/2));
//                        changeRed = true;
//                        this.score -= 1;
        } 
        else if ((this.y + (this.size[1]/2)) > height) {
            this.y = (height - (this.size[1]/2));
//                        changeRed = true;
//                        this.score -= 1;
        } 
        else if ((this.y - (this.size[1]/2)) < 0) {
            this.y = (0 + (this.size[1]/2));
//                        changeRed = true;
//                        this.score -= 1;
        } 
        else {
            changeRed = false;
        }
    }

    this.show = function(fillColor = "#FFFFDD") {
        fill(fillColor)
        stroke(fillColor);
        ellipse(this.x, this.y, this.size[0], this.size[1]);

    }

    this.collidesWith = function (other) {
        this.diameter = circle.size[0];
        var x = other.x - this.x;
        var y = other.y - this.y;
        var distance = sqrt(x*x + y*y)-((other.diameter/2)+(this.diameter/2));
        if (distance <= 0) {
            return true;
        }


    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
}

function Enemy() {
    this.randomVal = random(0.5, 2);
    var yList = [(height-random(0,200)), (height+random(0,200))];
    var indexY = int(random(yList.length));
    this.x = random(0,width);
    this.y = yList[indexY];
    this.xspeed = random(-4,4);
    this.yspeed = random(-2,4);
    this.size = [30*this.randomVal,30*this.randomVal];
    this.diameter;
    var colorList = ["#0DFF96","#0C37E8","#FF00EA","#E8640C","#008080","#FBC02D", "#E91E63"];
    var pickColor = int(random(0,colorList.length));


    this.show = function() {
        fill(colorList[pickColor]);
        stroke(colorList[pickColor]);
        ellipse(this.x, this.y, this.size[0], this.size[1]);

    }

    this.update = function() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    this.boundryCollide = function(sideCollided) {
        if (sideCollided == "rw") {
            if ((this.x - (this.size[0]/2)) > width) {
                return true;
            } 
        }
        else if (sideCollided == "bw") {
            if ((this.y - (this.size[1]/2)) > height) {
            return true;
            }
        }
        else if (sideCollided == "tw") {
            if ((this.y + (this.size[1]/2)) < 0) {
                return true;
            }
        }
        else {
            if ((this.x + (this.size[0]/2)) < 0) {
                return true;
            }
        }
    }

    this.collidesWith = function (other) {
        this.diameter = circle.size[0];
        var x = other.x - this.x;
        var y = other.y - this.y;
        var distance = sqrt(x*x + y*y)-((other.diameter/2)+(this.diameter/2));
        if (distance <= 0) {
            return true;
        }
    }

    this.reset = function(circleSize) {
        var randomCircleSize = random(8,(circleSize*1.5))
        var yList = [(this.diameter*2),(height-(this.diameter*2))];
        var indexY= int(random(yList.length));
        this.x = random((this.diameter*2),(width-(this.diameter*2)));
        this.y = indexY;
        this.size = [randomCircleSize,randomCircleSize];
        this.radius = this.size[0]/2;
    }
}

function windowResized() {
    resizeCanvas(windowWidth-100, windowHeight-120);
}
