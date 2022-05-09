function start() {
    $("#start").hide();
    $("#gameBackground").append("<div id='player' class='animate1'></div>");
    $("#gameBackground").append("<div id='enemy1' class='animate2'></div>");
    $("#gameBackground").append("<div id='enemy2'></div>");
    $("#gameBackground").append("<div id='buddy' class='animate3'></div>");
    $("#gameBackground").append("<div id='healthbar'></div>");
    $("#gameBackground").append("<div id='scoreboard'></div>");
    
    var game = {}
    var gameOver = false;
    var health = 3;
    var score = 0;
    var savedBuddies = 0;
    var lostBuddies = 0;
    var canShoot = true;
    var speed = 5;
    var yAxis = parseInt(Math.random() * 334);
    var KEY = {
        up: 38,
        down: 40,
        shoot: 83
    }
    game.pressed = [];

    var shootingSound = document.getElementById("shootingSound");
    var explosionSound = document.getElementById("explosionSound");
    var music = document.getElementById("music");
    var gameOverSound = document.getElementById("gameOverSound");
    var lostBuddySound = document.getElementById("lostBuddySound");
    var savedBuddySound = document.getElementById("savedBuddySound")
    music.addEventListener("ended", function(){ music.currentTime = 0; music.play(); }, false);
    music.play();

    $(document).keydown(function(e){
        game.pressed[e.which] = true;
    });
    $(document).keyup(function(e){
        game.pressed[e.which] = false;
    });

    game.timer = setInterval(loop, 30);
    function loop() {
        healthbar();
        scoreboard();
        movesBackground();
        movesPlayer();
        movesEnemy1();
        movesEnemy2();
        movesBuddy();
        collision();
    }

    function movesBackground() {
        left = parseInt($("#gameBackground").css("background-position"));
        $("#gameBackground").css("background-position", left - 1);
    }

    function movesPlayer() {
        if (game.pressed[KEY.up]) {
            var top = parseInt($("#player").css("top"));
            if (top > 0) {
                $("#player").css("top", top - 15);
            }
        }
        
        if (game.pressed[KEY.down]) {
            var top = parseInt($("#player").css("top"));
            if (top < 434){
                $("#player").css("top", top + 15);
            }
        }
        
        if (game.pressed[KEY.shoot]) {
            shoot();	
        }
    }

    function movesEnemy1() {
        xAxis = parseInt($("#enemy1").css("left"));
        $("#enemy1").css("left", xAxis - speed);
        $("#enemy1").css("top", yAxis);
            
        if (xAxis <= -256) {
            yAxis = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 700 + 256);
            $("#enemy1").css("top", yAxis);
        }
    }

    function movesEnemy2() {
        xAxis = parseInt($("#enemy2").css("left"));
    	$("#enemy2").css("left", xAxis - speed * 0.8);
				
		if (xAxis <= 0) {
		$("#enemy2").css("left", 775);		
	    }
    }

    function movesBuddy() {
        xAxis = parseInt($("#buddy").css("left"));
        $("#buddy").css("left", xAxis + 1);
                
        if (xAxis > 906) {
        $("#buddy").css("left", 0);            
        }
    }

    function shoot() {
	
        if (canShoot == true) {
            shootingSound.play();
            canShoot = false;
            
            var top = parseInt($("#player").css("top"))
            xAxis = parseInt($("#player").css("left"))
            xShot = xAxis + 190;
            shotTop = top + 37;
            $("#gameBackground").append("<div id='shot'></div");
            $("#shot").css("top", shotTop);
            $("#shot").css("left", xShot);
            
            var shootTimer = window.setInterval(shoots, 30);
        }
     
        function shoots() {
            xAxis = parseInt($("#shot").css("left"));
            $("#shot").css("left", xAxis + 15); 
    
            if (xAxis > 900) {                
                window.clearInterval(shootTimer);
                shootTimer = null;
                $("#shot").remove();
                canShoot = true;            
            }
        }
    }

    function collision() {
        var collision1 = ($("#player").collision($("#enemy1")));
        var collision2 = ($("#player").collision($("#enemy2")));
        var collision3 = ($("#shot").collision($("#enemy1")));
        var collision4 = ($("#shot").collision($("#enemy2")));
        var collision5 = ($("#player").collision($("#buddy")));
        var collision6 = ($("#enemy2").collision($("#buddy")));
    
        if (collision1.length > 0) {
            health--;
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X, enemy1Y);
        
            yAxis = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", yAxis);
        }

        if (collision2.length > 0) {
            health--;
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X, enemy2Y);
                    
            $("#enemy2").remove();
            repositionEnemy2();
        }

        if (collision3.length > 0) {
            score += 100;
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
                
            explosion1(enemy1X, enemy1Y);
            $("#shot").css("left", 901);
                
            yAxis = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", yAxis);       
        }

        if (collision4.length > 0) {
            score += 50;
            speed *= 1.2;
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            $("#enemy2").remove();
        
            explosion2(enemy2X, enemy2Y);
            $("#shot").css("left",950);
    
            repositionEnemy2();        
        }

        if (collision5.length > 0) {
            savedBuddySound.play();
            savedBuddies++;	
            repositionBuddy();
            $("#buddy").remove();
        }

        if (collision6.length > 0) {
            lostBuddies++;
            buddyX = parseInt($("#buddy").css("left"));
            buddyY = parseInt($("#buddy").css("top"));
            
            explosion3(buddyX, buddyY);
            $("#buddy").remove();    
            repositionBuddy();            
        }
    }

    function explosion1(enemy1X, enemy1Y) {
        $("#gameBackground").append("<div id='explosion1'></div");
        $("#explosion1").css("background-image", "url(itens/imgs/explosao.png)");
        explosionSound.play();

        var div = $("#explosion1");
        div.css("top", enemy1Y);
        div.css("left", enemy1X);
        div.animate({width: 200, opacity: 0});
        
        var explosionTimer = window.setInterval(removeExplosion, 1000);
        
        function removeExplosion() {
            div.remove();
            window.clearInterval(explosionTimer);
            explosionTimer = null;
        }
    }

    function explosion2(enemy2X, enemy2Y) {
        $("#gameBackground").append("<div id='explosion2'></div");
        $("#explosion2").css("background-image", "url(itens/imgs/explosao.png)");
        explosionSound.play();

        var div2=$("#explosion2");
        div2.css("top", enemy2Y);
        div2.css("left", enemy2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var explosionTimer2 = window.setInterval(removeExplosion2, 1000);
        function removeExplosion2() {
            div2.remove();
            window.clearInterval(explosionTimer2);
            explosionTimer2 = null;
        }
    }

    function explosion3(buddyX, buddyY) {
        $("#gameBackground").append("<div id='explosion3' class='animate4'></div");
        $("#explosion3").css("top", buddyY);
        $("#explosion3").css("left", buddyX);
        lostBuddySound.play();

        var explosionTimer3 = window.setInterval(resetsExplosion3, 1000);
        function resetsExplosion3() {
            $("#explosion3").remove();
            window.clearInterval(explosionTimer3);
            explosionTimer3 = null;       
        }
    }

    function repositionEnemy2() {
        var collisionTimer4 = window.setInterval(reposition4, 5000);
        function reposition4() {
            window.clearInterval(collisionTimer4);
            collisionTimer4 = null;

            if (gameOver == false) {
                $("#gameBackground").append("<div id=enemy2></div");   
            }                
        }
    }

    function repositionBuddy() {
        var buddyTimer=window.setInterval(reposition6, 6000);

        function reposition6() {
            window.clearInterval(buddyTimer);
            buddyTimer = null;
            
            if (gameOver == false) {
            $("#gameBackground").append("<div id='buddy' class='animate3'></div>");
            }   
        }
    }

    function healthbar() {
	
		if (health == 3) {
			$("#healthbar").css("background-image", "url(itens/imgs/energia3.png)");
		}
	
		if (health == 2) {
			$("#healthbar").css("background-image", "url(itens/imgs/energia2.png)");
		}
	
		if (health == 1) {
			$("#healthbar").css("background-image", "url(itens/imgs/energia1.png)");
		}
	
		if (health == 0) {
			$("#healthbar").css("background-image", "url(itens/imgs/energia0.png)");
			defeat();
		}
	
	}

    function scoreboard() {
        $("#scoreboard").html("<h2> Score: " + score + "</h2>" +
        "<h2> Saved Buddies: " + savedBuddies + "</h2>" +
        "<h2> Lost Buddies: " + lostBuddies + "</h2>");
    }

    function defeat() {
        gameOver = true;
	    music.pause();
	    gameOverSound.play();
        
	    window.clearInterval(game.timer);
	    game.timer = null;
        
	    $("#player").remove();
	    $("#enemy1").remove();
	    $("#enemy2").remove();
	    $("#buddy").remove();
        
	    $("#gameBackground").append("<div id='end'></div>");
	    $("#end").html("<h1> GAME OVER </h1><h3>Final Score: " + score + "</h3>" + "<div id='reset' onClick='restartGame()'><h3>Play Again?</h3></div>");
    }
}

function restartGame() {
    gameOverSound.pause();
    $("#end").remove();
    start();
}