/* TO DO

- BOSS FIGHT
- add levels/checkpoints
		- scaling difficulty? (increased # of bullets, enemies, etc.)
- more varied enemy traits
		- complex movement patterns, bulletproof
- finish Defeat screen; medals?
- add music

BUGS:
- some powerups are unable to be picked up
- powerups are spawning more than once at a time

*/

let gameStarted = false;

// player
let spr; // variable for player sprite
let flash; // viarable for muzzle flash sprite
let playerX, playerY;	// shortcut names for player sprite
let hp;	// current health
let maxHP = 600;
let lives;	// current lives
let maxLives = 3;
let bumpDamage = 100; // damage taken from enemies
let invincible = false; // bool invulnerability state
let flickering = false; // bool for sprite flickering when hit
let dead = false;	// bool for if player is currently dead

// stats/scoring
let score; // current score
let kills;	// current kills
let totalKills;	//	total kills
let currentKills; //	kills from current life
let killPoints = 25; // points gained for killing enemy
let totalDamage;

// movement
let left, right, up, down; // booleans for movement direction
let border = 20; // how close to edges of screen player sprite can move
let moveSpeed = 8;	// base movement speed
let boost;	// added speed while boosting

// shooting
let shooting = false;
let firerate = 15;	// # of frames between shots while firing
let lazs;	// group of Laser sprites
let lasWidth = 2; // width of lasers
let laserSpd;
let laserDamage = 3;
let leftGun = false;
let flashSz; // muzzle flash size

// abilities
let boosting = false;	// bool for boosting state (i.e. speed boost, bumping into enemies)
let boostDuration = 0; // duration of boost (ms)
let boostDamage = 50;	// damage dealt to enemies while boosting
let missilesFired = 0;
let matrix = false;
let matrixDuration = 0;
let eaten = 0;
let powerupType;
let ulting = false;
let nuke; // variable for Ultimate
let nukeRadius = 50; // initial ult explosion radius before expanding
let nukeX, nukeY; // origin point of explosion

// enemies
let maxEnemies = 8;
let eHP; // enemy's HP
let eType;
let bashed; // bool for if already been boosted into
let shotsFired; // number of bullets current enemy has fired
let maxShots; // max bullets a single enemy can fire
let maxBullets = 10; // max bullets onscreen at a time
let canShoot;

// misc
let rng;	// used for randomization	
let textCol, dvaGreen;	// color variables
let flickT, iframes, iPeriod, end, boostOff, del; // interval timers
let message = false; // bool whether or not to display HUD messages
let stars = [];	// array of background star particles
let maxStars = 60;	// maximum # of star particles onscreen at a time
let bldg;
let buildings = [];
let maxBuildings = 5;
let embers = [];
let sz, rise, shrink, green, blue, gap, greening;	// variables used in particles
let theScale;
let junk = [];
let bound = 200; // how far past the edge of screen the invisible deleting walls are
let seconds, seconds2, minutes;	// total time spent ingame

function preload() {
	assets();	// sounds, sprites, and fonts
}

function setup() {
	createCanvas(windowWidth, windowWidth/1.78);
	colorMode(HSB);
	rectMode(CENTER);
	textAlign(CENTER);
	textFont(myFont);
	
	red = random(255);
	green = random(0, 120);
	blue = random(180, 255);
	gap = random(10, 50);
	
	if (green >= 60) {
		greening = false;
	} else greening = true;
	
	lazs = new Group();	// lasers
	badguys = new Group(); // group of enemies
	bullets = new Group(); // enemy bullets
	missiles = new Group();
	dms = new Group(); // defense matrix beams
	powerups = new Group();	// powerup sprites
	ultsplosions = new Group(); // explosions
	walls = new Group(); // invisible walls that delete junk
	
	// arrays of sound/voice clips
	hello = [hi1, hi2, hi3, hi4];
	speedup = [boost1, boost2, boost3];
	powerupV = [dmg1, dmg2, dmg3];
	eat = [eat1, eat2];
	hitV = [hit1, hit2, hit3, hit4, hit5];
	hurt = [hurt1, hurt2, hurt3, hurt4];
	kill = [kill1, kill2];
	fall = [die1, die2];
	respawned = [rez1, rez2, rez3, rez4, rez5, rez6];
	
	// setup invisible walls
	wall = createSprite(-bound, height/2, bound, height + bound);	// left
	wall2 = createSprite(width + bound*2, height/2, bound, height + bound); // right
	wall3 = createSprite(width/2, -bound, width, bound);		// up
	wall4 = createSprite(width/2, height + bound, width, bound);	// down
	wall.addToGroup(walls);
	wall2.addToGroup(walls);
	wall3.addToGroup(walls);
	wall4.addToGroup(walls);
	
	junk = [lazs, badguys, bullets, missiles, powerups];	// groups to be deleted when offscreen

	newGame(maxLives);	// # of lives; maxLives = 3;
}

function newGame(hearts) {	// clean slate whenever new game is started, includes generating player
	score = 0;
	totalKills = 0;
	totalDamage = 0;
	totalEats = 0;
	seconds = 0;
	seconds2 = 0;
	minutes = 0;
	if (hearts <= 0) {
		hearts = 1;
	}
	lives = hearts;
	kills = totalKills;
	for (i = 0; i < junk.length; i++) {
		junk[i].removeSprites();
		junk[i].splice(i, 1);
	}
	spawn();
	time = setInterval(timer, 1000);
}

function spawn() { // create player sprite, whether from new game or respawning
	spr = createSprite(width / 6, height / 2);
	spr.addImage(dvaSprite);
	theScale = map(windowHeight, 0, height, 0, 1);
	spr.scale = 1 / theScale;
	spr.depth = 1;
	hp = maxHP;
	kills = 0;
	ulting = false;
	endDM();
	boosterEnd();
	
	if (dead) {	// flickering sprite + iframes when respawned
		dead = false;
		voiceline(respawned);
	} else voiceline(hello);
}

function respawn() {
	clearTimeout(respawn);
	spawn();
	damage(0);
}

function draw() {
	gradient(80);	// found in particles.js; parameter is # of px between gradient steps. default gap = random(20, 50);
	buildingBG(bldg);
	starBG(maxStars);	// scrolling star background, max (n) stars on screen;
	fireParticle();
	drawSprites();
	controlDva(); 
	
	// run collision check function for all "junk" sprites
	for (let i = 0; i < junk.length; i++) {
		collisions(junk[i]);
	}
	
	// sprites move past faster when boosting
	if (boosting) {
		for (i = 0; i < badguys.length; i++) {
		badguys[i].addSpeed(1, 180);
		}
		for (i = 0; i < bullets.length; i++) {
			bullets[i].addSpeed(1, 180);
		}
	}
	
	// get rid of nuke sprites
	for (let i = 0; i < ultsplosions.length; i++) {
		ultsplosions[i].remove();
	}
	
	// flame particle system
	if (ulting) {
		fireParticle(playerX, playerY, 80);
	}
	if (boosting) {
		fireParticle(playerX - 70, playerY - 30, 30);
	}
	for (let i = 0; i < missiles.length; i++) {
		fireParticle(missiles[i].position.x, missiles[i].position.y, 30);
	}
	
	if (!gameStarted) {
		title();	// gui.js
	} else {
		game();
	}
}

function game() {	// draw HUD, spawn enemies
	hud();	// found in gui.js
	
	bldg = maxBuildings;
	if (badguys.length < maxEnemies && nukeRadius <= 200 && missilesFired == 0) {
		rng = random(10);
		if (rng > 8) {
			spawnEnemies(eradicator);
		} else if (rng > 5 && rng < 8) {
			spawnEnemies(splicer);
		} else spawnEnemies(nullmari);
	}
}

function spawnEnemies(type) {
	// this will spawn enemies anywhere offscreen past the top, right, or bottom edges of the screen
	let spawnX;
	let spawnY = random(-bound, height+bound);
	if (spawnY < 0 && spawnY > height) {
		spawnX = random(width);
	} else {
		spawnX = width+bound;
  }	

	enemy = createSprite(spawnX, spawnY);
	enemy.eType = type;
	enemy.addImage(type);
	
	enemy.depth = -2;
	enemy.scale = random(0.8, 1) / theScale;
	if (type !== eradicator) {
		enemy.scale *= 0.7;
	}
	if (type == eradicator) {
		enemy.eHP = 130;
		enemy.velocity.x = random(-3, -1) / theScale;
		enemy.velocity.y = random(-0.5, 0.5) / theScale;
		enemy.flashSpr = (flasheradicator);
		enemy.canShoot = true;
	} else if (type == splicer) {
		enemy.eHP = 80;
		enemy.velocity.x = random(-8, -4) / theScale;
		enemy.velocity.y = 0;
		enemy.flashSpr = (flashsplicer);
		enemy.canShoot = true;
	} else if (type == nullmari) {
		enemy.eHP = 50;
		enemy.velocity.x = random(-4, -2) / theScale;
		enemy.velocity.y = random(-1, 1) / theScale;
		enemy.flashSpr = (flashnullmari);
		enemy.canShoot = false;
	}
	enemy.setCollider("circle", 0, 0, enemy.width/3);
	enemy.shotsFired = 0;
	enemy.maxShots = 5;
	enemy.addToGroup(badguys);
	
	// check if enemy can shoot
	if (enemy.canShoot && !dead && !boosting && nukeRadius <= 50) {
		roll = setInterval(function() {
			shootCheck(enemy);
			}, 1000);
	}
}

function shootCheck(e) {
	rng = int(random(100));
	if (rng < 20) {
		clearInterval(roll);
		enemyShoot(e);
	}
}

function enemyShoot(e) {
	if (bullets.length < maxBullets && !boosting && !dead && nukeRadius <= 50) {
		refire = setInterval(function(){ 
			enemy.canShoot = true;
			enemyBullet(playerY);
		}, 1000);
	}
}

function enemyBullet(targ) {
	if (enemy.shotsFired < enemy.maxShots && !boosting && !dead && nukeRadius <= 50) {
		let diam = 25/theScale;
		bullet = createSprite(enemy.position.x, enemy.position.y);
		bullet.draw = function() {
			colorMode(HSB);
			fill(random(360), 100, 100);
			ellipse(0, 0, diam * 1.8);
			fill(0, 0, 100, 0.8);
			ellipse(0, 0, diam);
		}
		bullet.setCollider("circle", 0, 0, diam*0.9);
		bullet.velocity.x = -laserSpd * 0.15;
		bullet.velocity.y = (targ - bullet.position.y) * random(0, 0.01);
		bullet.addToGroup(bullets);
		enemy.shotsFired++;
		enemy.canShoot = false;
	} else {
		clearInterval(refire);
		enemy.shotsFired = 0;
	}
}

function hit(target, dmg) {	// enemy hit by laser
	target.eHP -= dmg;
	totalDamage += dmg;
	
	if (dmg > 0) {
		enemyFlash(target);	// sprite flashes white
		hitmarker.setVolume(0.5); // play sound
		if (!hitmarker.isPlaying()) {
			hitmarker.play();
		}
	}
	
	if (target.eHP < dmg) {	// remove enemy if killed
		killEnemy(target, killPoints);
	}
}

function enemyFlash(target) {
	whitey = createSprite(target.position.x, target.position.y, target.width/theScale, target.height/theScale);
	whitey.addImage(target.flashSpr);
	whitey.scale = target.scale;
	whitey.velocity.x = target.velocity.x;
	whitey.velocity.y = target.velocity.y;
	whitey.life = 1;
}

function killEnemy(target, pts) {	
	score += pts;
	kills++;
	totalKills++;
	cleanup(target);
	explode(target, 1, 8);
	
	elim.setVolume(0.25);
	if (!elim.isPlaying() ){
		elim.play();
	}
	
	// random chance of voice clips and powerup spawns
	target.rng = random(10);
	if (kills % 5 == 0) {	// every 5 kills
		killfeed(kills);
		if (target.rng > 7) {
			delayVoice = setTimeout(taunt, 500);
		}
	}
	
	if (kills % 3 == 0 && nukeRadius <= 100 && missilesFired == 0 && !boosting && !ulting) {
		if (target.rng <= 3) {
			let pUps = ["boosterz", "missilez", "dm"];
			spawnPowerup(target, random(pUps));
		} else if (target.rng > 9) {
			spawnPowerup(target, "ultz");
		}
	}
}

function explode(target, scale, frames) {	// create explosion sprite
	boom = createSprite(target.position.x, target.position.y);
	boom.addImage(explosion);
	boom.scale = (random(0.5, 0.8) / theScale) * scale;
	boom.velocity.x = target.velocity.x
	boom.life = frames;
	
	explodeSound.setVolume(0.4);
	explodeSound.play();
	explodeSound.rate(random(0.8, 1.2));
}

function killfeed(x) {
	currentKills = x;
	message = true;
	away = setTimeout(clearfeed, 1500);
}

function clearfeed() {
	message = false;
	clearTimeout(away);
}

function taunt() {
	clearTimeout(delayVoice);
	if (!voiceline) {
		voiceline(kill);
	}
}

function voiceline(lines) {
	let line = random(lines);
	if (line.isPlaying()) {
		line.stop();
		line.play();
	} else line.play();
}

function bump(target) {	// enemy sprite touches player
	if (boosting) {
		hit(target, boostDamage);
	} else damage(bumpDamage);
}

function damage(dmg) {	// player takes damage
	if (!invincible && !dead) {
		hp -= dmg;
		invincible = true;
		flickT = setInterval(flicker, 50);	// make sprite flicker every X ms
		let iTime = 1500;
		iframes = setTimeout(invuln, iTime);	// (x) ms of invulnerability
		
		// sound effects
		if (dmg > 0) {
			voiceline(hitV);
			if (hp == maxHP/3) {
				gasp.play();
			} else if (hp >= dmg) {
					rng = random(10);
					if (rng >= 5) {
						voiceline(hurt);
					}
			} else if (hp < dmg) {
				die();
			}
		}
	}
}

function invuln() {
	invincible = false;
	flickering = false;
	clearTimeout(iframes);
	clearInterval(flickT);
}

function flicker() {
	flickering = !flickering;
}

function die() { 
	dead = true;
	invincible = true;
	lives -= 1;
	voiceline(fall);
	explode(spr, 1.2, 20);
	spin = setInterval(spiral, 2);
	if (lives > 0) {
		life = setTimeout(respawn, 3000);
	}
}

function spiral() {
	spr.rotation += 2;
	spr.setSpeed(random(3,5), random(45, 135));
	if (spr.scale > 0) {
		spr.scale -= 0.001;
	}
	disappear = setTimeout(removePlayer, 1000);
}

function removePlayer() {
	spr.remove();
	clearTimeout(spin);
	clearTimeout(disappear);
}

