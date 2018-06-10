function gradient(step) {	// background colors
	push();
	colorMode(RGB);
	noStroke();
	rectMode(CORNER);
		
	for (let i = width; i > red; i -= step) {
		red = map(i, 0, width, 0, 255);
		fill(red, green, blue);
		rect(0, 0, width, i);
	}
	pop();
	
	// background cycles between day/night
	if (frameCount % 1 == 0) {
		if (!greening) {
			green -= 0.05;
		} else green += 0.05;
	}
	
	if (green <= 0 || green >= 100) {
		greening = !greening;
	}
}

// fire particles for missiles, boost exhaust, etc.
function fireParticle(x, y, size) {	
	sz = 100;
	rise = 5;
	shrink = 1;

	let e = new Flame(x, y, size);
	embers.push(e);
  
	// create a circle for each index in array
	for (let i = 0; i < embers.length; i++) {
		embers[i].show();
		embers[i].move();
		
		if (embers[i].size <= 0) {
			embers.splice(i, 1);
		}
	}
}

class Flame {
	constructor(tempX = -100, tempY = -100, tempSz = random(sz)) {
		this.x = tempX;
		this.y = tempY;
		this.size = tempSz;
		this.color = color(random(150,180), random(30, 100), 100, 0.6);
	}
	
	show() {
		fill(this.color);
		noStroke();
		ellipse(this.x, this.y, this.size);
	}

	move() {
		let wiggle = random(1);	// how much they move
		
		this.y += random(-wiggle, wiggle);
		this.x -= random(rise);
		this.size -= random(shrink);
	}
}


// scrolling star particles
function starBG(max) {
	if (stars.length < max) {
		stars.push(new Star()); // create Star particle as long as there's less than maxStars
	}
	
	for (let i = 0; i < stars.length; i++) {
		stars[i].show();
		stars[i].move();
		// remove stars once off-screen
		if (stars[i].x <= -stars[i].size) {
			stars.splice(i, 1);
		}
	}
}

class Star {
	constructor() {
		this.x = width;
		this.y = random(height);
		this.speed = random(2, 20);
		this.size = random(6);
		this.color = color(0, 0, random(70, 100));
		this.width = random(50,200);
	}

	show() {
		noStroke();
		fill(this.color);
		if (boosting) {
			rect(this.x, this.y, this.width, this.size*0.75);
		} else ellipse(this.x, this.y, this.size);
	}

	move() {
		if (boosting) {
			this.x -= this.speed*5;
		} else this.x -= this.speed;
	}
}

// scrolling buildings in BG
function buildingBG(max) {
	if (buildings.length < max) {
		buildings.push(new Building()); // create Star particle as long as there's less than maxStars
	}
	
	for (let i = 0; i < buildings.length; i++) {
		buildings[i].show();
		buildings[i].move();
		if (buildings[i].x < -buildings[i].width * 2) {
			buildings.splice(i, 1);
		}
	}
}

class Building {
	constructor() {
		this.x = width;
		this.y = height;
		this.speed = random(1, 3);
		this.color = color(random(200, 270), random(50), random(20,40), random(0.9, 1));
		this.height = height * random(0.1, 0.6);
		this.width = this.height / random(1.5, 4);
	}

	show() {
		noStroke();
		fill(this.color);
		rect(this.x + this.width, this.y, this.width, this.height);
	}

	move() {
		if (boosting) {
			this.x -= this.speed*5;
		} else this.x -= this.speed;
	}
}
