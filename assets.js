function assets() {
	// sprites
	dvaSprite = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/59457be7-92c6-4ff3-9008-b7bccce308c3.png");
	flash = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/526cf11f-c3f2-4c7a-96cb-1f952f60c9df.png");
	explosion = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/582bade7-0b14-487d-a416-a56c74bffc08.png");
	ultIcon = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/da37ee87-06ee-4231-83ca-873500c46f8f.png");
	missileIcon = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/3b5ce1b9-64d7-4e63-b739-5f65591db3c1.png");
	boosterIcon = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/137ebb36-5866-4240-b3bd-e533b48df2f2.png");
	defenseIcon = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/d43bf6ab-c4fb-4f4b-80b9-c7663e4a6609.png");
	lifeIcon = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/1c11f77d-3790-4ce8-90de-0ac8d8a77fa0.png");
	eradicator = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/e2b47440-327d-4cad-aea9-a7daa8f3f11b.png");
	nullmari = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/a1e14983-39ee-4f5b-b732-71ae2f92b5e7.png");
	splicer = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/504a3935-3032-4512-8e71-5e7117c882b7.png");
	flasheradicator = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/29c1221a-1979-4251-b08a-5cd3772304a2.png");
	flashnullmari = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/e0e11205-b072-4148-9d4b-61c254804e99.png");
	flashsplicer = loadImage("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/d791daca-74ff-455b-9d40-117643a16edb.png");
	
	// sound effects
	shootSound = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/bb8f0df1-f49b-42ae-b99b-fd4582a78f04.mp3");
	boostSound = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/93e97b9a-d4e2-4e1e-b96a-c0ea431bb46c.mp3");
	missileSound = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/80fb9f20-768b-453f-809d-df7fc4613b11.mp3");
	explodeSound = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/55d665a6-8814-4248-8f4e-b60f62c3a43a.mp3");
	hitmarker = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/5f4cfd1f-2b7f-4dc6-bd5e-ad0f5c3dd207.mp3");
	elim = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/ab487d0d-ab70-48aa-9f7e-5a968e38126b.mp3");
	donk = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/f36e2594-b24a-4386-bff2-64803ffdc814.mp3");
	shing = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/785d3853-2c40-4e8f-a783-8db78581e0b3.mp3");
	dmStart = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/416b55b2-445d-4f64-b9e1-067604d08614.mp3");
	dmPlay = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/9b97de1b-8799-42ea-adcd-b30816c2055d.mp3");
	dmEnd = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/296bddb3-51ed-481b-a4d4-619d528f775f.mp3");
	ultStart = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/0825b0db-86c5-4f4c-a9c6-61db60bbb67c.mp3");
	ultExplode = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/e0d2868e-7c0a-442e-9c97-6ba1cb18e8ec.mp3");
	hit1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/8f709202-fb98-47ff-ac94-d7e3aa427e65.mp3");
	hit2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/2553f389-9157-4896-9e53-441bc0b7a8fd.mp3");
	hit3 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/d4813fc3-5f69-4abb-8574-91d8d3e2dc59.mp3");
	hit4 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/358f2a06-829a-4408-a3a4-6985e4f0414e.mp3");
	hit5 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/26306c25-6c30-46b6-96fe-3df6ef681118.mp3");
	eat1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/ec997ead-dc08-4c91-bc09-e6fcd96c93da.mp3");
	eat2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/5b61fac8-3b35-4300-9e76-24cdb0485f57.mp3");
	
	// voice clips
	hi1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/efa0a40e-d9f9-411a-8f31-252fc7489195.mp3");
	hi2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/c9a88312-674f-4114-9c42-0c5b923ce6c0.mp3");
	hi3 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/cc8becc7-d58b-4872-9bd1-7525206486fa.mp3");
	hi4 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/b664e128-8157-4301-8441-4a2df67ab491.mp3");
	
	boost1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/d68573a7-4587-4e28-9ed0-dfbb06661f75.mp3");
	boost2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/4e8fa3ea-9c32-4e05-a179-f01c07a2bdd2.mp3");
	boost3 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/2cd82923-79b7-4df0-958b-d2e2ce780ac8.mp3");
	
	dmg1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/7b5a276d-df3f-4eba-8943-74acd1db9d48.mp3");
	dmg2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/61d1209c-a1f6-4288-877e-66b6bc593128.mp3");
	dmg3 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/8f292ff9-f78b-4f80-a494-b8dddcd8b417.mp3");
	
	hurt1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/249c0107-6ec8-4d6b-97c6-6c930a346190.mp3");
	hurt2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/1da37c32-0202-46f6-bbe1-332bb89d330f.mp3");
	hurt3 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/7f0bcc2b-8ec3-4b4e-9f27-3efa6fe453b0.mp3");
	hurt4 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/ffc4f204-2864-4107-a074-6a94bf14bda7.mp3");
	hurt5 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/a897d883-5d27-4175-aa51-5c73fd5fc9b4.mp3");
	
	kill1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/d55c184b-7914-48c0-8a5a-46a7655d8aea.mp3");
	kill2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/3ecd0623-fe91-4b4d-a9d0-4d23ad708c09.mp3");
	
	die1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/0f41e078-a7ec-47d3-8504-7d476e221b9b.mp3");
	die2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/c775f69b-0bc1-4267-85fe-8f98b2f85739.mp3");
	
	rez1 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/b2e1a0b5-5416-4996-9f7b-22c158fe12a1.mp3");
	rez2 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/39b3829c-2d60-484d-b370-6c0fe527fe4c.mp3");
	rez3 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/f6519725-22cb-4838-a600-682526a52e14.mp3");
	rez4 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/6793f3fc-938a-46fd-b6f5-cbd1e6ad0e89.mp3");
	rez5 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/21fd1a9e-9173-46a8-9dd6-ae72a3a3d413.mp3");
	rez6 = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/35f70cb8-f6ed-4f86-be96-b6b8a4d0b291.mp3");
	
	gasp = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/ca2cef23-d91c-469b-8da8-d6133af588bf.mp3");
	ulti = loadSound("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/dbf8ca14-a659-4d11-b299-f27197f77874.mp3");
	
	// fonts
	myFont = loadFont("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/cb3db671-59e0-49a9-8e8a-d6e848f35a59.ttf");
	uiFont = loadFont("https://s3-us-west-2.amazonaws.com/assets.editor.p5js.org/5a8cebfa32d9ac490a4356b6/bcda7b80-8205-424b-bbde-957f7203d33d.ttf");
}
