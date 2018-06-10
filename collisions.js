function collisions(junk) {	// check for collisions		
	for (let i = 0; i < junk.length; i++) {
		if (junk[i].position.x < -bound || junk[i].position.x > width + bound*2 || junk[i].position.y < -bound*2 || junk[i].position.y > height + bound) {
			junk.splice(i, 1);
		}
	}
	
	junk.overlap(walls, function() {
		cleanup(this);	// stop drawing sprite
	});
	
	if (!dead) {
		if (boosting) {
			badguys.collide(spr, function() {	// player touches enemy
				bump(this);
			});
		} else {
			badguys.displace(spr, function() {	// player touches enemy
				bump(this);
			});
		}
		bullets.overlap(spr, function() {	// player hit by enemy bullet
			if (!invincible) {
				damage(bumpDamage);
				cleanup(this);
			}
		});	
		
		powerups.overlap(spr, function() {	// player touches powerup
			if (this.powerupType == "boosterz") {
				boosters();
			} else if (this.powerupType == "missilez") {
				startMissiles();
			} else if (this.powerupType == "dm") {
				startDM();
			}	else if (this.powerupType == "ultz") {
				ultCountdown();
			}
			// random chance of voiceline
			if (this.powerupType != "ultz" && this.powerupType != "boosterz") {
				rng = random(10);
				if (rng >= 5) {
					voiceline(powerupV);
				}
			}
			cleanup(this);
			powerups.remove(this);
		});
		
	}
	
	badguys.collide(badguys, function() { // enemies don't clip through each other
		hit(this, 0);
	});
	
	badguys.overlap(lazs, function() { // enemy hit by player laser
		hit(this, laserDamage);
	});
	
	lazs.collide(badguys, function() {
		cleanup(this);
		lazs.remove(lazer);
	});
	
	badguys.displace(missiles, function() { // enemy hit by missile
		missileHit(this, 5);
		cleanup(missile);
	});
	
	bullets.overlap(dms, function() { // enemy bullet intercepted by DM
		bullets.remove(this);
		cleanup(this);
		dmEat(this);
		totalEats++;
	});
	
	// stop player from moving past walls
	if (!dead) {
		if (spr.position.x <= -border) {
			spr.position.x = -border;
		}
		if (spr.position.x >= width - border*2) {
			spr.position.x = width - border*2;
		}
		if (spr.position.y <= border) {
			spr.position.y = border;
		}
		if (spr.position.y >= height - border) {
			spr.position.y = height - border;
		}
	}
}

function cleanup(sprite) {
	sprite.remove();
	// print("removed!");
} 