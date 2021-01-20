let gameStarted = false;

// player
let spr; // variable for player sprite
let flash; // viarable for muzzle flash sprite
let playerX, playerY; // shortcut names for player sprite
let hp; // current health
let maxHP = 600;
let lives; // current lives
let maxLives = 3;
let bumpDamage = 200; // damage taken from enemies
let invincible = false; // bool invulnerability state
let flickering = false; // bool for sprite flickering when hit
let dead = false; // bool for if player is currently dead

// stats/scoring
let score; // current score
let kills; // current kills
let totalKills; //	total kills
let currentKills; //	kills from current life
let killPoints = 25; // points gained for killing enemy
let totalDamage;
// let time, minutes, seconds, seconds2; // total time spent ingame

// movement
let left, right, up, down; // booleans for movement direction
let border = 20; // how close to edges of screen player sprite can move
let moveSpeed = 8; // base movement speed
let boost; // added speed while boosting

// shooting
let shooting = false;
let firerate; // # of frames between shots while firing
let lazs; // group of Laser sprites
let lasWidth = 2; // width of lasers
let laserSpd;
let laserDamage = 3;
let leftGun = false;
let flashSz; // muzzle flash size

// abilities
let boosting = false; // bool for boosting state (i.e. speed boost, bumping into enemies)
let boostDuration = 0; // duration of boost (ms)
let boostDamage = 50; // damage dealt to enemies while boosting
let missilesFired = 0;
let firingMissiles = false;
let matrix = false;
let matrixDuration = 0;
let eaten = 0;
let powerupType;
let ulting = false;
let nuke; // variable for Ultimate
let nukeRadius = 50; // initial ult explosion radius before expanding
let nukeX, nukeY; // origin point of explosion

// enemies
let maxEnemies;
let eHP; // enemy's HP
let eType;
let bashed; // bool for if already been boosted into
let shotsFired; // number of bullets current enemy has fired
let maxShots; // max bullets a single enemy can fire
let maxBullets; // max bullets onscreen at a time
let canShoot;
let refireDelay; // default time between enemy shots
let chance; // base probability that an enemy can shoot

// misc
let bound = 200; // how far past the edge of screen the invisible deleting walls are
let rng; // used for randomization	
let textCol, dvaGreen; // color variables
let flickT, iframes, iPeriod, end, boostOff, del, refire; // interval timers
let message = false; // bool whether or not to display HUD messages
let stars = []; // array of background star particles
let maxStars = 60; // maximum # of star particles onscreen at a time
let bldg;
let buildings = [];
let maxBuildings = 5;
let embers = [];
let sz, rise, shrink, green, blue, gap, greening; // variables used in particles
let theScale;
let junk = [];
let hax = false;

function preload() {
    assets(); // sounds, sprites, and fonts
}

function setup() {
    createCanvas(windowWidth, windowWidth / 1.78);
    colorMode(HSB);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(myFont);

    theScale = map(windowHeight, 0, height, 0, 1);
    firerate = frameRate() / 7;

    red = random(255);
    green = random(0, 120);
    blue = random(180, 255);
    gap = random(10, 50);

    if (green >= 60) {
        greening = false;
    } else greening = true;

    lazs = new Group(); // lasers
    badguys = new Group(); // group of enemies
    bullets = new Group(); // enemy bullets
    missiles = new Group();
    dms = new Group(); // defense matrix beams
    powerups = new Group(); // powerup sprites
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
    wall = createSprite(-bound, height / 2, bound, height + bound); // left
    wall2 = createSprite(width * 2, height / 2, bound, height + bound); // right
    wall3 = createSprite(width / 2, -bound, width, bound); // up
    wall4 = createSprite(width / 2, height + bound, width, bound); // down
    wall.addToGroup(walls);
    wall2.addToGroup(walls);
    wall3.addToGroup(walls);
    wall4.addToGroup(walls);

    junk = [lazs, badguys, bullets, missiles, powerups]; // groups to be deleted when offscreen

    newGame(maxLives); // # of lives; maxLives = 3;
}

function newGame(hearts) { // clean slate whenever new game is started, includes generating player
    // reset stats
    score = 0;
    totalKills = 0;
    kills = totalKills;
    totalDamage = 0;
    totalEats = 0;
    refireDelay = 500;

    // reset timer
    // seconds = 0;
    // seconds2 = 0;
    // minutes = 0;

    // give lives
    lives = hearts;
    if (lives <= 0) {
        lives = 1;
    }

    // clear screen
    for (i = 0; i < junk.length; i++) {
        junk[i].removeSprites();
    }

    // default enemy quantities/values
    maxEnemies = 8;
    maxBullets = 10;
    chance = 2;

    // create player sprite
    spawn();
}

function spawn() {
    spr = createSprite(width / 6, height / 2);
    spr.addImage(dvaSprite);
    spr.scale = 1 / theScale;
    spr.depth = 1;
    hp = maxHP; // full HP
    kills = 0; // reset current killstreak

    // stop any abilties
    ulting = false;
    endDM();
    boosterEnd();

    // flickering sprite + iframes when respawned
    if (dead) {
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
    gradient(height / 10); // found in particles.js; parameter is # of px between gradient steps. default gap = random(20, 50);
    // buildingBG(bldg);	// scrolling buildings in background
    starBG(maxStars); // scrolling star background, max (n) stars on screen
    fireParticle(); // particle effect system
    drawSprites();
    controlDva(); // handle keyboard input and player controls
    collisions(junk); // collision manager for all sprites and groups

    // 	sprites move past faster when boosting
    if (boosting) {
        for (i = 0; i < badguys.length; i++) {
            badguys[i].addSpeed(0.7, 180);
        }
        for (i = 0; i < bullets.length; i++) {
            bullets[i].addSpeed(0.7, 180);
        }
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
        title(); // gui.js
        bldg = 0;
    } else {
        game();
        bldg = maxBuildings;
    }
}

function game() {
    hud(); // found in gui.js
    // time = setInterval(timer, 1000);

    if (ulting || boosting) {
        invincible = true;
    }

    // spawn enemies
    if (badguys.length < maxEnemies && nukeRadius <= 200 && !firingMissiles) {
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
    let spawnX = width + bound;
    let spawnY = random(height);

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
    enemy.setCollider("circle", 0, 0, enemy.width / 3);
    enemy.shotsFired = 0;
    enemy.maxShots = random(1, 5);
    enemy.addToGroup(badguys);

    // check if enemy can shoot
    if (enemy.canShoot && !dead && !boosting && nukeRadius <= 50) {
        roll = setTimeout(function() { shootCheck(enemy); }, random(1000, 5000));
    }
}

function shootCheck(e) {
    rng = random(10);
    if (rng < chance) {
        clearInterval(roll);
        enemyShoot(e);
    }
}

function enemyShoot(e) {
    refire = setInterval(function() { enemyBullet(playerY); }, refireDelay);
}

function enemyBullet(targ) {
    if (bullets.length <= maxBullets && enemy.canShoot && enemy.shotsFired < enemy.maxShots && !boosting && !dead && nukeRadius <= 50) {
        let diam = 25 / theScale;
        bullet = createSprite(enemy.position.x, enemy.position.y);
        bullet.draw = function() {
            colorMode(HSB);
            fill(random(360), 100, 100);
            ellipse(0, 0, diam * 1.8);
            fill(0, 0, 100, 0.8);
            ellipse(0, 0, diam);
        }
        bullet.setCollider("circle", 0, 0, diam * 0.9);
        bullet.velocity.x = -laserSpd * 0.15;
        bullet.velocity.y = (targ - bullet.position.y) * random(0, 0.01);
        bullet.addToGroup(bullets);
        enemy.shotsFired++;

        // sound effect
        pew.setVolume(0.35);
        if (pew.isPlaying()) {
            pew.stop();
            pew.play();
        } else pew.play();
    } else {
        clearInterval(refire);
        enemy.canShoot = false;
    }
}

function hit(target, dmg) { // enemy hit by laser
    target.eHP -= dmg;
    totalDamage += dmg;

    if (dmg > 0) {
        enemyFlash(target); // sprite flashes white
        hitmarker.setVolume(0.5); // play sound
        if (!hitmarker.isPlaying()) {
            hitmarker.play();
        }
    }

    if (target.eHP < dmg) { // remove enemy if killed
        killEnemy(target, killPoints);
    }
}

function enemyFlash(target) {
    whitey = createSprite(target.position.x, target.position.y, target.width / theScale, target.height / theScale);
    whitey.addImage(target.flashSpr);
    whitey.scale = target.scale;
    whitey.velocity.x = target.velocity.x;
    whitey.velocity.y = target.velocity.y;
    whitey.life = 1;
}

function killEnemy(target, pts) {
    clearInterval(refire);
    target.canShoot = false;
    score += pts;
    kills++;
    totalKills++;
    cleanup(target);
    explode(target, 1, 8);
    refireDelay--;

    // enemies more likely to shoot after certain thresholds of kills
    if (kills % 20 == 0) {
        maxBullets++;
        chance += 0.5;
    }

    // sound
    elim.setVolume(0.25);
    if (!elim.isPlaying()) {
        elim.play();
    }

    // random chance of voice clips and powerup spawns
    target.rng = random(10);
    if (kills % 5 == 0) { // every 5 kills
        killfeed(kills);
        if (target.rng > 7) {
            delayVoice = setTimeout(taunt, 500);
        }
    }

    if (kills % 3 == 0 && nukeRadius <= 100 && !boosting && !firingMissiles && !ulting) {
        if (target.rng <= 3) {
            let pUps = ["boosterz", "missilez", "dm"];
            spawnPowerup(target, random(pUps));
        } else if (target.rng > 9) {
            spawnPowerup(target, "ultz");
        }
    }
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

function bump(target) { // enemy sprite touches player
    if (boosting) {
        hit(target, boostDamage);
    } else damage(bumpDamage);
}

function damage(dmg) { // player takes damage
    if (!invincible && !dead) {
        hp -= dmg;
        invincible = true;
        flickT = setInterval(flicker, 50); // make sprite flicker every X ms
        let iTime = 1000;
        iframes = setTimeout(invuln, iTime); // (x) ms of invulnerability

        if (hp < dmg) {
            die();
        } else if (dmg >= 1) {
            voiceline(hitV);
            if (hp == maxHP / 3) {
                gasp.play();
            } else if (hp >= dmg) {
                rng = random(10);
                if (rng >= 5) {
                    voiceline(hurt);
                }
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
    spr.setSpeed(random(3, 5), random(45, 135));
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

/* TODO (possible future ideas)

- boss fights
- add levels/checkpoints
- more varied enemy behaviors
		- complex movement patterns, different firing modes/projectiles, bulletproof
- background music
- "assist trophies" of other OW characters

*/