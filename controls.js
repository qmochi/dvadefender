function controlDva() {
	playerX = spr.position.x;	// always update player location
	playerY = spr.position.y;
	
	push();
	rectMode(CENTER);
	spr.setCollider("rectangle",50*spr.scale, -20 * spr.scale, spr.width*0.18*spr.scale, spr.height*0.18*spr.scale);
	// view player's hitbox
	// rect(playerX + 50*spr.scale, playerY - 20 * spr.scale, spr.width*0.18*spr.scale, spr.height*0.18*spr.scale);
	pop();
	
	if (!dead) {
		movement();	// WASD to move
		
		if (boosting) {	// effects while boosting
			boost = 6;	// increase speed
		} else boost = 1;
		
		if (mouseIsPressed && mouseButton === LEFT && firerate <= 0) { // L click to shoot
			shoot();
		} else firerate -= 1;	// ghetto timer for cooldown in between shots
		
		if (matrix) {
			dMatrix();
		}
		
		// sprite shakes while ulting
		if (ulting) {
			spr.rotation = random(-5, 5);
		} else spr.rotation = 0;
	}
	
	// sprite flickers when hurt
	if (flickering) {
		spr.visible = false;
	} else spr.visible = true;
}

function shoot() {
	if (leftGun) {
		laserOffsetX = 50;
	} else laserOffsetX = 115;	// offset origin of laser for alternating gun barrels
	
	for (let i = 0; i < 5; i++) {
		let spread = 6;
		laserSpd = width/20;
		lazer = createSprite(playerX + laserOffsetX, playerY + 20, random(100,200), lasWidth);
		lazer.shapeColor = color(160, 75, 100);
		lazer.setSpeed(laserSpd, random(-spread, spread));
		lazer.rotateToDirection = true;
		lazs.add(lazer);
	}
	shootSound.setVolume(0.5);
	shootSound.rate(random(0.8, 1.2));
	shootSound.play();
	muzzleflash(lazer.position.x, lazer.position.y);	// show muzzle flash sprite at (x, y);
	firerate = 10;
	leftGun = !leftGun;	// alternate guns/arms while firing
}

function muzzleflash(muzX, muzY) {
	flashSpr = createSprite(muzX, muzY);
	flashSpr.addImage(flash);
	flashSpr.scale = 0.5;
	flashSz = random(1.2, 2.1);
	flashSpr.life = 8;
	flashGrow = setInterval(flashExpand, 5);
}

function flashExpand() {
	if (flashSpr.scale <= flashSz) {
		flashSpr.scale += 0.1;
	} else {
		flashSpr.remove();
		clearInterval(flashGrow);
	}
}

function movement() {	// movement via WASD keys
	if (left) {
		spr.position.x -= (moveSpeed + boost);
	}
	if (right) {
		spr.position.x += (moveSpeed + boost);
	}
	if (up) {
		spr.position.y -= (moveSpeed * 1.25 + boost);
	}
	if (down) {
		spr.position.y += (moveSpeed * 1.25 + boost);
	}
	if (boosting) {
		spr.position.x += 2;
	}
}

function keyPressed() {
	if (key === "a" || key === "A") {
		left = true;
	}
	if (key == "d" || key === "D") {
		right = true;
	}
	if (key === "w" || key === "W") {
		up = true;
	}
	if (key == "s" || key === "S") {
		down = true;
	}
	if (key === "v" || key === "V") {
		voiceline(hello);
	}
	if (keyCode === 32) {	// Space to start game
		if (!gameStarted) {
			gameStarted = true;
		}
	}
	if (key === "n" || key === "N") {
		if (dead && lives <= 0) {
			newGame(maxLives);
		}
	}
	
	// dev testing controls
	if (key === "r" || key === "R") {
		let fps = int(frameRate()); 
		print(fps + " fps; " + badguys.length + " enemies, " + lazs.length + " lasers, " + bullets.length + " bullets, " + powerups.length + " powerups");
	}
	if (keyCode === 16) {
		boosters();
	}
	if (key === "q" || key === "Q") {
		if (!ulting) {
			ultCountdown();
		}
	}
	if (key === "e" || key === "E") {
		startMissiles();
	}
	if (key === "x" || key === "X") {
		startDM();
	}
	if (key === "k" || key === "K") {
		damage(200);
	}
}

function keyReleased() {
	if (key === "a" || key === "A") {
		left = false;
	}
	if (key == "d" || key === "D") {
		right = false;
	}
	if (key === "w" || key === "W") {
		up = false;
	}
	if (key == "s" || key === "S") {
		down = false;
	}
}