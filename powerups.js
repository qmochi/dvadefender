function spawnPowerup(origin, type) {
	powerup = createSprite(origin.position.x, origin.position.y);
	powerup.powerupType = type;
	if (powerup.powerupType == "boosterz") {
		powerup.addImage(boosterIcon);
	} else if (powerup.powerupType == "missilez") {
		powerup.addImage(missileIcon);
	} else if (powerup.powerupType == "ultz") {
		powerup.addImage(ultIcon);
	} else if (powerup.powerupType == "dm") {
		powerup.addImage(defenseIcon);
	}
	powerup.setCollider("circle", 0, 0, 100);
	powerup.scale = 0.5;
	powerup.setSpeed(random(1, 5), random(120, 240));
	powerup.addToGroup(powerups);

	shing.setVolume(3.0);
	shing.play();
}

function boosters() { // starts when boosters activated
	boosting = true;
	invincible = true;
	boostDuration += 2000;
	boostOff = setTimeout(boosterEnd, boostDuration);
	iPeriod = setTimeout(invuln, boostDuration + 1000);
	
	boostSound.play();
	voiceline(speedup);
}

function boosterEnd() {
	boosting = false;
	boostDuration = 0;
	clearTimeout(boostOff);
}

function startMissiles() {
	rng = random(10);
	if (rng >= 5) {
		voiceline(powerupV);
	}
	missileSound.setVolume(0.5);
	missileSound.play();
	windup = setTimeout(rdyMissiles, 500);
	missilesFired += 18;
}

function rdyMissiles() {
	clearTimeout(windup);
	firing = setInterval(fireMissiles, 76);
}

function fireMissiles() {
	if (leftGun) {
		offsetX = -10;
		offsetY = -30;
	} else {
		offsetX = 40;
		offsetY = -40;
	}

	if (!dead && missilesFired > 0) {
		missile = createSprite(playerX + offsetX, playerY + offsetY);
		missile.draw = function() {
			fill(dvaGreen);
			ellipse(0, 0, 20, 20);
		};
		missile.setCollider("circle", 0, 0, 20);
		missile.velocity.x = laserSpd * 0.5;
		missile.velocity.y = random(-2, 2);
		missile.addToGroup(missiles);
		missilesFired--;
		leftGun = !leftGun;
	} else {
		clearInterval(firing);
	}
}

function missileHit(target, dmg) {	// enemy hit by laser
	hit(target, dmg);
	explode(target, 0.25, 3);
}

function startDM() {
	matrix = true;
	matrixDuration += 5000;
	end = setTimeout(endDM, matrixDuration);
	
	// sound effects
	dmStart.play();
	if (!dmPlay.isPlaying()) {
		dmPlay.loop();
	}
}

function dMatrix() {
	if (dms.length <= 5) {
	for (i = 0; i < 1.5*spr.width*spr.scale; i += 120*spr.scale) {
		shield = createSprite(playerX + 30 + i, playerY - 40, random(6), i += random(10));
		shield.shapeColor = color(random(160, 200), random(20, 80), 100, random(0.2, 0.8));
		shield.addToGroup(dms);
		shield.life = 2;
	}
	}
	del = setInterval(function() {
		dms.remove(shield);
	}, 2);
}

function dmEat(target) {
	beam = createSprite(playerX, playerY - 30);
	beam.draw = function() {
		colorMode(HSB);
		strokeWeight(lasWidth * 2);
		stroke(random(160, 200), random(20, 60), 100);
		line(0, 0, target.position.x - playerX, target.position.y - playerY);
	}
	beam.life = 2;
	voiceline(eat);
	score += 2;
}

function endDM() {
	matrix = false;
	clearInterval(end);
	clearInterval(del);
	dms.removeSprites();
	
	if (dmPlay.isPlaying()) {
		dmPlay.stop();
		if (!dmEnd.isPlaying()) {
			dmEnd.play();
		}
	}
}

function ultCountdown() {
	ulti.play(); // nerf this
	ultStart.play(); // sound effect
	ulting = true;
	invincible = true;
	countdown = setTimeout(ult, 3000);
}

function ult() {
	ultExplode.play();
	clearTimeout(countdown);
	nukeX = playerX;
	nukeY = playerY;
	ulting = false;
	nukeExpand();
}

function nukeExpand() {
	if (nukeRadius < width * 2) {
		nuke = createSprite(nukeX, nukeY, nukeRadius, nukeRadius);
		nuke.draw = function() {
			colorMode(HSB);
			strokeWeight(nukeRadius / 8);
			stroke(dvaGreen);
			fill(0, 0, 100, 0.8);
			ellipse(0, 0, nukeRadius);
		};
		nuke.depth = -1;
		nuke.addToGroup(ultsplosions);
		nukeRadius *= 1.1;

		// ultimate explosion hits enemy
		badguys.bounce(ultsplosions, function() {
			hit(this, this.eHP);
		});
		bullets.overlap(ultsplosions, function() {
			cleanup(this);
		});
		
		exploding = setTimeout(nukeExpand, 10);
	} else {
		nuke.remove();
		ultsplosions.removeSprites();
		nukeRadius = 50;
		invincible = false;
		clearTimeout(exploding);
	}
}