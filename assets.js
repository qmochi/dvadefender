function assets() {
	// sprites
	dvaSprite = loadImage("https://github.com/qmochi/dvadefender/sprites/dva.png");
	flash = loadImage("https://github.com/qmochi/dvadefender/sprites/shoot.png");
	explosion = loadImage("https://github.com/qmochi/dvadefender/sprites/explosion.png");
	ultIcon = loadImage("https://github.com/qmochi/dvadefender/sprites/ultIcon.png");
	missileIcon = loadImage("https://github.com/qmochi/dvadefender/sprites/missileIcon.png");
	boosterIcon = loadImage("https://github.com/qmochi/dvadefender/sprites/boosterIcon.png");
	defenseIcon = loadImage("https://github.com/qmochi/dvadefender/sprites/defenseIcon.png");
	lifeIcon = loadImage("https://github.com/qmochi/dvadefender/sprites/dvaIcon.png");
	eradicator = loadImage("https://github.com/qmochi/dvadefender/sprites/eradicator.png");
	nullmari = loadImage("https://github.com/qmochi/dvadefender/sprites/nullmari.png");
	splicer = loadImage("https://github.com/qmochi/dvadefender/sprites/splicer.png");
	flasheradicator = loadImage("https://github.com/qmochi/dvadefender/sprites/flash_eradicator.png");
	flashnullmari = loadImage("https://github.com/qmochi/dvadefender/sprites/flash_nullmari.png");
	flashsplicer = loadImage("https://github.com/qmochi/dvadefender/sprites/flash_splicer.png");
	
	// sound effects
	shootSound = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_shoot.mp3");
	boostSound = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_boost.mp3");
	missileSound = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_missiles.mp3");
	explodeSound = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_missile_explode.mp3");
	hitmarker = loadSound("https://github.com/qmochi/dvadefender/sounds/hitmarker.mp3");
	elim = loadSound("https://github.com/qmochi/dvadefender/sounds/elim.mp3");
	donk = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_melee.mp3");
	shing = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/cooleddown.mp3");
	dmStart = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dm_start.mp3");
	dmPlay = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dm_loop.mp3");
	dmEnd = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dm_end.mp3");
	ultStart = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/ult_windup.mp3");
	ultExplode = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/ult_explode.mp3");
	hit1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hit1.mp3");
	hit2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hit2.mp3");
	hit3 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hit3.mp3");
	hit4 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hit4.mp3");
	hit5 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hit5.mp3");
	eat1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/eat1.mp3");
	eat2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/eat2.mp3");
	
	// voice clips
	hi1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_hi.mp3");
	hi2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_hiya.mp3");
	hi3 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_anyoung.mp3");
	hi4 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_wink.mp3");
	
	boost1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Booster_on.mp3");
	boost2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Get_Out_Of_The_Way.mp3");
	boost3 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Bunny_hop.mp3");
	
	dmg1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_dmgboost1-ahyeah.mp3");
	dmg2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_dmgboost2-wanjeon.mp3");
	dmg3 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_ahyeah.mp3");
	
	hurt1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hurt1.mp3");
	hurt2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hurt2.mp3");
	hurt3 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hurt3.mp3");
	hurt4 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/hurt4.mp3");
	hurt5 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/no.mp3");
	
	kill1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Pow.mp3");
	kill2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/I'm_On_Fire_2.mp3");
	
	die1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_fall1.mp3");
	die2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_fall2.mp3");
	
	rez1 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_respawn_2.mp3");
	rez2 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_respawn_ha.mp3");
	rez3 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_respawn_joj.mp3");
	rez4 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_respawn_loser.mp3");
	rez5 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/dva_voice_respawn_tooyoung.mp3");
	rez6 = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Dva_online.mp3");
	
	gasp = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Gasp.mp3");
	ulti = loadSound("https://github.com/qmochi/dvadefender/sounds/bit/Nerf_this.mp3");
	
	// fonts
	myFont = loadFont("https://github.com/qmochi/dvadefender/bignoodletoo.ttf");
	uiFont = loadFont("https://github.com/qmochi/dvadefender/Futura.ttf");
}
