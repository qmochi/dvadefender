let titleSz, titleStrk, subtitleSz, subStrk, bottomTxt;

function title() {
	hudCol = color(0, 0, 100, 0.9);
	textCol = color(0, 0, 100);
	dvaGreen = color(160, 70, 100, 0.75);
	bldg = 0;
	
	titleSz = width / 4;
	titleStrk = width / 35;

	subtitleSz = width / 12;
	subStrk = width / 60;
	
	bottomTxt = width / 18;
	
	fill(textCol);
	stroke(dvaGreen);
	strokeCap(ROUND);

	
	textSize(titleSz);
	strokeWeight(titleStrk);
	text("D.Va", width / 2, height * 0.5);

	
	textSize(subtitleSz);
	strokeWeight(width / 60);
	text("MEKA Defender", width / 2, height * 0.7);

	noStroke();
	textSize(bottomTxt);
	text("Press SPACE to play", width / 2, height * 0.85);
}

function hud() {
	noStroke();
	fill(hudCol);

	if (!dead && lives > 0) {
		// health bar
		rectMode(CORNER);
		let hpBar = width/8; // desired length of HP bar
		let barWidth = map(hp, 0, maxHP, 0, hpBar); // map HP to fit bar length
		let barX = width * 0.036;
		let barY = height * 0.88;
		let barH = height * 0.05;
		let slant = 8;

		// dark background behind bar
		push();
		fill(0, 0, 30, 0.5);
		for (let i = 0; i < maxHP / 100; i++) {
			let gap = hpBar/4;
			rect(barX + (gap * i), barY, gap - 2, barH);
			// quad(barX, barY,barWidth + slant, barY, barWidth, barY + barH, barX - slant, barY + barH);
		}
		// quad(barX, barY, hpBar + slant, barY, hpBar, barY + barH, barX - slant, barY + barH);

		// current health display
		if (hp <= 200) { // change color when health is low
			fill(0, 75, 100); // red
		} else fill(hudCol);
		// quad(barX, barY, barWidth + slant, barY, barWidth, barY + barH, barX - slant, barY + barH);
		for (let i = 0; i < hp / 100; i++) {
			let gap = hpBar/4;
			rect(barX + (gap * i), barY, gap - 2, barH);
			// quad(barX, barY,barWidth + slant, barY, barWidth, barY + barH, barX - slant, barY + barH);
		}
		pop();

		// HP text
		textSize(subtitleSz/2);
		text(hp, width * 0.064, barY - 10);
		textSize(subtitleSz/4);
		text("/ " + maxHP, width * 0.106, barY - 10);
	} else if (dead && lives <= 0) {
		gameOver();
	}

	// display enemy HP
	// push();
	// textSize(bottomTxt/2);
	// for (i = 0; i < badguys.length; i++) {
	// 	text(badguys[i].eHP, badguys[i].position.x, badguys[i].position.y + 25/theScale);
	// }
	// pop();

	//	killstreak messages
	if (message) {
		fill(textCol);
		textSize(subtitleSz);
		textAlign(CENTER, CENTER);
		text(currentKills + " kill streak!", width / 2, height * 0.15);
	}
	
	// score display
	push();
	textAlign(LEFT);
	textSize(bottomTxt/2);
	text("Score: " + score, width*0.023, height*0.18);
	if (!dead) {
		if (boosting && frameCount % 10 == 0) {
			score++; // increasing score while boosting
		} else if (frameCount % 30 == 0) {
			score++; // regular increasing score
		}
	}
	pop();

	// display icons for remaining lives
	for (let i = 0; i < lives; i++) {
		life = image(lifeIcon, width*0.06 + (lifeIcon.width * 0.4 * i/ theScale), height*0.12, (lifeIcon.width / 3 / -theScale), lifeIcon.height / 3 / -theScale);
	}
}

function gameOver() {	
	clearInterval(time);
	
	let leftCard = width * 0.2;
	let midCard = width* 0.5;
	let rightCard = width * 0.75;
	
	fill(0, 90, 80);
	textSize(titleSz);
	text("DEFEAT", width*0.5, height*0.45);
	fill(textCol);
	
	push();
	textAlign(CENTER, CENTER);
	textSize(subtitleSz);
	text(totalKills, leftCard, height * 0.6);
	text(totalDamage, midCard, height * 0.6);
	text(totalEats, rightCard, height * 0.6);
	pop();
	
	push();
	textSize(bottomTxt/3);
	textFont(uiFont);
	fill(hudCol);
	text("ELIMINATIONS", leftCard, height * 0.725);
	text("DAMAGE DONE", midCard, height * 0.725);
	text("SHOTS BLOCKED", rightCard, height * 0.725);
	
	text(minutes + ":" + seconds2 + seconds, width*0.145, height*0.12);
	fill(0, 0, 80);
	text("GAME TIME: ", width*0.075, height*0.12)
	pop();
	
	textSize(bottomTxt);
	text("Press N to play again", width * 0.5, height * 0.85);
}

function timer() {
	if (gameStarted && lives > 0) {
		seconds ++;
		if (seconds == 10) {
			seconds = 0;
			seconds2++;
		}
		if (seconds2 == 6) {
			minutes++;
			seconds = 0;
			seconds2 = 0;
		}
	}
}