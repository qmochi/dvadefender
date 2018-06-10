function assets() {
	// sprites
	dvaSprite = loadImage("sprites/dva.png");
	flash = loadImage("sprites/shoot.png");
	explosion = loadImage("sprites/explosion.png");
	ultIcon = loadImage("sprites/ultIcon.png");
	missileIcon = loadImage("sprites/missileIcon.png");
	boosterIcon = loadImage("sprites/boosterIcon.png");
	defenseIcon = loadImage("sprites/defenseIcon.png");
	lifeIcon = loadImage("sprites/dvaIcon.png");
	eradicator = loadImage("sprites/eradicator.png");
	nullmari = loadImage("sprites/nullmari.png");
	splicer = loadImage("sprites/splicer.png");
	flasheradicator = loadImage("sprites/flash_eradicator.png");
	flashnullmari = loadImage("sprites/flash_nullmari.png");
	flashsplicer = loadImage("sprites/flash_splicer.png");
	
	// sound effects
	shootSound = loadSound("sounds/bit/dva_shoot.mp3");
	boostSound = loadSound("sounds/bit/dva_boost.mp3");
	missileSound = loadSound("sounds/bit/dva_missiles.mp3");
	explodeSound = loadSound("sounds/bit/dva_missile_explode.mp3");
	hitmarker = loadSound("sounds/hitmarker.mp3");
	elim = loadSound("sounds/elim.mp3");
	donk = loadSound("sounds/bit/dva_melee.mp3");
	shing = loadSound("sounds/bit/cooleddown.mp3");
	dmStart = loadSound("sounds/bit/dm_start.mp3");
	dmPlay = loadSound("sounds/bit/dm_loop.mp3");
	dmEnd = loadSound("sounds/bit/dm_end.mp3");
	ultStart = loadSound("sounds/bit/ult_windup.mp3");
	ultExplode = loadSound("sounds/bit/ult_explode.mp3");
	hit1 = loadSound("sounds/bit/hit1.mp3");
	hit2 = loadSound("sounds/bit/hit2.mp3");
	hit3 = loadSound("sounds/bit/hit3.mp3");
	hit4 = loadSound("sounds/bit/hit4.mp3");
	hit5 = loadSound("sounds/bit/hit5.mp3");
	eat1 = loadSound("sounds/bit/eat1.mp3");
	eat2 = loadSound("sounds/bit/eat2.mp3");
	
	// voice clips
	hi1 = loadSound("sounds/bit/dva_voice_hi.mp3");
	hi2 = loadSound("sounds/bit/dva_voice_hiya.mp3");
	hi3 = loadSound("sounds/bit/dva_voice_anyoung.mp3");
	hi4 = loadSound("sounds/bit/dva_voice_wink.mp3");
	
	boost1 = loadSound("sounds/bit/Booster_on.mp3");
	boost2 = loadSound("sounds/bit/Get_Out_Of_The_Way.mp3");
	boost3 = loadSound("sounds/bit/Bunny_hop.mp3");
	
	dmg1 = loadSound("sounds/bit/dva_voice_dmgboost1-ahyeah.mp3");
	dmg2 = loadSound("sounds/bit/dva_voice_dmgboost2-wanjeon.mp3");
	dmg3 = loadSound("sounds/bit/dva_voice_ahyeah.mp3");
	
	hurt1 = loadSound("sounds/bit/hurt1.mp3");
	hurt2 = loadSound("sounds/bit/hurt2.mp3");
	hurt3 = loadSound("sounds/bit/hurt3.mp3");
	hurt4 = loadSound("sounds/bit/hurt4.mp3");
	hurt5 = loadSound("sounds/bit/no.mp3");
	
	kill1 = loadSound("sounds/bit/Pow.mp3");
	kill2 = loadSound("sounds/bit/I'm_On_Fire_2.mp3");
	
	die1 = loadSound("sounds/bit/dva_fall1.mp3");
	die2 = loadSound("sounds/bit/dva_fall2.mp3");
	
	rez1 = loadSound("sounds/bit/dva_voice_respawn_2.mp3");
	rez2 = loadSound("sounds/bit/dva_voice_respawn_ha.mp3");
	rez3 = loadSound("sounds/bit/dva_voice_respawn_joj.mp3");
	rez4 = loadSound("sounds/bit/dva_voice_respawn_loser.mp3");
	rez5 = loadSound("sounds/bit/dva_voice_respawn_tooyoung.mp3");
	rez6 = loadSound("sounds/bit/Dva_online.mp3");
	
	gasp = loadSound("sounds/bit/Gasp.mp3");
	ulti = loadSound("sounds/bit/Nerf_this.mp3");
	
	// fonts
	myFont = loadFont("bignoodletoo.ttf");
	uiFont = loadFont("Futura.ttf");
}
