// as soon as window loads, run the init() function to start everything

window.onload = init();

function init()
{


////////////////SETTING CANVAS BY ID AND 2D CONTEXT

c = document.getElementById('room_edit');
ctx = c.getContext('2d');
c.setAttribute('crossOrigin', 'anonymous'); /////////THIS IS FOR RIGHTS PORPOUSE OTHERWISE IT WOULDN'T DOWNLOAD IMAGES


///////////////TAKE A SCREENSHOT OF CANVAS
function downloadCanvas(link, canvasId, filename) { /*JAVASCRIPT GIVES OUT SOME REALLY USEFULL BUILT-IN FUNCTIONS FOR THAT */
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
    canvasId.crossOrigin = "anonymous";
}

///////////////WHEN DOWNLOAD BUTTON IS TRIGGERED
document.getElementById('download').addEventListener('click', function() { /*REALLY EASY IMPLEMENTATION IN CODE AS WELL*/
    downloadCanvas(this, 'room_edit', 'YOURPLAN.png');
}, false);

var canclick = false;

//////////////////////VARIABLES OF EVENTS
var redisplay;

var mx, my; ///////////X AND Y OF MOUSE CLICK

var mouseX, mouseY; /////////X AND Y OF MOUSE POSITION

var is_sizing = true;/////CHECK WHAT USER IS DOING

var state = undefined;///////////STATE OF THE APPLICATION

var offrightx;//////////VARIABLES FOR BUILDING THE OFFICE
var offrighty;

///////////////////GENERAL VARIABLES
var tilesize = 250;

var centretop = 2;///VARIABLES FOR CENTERING THE ROOM
var centreleft = 2;

var offleftx = 0;
var offlefty = 0;


var doorx;
var doory;

var overallprice;
///////////////////////SET THE SIZE OF THE CANVAS
c.width=1500;
c.height=700;

///////////////////////SET THE SPEED OF THE LOOP
var time = 50;

var step;
//////////////////////
var MyImage = new Image();
var haschecked = false;

var clicked = undefined;

var color1 ="black";
var color2 ="black";
var color3 ="black";
var color4 ="black";

var autoscale = 2;
/////////////////////////////////A BIT OF MATH
var pxtocm = 0.02645833; ////////FIXED SCALE FROM PX TO CM
var roomwidth = offrightx * pxtocm - offleftx * pxtocm;//////CONVERT PIXELS TO CM AND GET ROOM SIZE
var roomheight = offrighty * pxtocm  - offlefty * pxtocm;
var scalex = roomwidth/autoscale;///////////////////////////////SCALE SIZE TO BE M
var scaley = roomheight/autoscale;
var squaremeters = scaley * scalex;/////////////////////SQUARING METERS (AVERAGE ROOF-HIGH OF 3m IS SUPPOSED)

var keydown;
var keyup;

var	gx = 1000;
var	gy = 350;

var sidex = 1010;
var	sidey = 30;

var page = 0;

var PageOne = 0;
var PageTwo = 0 ;
var PageThree = 0;
var PageFour = 0;

var offleftx, offlefty;

var arrowup = new Image();
var arrowdown = new Image();

var door = new Image();
var opendoor = new Image();

var parquet = new Image;
parquet.crossOrigin = "anonymous";
parquet.src = "pic/parquet.jpg";

var isdooring = false;

var doorarcx;
var doorarcy;

var floorcolor1;

var floorcolor2;

var floorcolor3;

var floorcolor4;

var floorcolor5;

var floorcolor6;

var myfinalcolor = 'white';
///////////////////////////////////CREATE ARRAYS FOR OBJECT-CHOOSING AND DISPLAYING

var furnarray = [];/*KEEP ALL THE OBJECTS HERE*/

/*AND HERE SEPARATED FOR DIPLAYING PURPOSE*/
var kitchen = new Array;

var livingroom = new Array;

var bedroom = new Array;

var bathroom = new Array;

var scaleOne = new Array;
var scaleTwo = new Array;
var scaleThree = new Array;
var scaleFour = new Array;

var MyObjects = new Array;
var MyPrices = new Array;

var pricekitchen = [300, 200, 400, 150, 275];
var brandkitchen = ["Ikea", "Whatever", "JustABrand", "Whatever1", "Blabla"];

var pricebedroom = [100, 200, 300, 400, 500];
var brandbedroom = ["Brand1","Brand2","Brand3","Brand4","Brand5"];

var pricebathroom = [150, 250, 350, 450, 550];
var brandbathroom = ["Brand6","Brand7","Brand8","Brand8.5","Brand9"];

var pricelivingroom = [175, 275, 375, 475, 575];
var brandlivingroom = ["Brand10","Brand11","Brand12","Brand13","Brand14"];

//////////////////////////////////TILE BASED MENU

var tiles = [];

var which = 0;

var intotheoffice = false;

var placeit ;
var placeity ;



var hasdoored = false;
var alreadydone = false;
var displayed = false;
var isnotdoingit = false;

var Tile  = function(x,y)////*****DRAWING TILE BASED ICON.******/////
{
	this.posx = x,
	this.posy = y,
	this.width = 250,               //ICON WIDTH
	this.height =50,              //ICON HEIGH,
	this.color = "black",


	this.draw = function()  //DRAW FUNCTION OF MY TILES
	{

    	ctx.fillStyle = this.color;
    	ctx.fillRect(this.posx, this.posy, this.width, this.height);
    	ctx.strokeStyle = "black";
    	ctx.lineWidth   = 5;
    	ctx.strokeRect(this.posx, this.posy, this.width, this.height);
	};
}

var ImageTile = function (id)/////////***SETTING PICTURES AND SORT THEM BY CATEGORY**//
{
	this.posx,
	this.posy,
	this.spaced,
	this.image = new Image(),
  this.image.width,
  this.image.height,
	this.id = id,


	this.setup = function()/////////////////////THIS FUNCTION DISPLAYS ALL THE OBJECTS BUT DOES NOT HANDLE THEM IN MEMORY
	{

		this.spaced = 190;

		if (state == 1)
		{switch (this.id)
				{
					case 0:
					this.image.src = "forniture/cooker.png";
          kitchen.push(this.image);//////////////////FOR EACH CATEGORY PUSH THE IMAGE IN THE CORRESPECTIVE ARRAY
					break;

					case 1:
					this.image.src = "forniture/cooker2.png";
          kitchen.push(this.image);
					break;

					case 2:
					this.image.src = "forniture/desk.png";
          kitchen.push(this.image);
					break;

					case 3:
					this.image.src = "forniture/dishwasher.png";
          kitchen.push(this.image);
					break;

					case 4:
					this.image.src = "forniture/dishwasher_black.png";
          kitchen.push(this.image);
					break;

				}
		}

		else if (state == 2)
		{switch (this.id)
				{
					case 0:
					this.image.src = "forniture/table.png";
          livingroom.push(this.image);
					break;

					case 1:
					this.image.src = "forniture/table2.png";
          livingroom.push(this.image);
					break;

					case 2:
					this.image.src = "forniture/table3.png";
          livingroom.push(this.image);
					break;

					case 3:
					this.image.src = "forniture/tiny_table.png";
          livingroom.push(this.image);
					break;

					case 4:
					this.image.src = "forniture/tiny_table1.png";
          livingroom.push(this.image);
					break;
				}
		}

		else if (state == 3)
		{switch (this.id)
				{
					case 0:
					this.image.src = "forniture/armchair.png";
          bedroom.push(this.image);
					break;

					case 1:
					this.image.src = "forniture/armchair2.png";
          bedroom.push(this.image);
					break;

					case 2:
					this.image.src = "forniture/armchair3.png";
          bedroom.push(this.image);
					break;

					case 3:
					this.image.src = "forniture/armchair4.png";
          bedroom.push(this.image);
					break;

					case 4:
					this.image.src = "forniture/bath.png";
          bedroom.push(this.image);
					break;
				}
		}

		else if (state == 4)
		{switch (this.id)
				{
					case 0:
					this.image.src = "forniture/panca.png";
          bathroom.push(this.image);
					break;

					case 1:
					this.image.src = "forniture/single_bed.png";
          bathroom.push(this.image);
					break;

					case 2:
					this.image.src = "forniture/desk1.png";
          bathroom.push(this.image);
					break;

					case 4:
					this.image.src = "forniture/double_bed.png";
          bathroom.push(this.image);
					break;

					case 3:
					this.image.src = "forniture/desk2.png";
          bathroom.push(this.image);
					break;

				}
		}
	}

};

var MyImageTile = function(x, y)
{
  this.x = x,
  this.y = y,
  this.scale = 1,
  this.image = new Image(),
  this.price,
  this.width= 0,
  this.height= 0,

  this.setup = function(image)
  {

      this.image.src = image.src;


  },

  this.draw = function()
  {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },

  this.update = function()
  {
    if (step == 1)
    {
    this.width = kitchen[PageOne].width + scaleOne[PageOne];
    this.height = kitchen[PageOne].height + scaleOne[PageOne];
    this.price = pricekitchen[PageOne];
    }

    if (step == 2)
    {
    this.width = kitchen[PageOne+1].width + scaleOne[PageOne+1];
    this.height = kitchen[PageOne+1].height + scaleOne[PageOne+1];
    this.price = pricekitchen[PageOne+1];
    }

    if (step == 3)
    {
    this.width = livingroom[PageTwo].width + scaleTwo[PageTwo];
    this.height = livingroom[PageTwo].height + scaleTwo[PageTwo];
    this.price = pricelivingroom[PageTwo];
    }

    if (step == 4)
    {
    this.width = livingroom[PageTwo+1].width + scaleTwo[PageTwo+1];
    this.height = livingroom[PageTwo+1].height + scaleTwo[PageTwo+1];
    this.price = pricelivingroom[PageTwo+1];
    }

    if (step == 5)
    {
    this.width = bedroom[PageThree].width + scaleThree[PageThree];
    this.height = bedroom[PageThree].height + scaleThree[PageThree];
    this.price = pricebedroom[PageThree+1];
    }

    if (step == 6)
    {
    this.width = bedroom[PageThree+1].width + scaleThree[PageThree+1];
    this.height = bedroom[PageThree+1].height + scaleThree[PageThree+1];
    this.price = pricebedroom[PageThree+1];
    }

    if (step == 7)
    {
    this.width = bathroom[PageFour].width + scaleFour[PageFour];
    this.height = bathroom[PageFour].height + scaleFour[PageFour];
    this.price = pricebathroom[PageFour];
    }

    if (step == 8)
    {
    this.width = bathroom[PageFour+1].width + scaleFour[PageFour+1];
    this.height = bathroom[PageFour+1].height + scaleFour[PageFour+1];
    this.price = pricebathroom[PageFour+1];
    }


  }
};


for (var i = 0; i < 20; i++ )///////////**DISPLAY ALL PICTURES**//
{
	var imgtile = new ImageTile(i);
	imgtile.setup();
	furnarray.push(imgtile);/////////////THIS IS THE ARRAY WHERE ALL THE IMAGES ARE STORED TO BE DISPLAYED
}

//////////////////////////////////////////////////////////////////CANVAS LISTEN FOR EVENTS

///LISTENING FOR KEBOARD EVENT

var keysDown = {};
addEventListener("keydown", function (e){
	keysDown[e.keyCode] = true;
}, false);



addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	Lpress = false;
	Rpress = false;
	Upress = false;
	Dpress = false;
}, false);


////LISENING FOR MOUSE EVENT

c.addEventListener('click', function canvas_click(ev)  //Detecting mouse CLICK
{

mx = ev.clientX - c.offsetLeft; //Pointer Horizontal coord - Pixels off set from Left
my = ev.clientY - c.offsetTop;  //Pointer Vertical coord - Pixels off set from Right

});

c.addEventListener('mousemove',function canvas_mousemove(ev) //Detecting mouse position (X,Y)
{

mouseX = ev.clientX - c.offsetLeft; //Pointer Horizontal coord - Pixels off set from Left
mouseY = ev.clientY - c.offsetTop; //Pointer Vertical coord - Pixels off set from Right

});

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

///////////////////////////////////////FUNCTIONS OF PLAY//////////////////////////////

function drawGrid()/////////////////////DRAW FOUR BUTTONS
{

	for (var i =0; i < tiles.length; i++)
	{
		tiles[i].draw();
	}
}

function drawImageTiles()///////////////////////////******DISPLAYING IMAGES OF FORNITURE**********/////////////////
{
	for (var i = 0; i < furnarray.length; i++)
	{
		ctx.drawImage(furnarray[page].image, 1010, 315);
		ctx.drawImage(furnarray[page+1].image, 1010, 315 + furnarray[page].spaced);
	}


}

function capture() ////////CAPTURE THE OFFICE
{
	if (is_sizing == true) /////////////////CHECK IF THE USER IS STILL DECIDING
	{
		if (mx < 1000 && mx > 0 && my > 0 && my < c.height) /////////////CHECK THE USER HAS DECIDED
		{

			offrightx = mouseX;  /////////SET THE OFFICE COORS TO BE SAME AS MOUSE COORD FIRST
			offrighty = mouseY;

			office(offleftx,offlefty); /////////// DISPLAY OFFICE AT 0,0 BUT MAKE IT MOVABLE

			is_sizing = false;

			mx = 0;
			my = 0;
		}
	}

	else { //IF IS NOT DECIDING:

			office(offrightx,offrighty); ///////DISPLAY OUR OFFICE AS THE USER HAS DECIDED TO BE


			MakeTheOffice();/////////////////AND THEN START CUSTOMIZE IT

			if (haschecked == false)
				{
				banner(); //////////////////////////LETS CHECK IF USER MEANT TO FIX THE OFFICE SIZE
				}

		}

}

function SideMenu(sidex,sidey)//////////////////////////////SIDE MENU BAR
{
  doorx = 1445;
  doory = 120;

	var roomwidth = offrightx * pxtocm - offleftx *pxtocm;
	var roomheight = offrighty * pxtocm - offlefty * pxtocm;
	var scalex = roomwidth/autoscale;
	var scaley = roomheight/autoscale;
	var squaremeters = scaley * scalex;



	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
  if (autoscale == 2 )
  {ctx.fillText("Scaled 1:50",sidex,sidey);}
  else if (autoscale == 4){ ctx.fillText("Scaled 1:25",sidex,sidey);}
  else {ctx.fillText("Scaled: ",sidex,sidey);}
	ctx.fillText("Room width:    "+scalex.toFixed(2) +"m.",sidex,sidey +30);
	ctx.fillText("Room height:   "+scaley.toFixed(2)+"m.",sidex,sidey +60);
	ctx.fillText("Squaremeters: "+squaremeters.toFixed(1)+"m^2",sidex,sidey +90);
  ctx.fillText("Floor Color: ",sidex,sidey +120);
  ctx.fillText("The overall price is:" + overallprice, sidex, sidey + 150);


	////////////////////////////////////******************POSITION OF LABELS/BUTTONS**********/////////////////////////
  //////////////////////////////////
  ctx.beginPath()
   ctx.rect(1150, 130, 25, 25);
   ctx.fillStyle = floorcolor1 ='#8b5a2b';
   ctx.fill();
   ctx.lineWidth = 2.5;
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.rect(1180, 130, 25, 25);
   ctx.fillStyle = floorcolor2 ='#ffa54f';
   ctx.fill();
   ctx.lineWidth = 2.5;
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.rect(1210 , 130, 25, 25);
   ctx.fillStyle = floorcolor3 ='#a0522d';
   ctx.fill();
   ctx.lineWidth = 2.5;
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.rect(1240 , 130, 25, 25);
   ctx.fillStyle = floorcolor4 = '#cd8500';
   ctx.fill();
   ctx.lineWidth = 2.5;
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.rect(1270 , 130, 25, 25);
   ctx.fillStyle = floorcolor5 = '#a1a1a1';
   ctx.fill();
   ctx.lineWidth = 2.5;
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.closePath();

   ctx.beginPath();
   ctx.rect(1300 , 130, 25, 25);
   ctx.fillStyle = floorcolor6 = 'white';
   ctx.fill();
   ctx.lineWidth = 2.5;
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.closePath();

   ctx.drawImage(parquet, 1300, 130, 25, 25);


  //////////////////////////
	ctx.font = "30px verdana";
	ctx.fillStyle = color1;
	ctx.fillText("KITCHEN", 1020, 240);
	///////////////////////////////////
	ctx.font = "30px verdana";
	ctx.fillStyle = color2;
	ctx.fillText("LIVINGROOM", 1285, 240);
	///////////////////////////////
	ctx.font ="30px verdana";
	ctx.fillStyle = color3;
	ctx.fillText("BEDROOM", 1020, 290);
	///////////////////////////////////////
  ctx.font ="30px verdana";
	ctx.fillStyle = color4;
	ctx.fillText("BATHROOM", 1285, 290);
  /////////////////////////////////////


  arrowup.src = 'pic/arrowup.png';
  arrowup.width = 15;
  arrowup.height = 15;

  arrowdown.src = 'pic/arrowdown.png'
  arrowdown.width = 15;
  arrowdown.height = 15;

  if (mx > 1150 && mx < 1150 + arrowup.width && my > 5 && my < 5 + arrowup.height)
  {
    autoscale += 2;
    mx = 0;
  }

  if (mx > 1150 && mx < 1150 + arrowdown.width && my > 25 && my < 25 + arrowdown.height)
  {
    autoscale -= 2 ;
    mx = 0;
  }

  if (autoscale > 4) {autoscale = 2;}
  if (autoscale < 2) {autoscale = 4;}
  ctx.drawImage(arrowup, 1150, 5, arrowup.width, arrowup.height);
  ctx.drawImage(arrowdown, 1150, 25, arrowdown.width, arrowdown.height);



	/////////////////*********************************TWO BUTTONS FOR SCROLLING******************/////////////
	if (state == undefined ) //////AGAIN STAY QUIET TILL THE USER MADE FIRST MOVE
	{
    if (isnotdoingit == false && centretop == 0 && centreleft == 0)
    {
      alert("Click on the door and then mouve the mouse inside your room to place a door and change the scale by clicking the two arrows next to scale label! ");
      isnotdoingit = true;
    }


      if ( hasdoored == false)
      {
        if (mouseX > doorx && mouseX < doorx + door.width &&
           mouseY > doory && mouseY < doory + door.height)
          {

            opendoor.src = 'pic/door_open.png';
            opendoor.width = 50;
            opendoor.height = 75;
            ctx.drawImage(opendoor, doorx, doory, opendoor.width, opendoor.height);
          }

        else {
            door.src = 'pic/door_close.png';
            door.width = 50;
            door.height = 75;
              ctx.drawImage(door, doorx, doory, door.width, door.height);
            }


        if (mx> doorx && mx < doorx + door.width && my > doory && my < doory + door.height)
          {
            isdooring = true;
          }
      }
  }

  if (state != undefined) {
    ctx.drawImage(arrowup, 1450, 430, 50, 50);

    ctx.drawImage(arrowdown, 1450, 500, 50, 50);}
	////////////////////*******************************SPACE FORNITURE***************************/////////////
	ctx.beginPath();
	ctx.moveTo(1000,490);
	ctx.lineTo(1500,490);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.closePath();



  ////////////////////*******************************ANOTHER ALERT FOR INSTRUCTIONS*********************/////////////////////
  if (state != undefined && displayed == false)
  {
  alert("Once clicked, furniture can be resized by using arrow-up and down keyboard's key!");
  displayed = true;
  }



	//////////////**************************************PRICE AND BRAND**************///////////////////
  ////////////////////////IF KITCHEN IS CLICKED
	if ( state == 1)
	{
	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricekitchen[PageOne]+ "£", 1300, 370);
	ctx.fillText("BRAND: " + brandkitchen[PageOne], 1300, 395);

	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricekitchen[PageOne+1] + "£", 1300, 590);
	ctx.fillText("BRAND: " + brandkitchen[PageOne+1], 1300, 615);
	}


  ///////////////// IF LIVINGROOM IS PRESSED
	if ( state == 2)
	{
	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricelivingroom[PageTwo]+ "£", 1300, 370);
	ctx.fillText("BRAND: " + brandlivingroom[PageTwo], 1300, 395);

	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricelivingroom[PageTwo+1] + "£", 1300, 590);
	ctx.fillText("BRAND: " + brandlivingroom[PageTwo+1], 1300, 615);
	}


  ///////////////// IF BEDROOM IS PRESSED
	if ( state == 3)
	{
	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricebedroom[PageThree]+ "£", 1300, 370);
	ctx.fillText("BRAND: " + brandbedroom[PageThree], 1300, 395);

	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricebedroom[PageThree+1] + "£", 1300, 590);
	ctx.fillText("BRAND: " + brandbedroom[PageThree+1], 1300, 615);
	}


  ///////////////// IF BATHROOM IS PRESSED
	if ( state == 4)
	{
	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricebathroom[PageFour]+ "£", 1300, 370);
	ctx.fillText("BRAND: " + brandbathroom[PageFour], 1300, 395);

	ctx.font = "20px verdana";
	ctx.fillStyle = "black";
	ctx.fillText("PRICE: " + pricebathroom[PageFour+1] + "£", 1300, 590);
	ctx.fillText("BRAND: " + brandbathroom[PageFour+1], 1300, 615);
	}

}

function DragandDrop()//////////////////////DRAG IT
{
  if (state !== undefined) /////THIS MEANS DO NOTHING TILL THE USER HAS CHOOSE WHICH CATEGORY
  {
    scaleOne.push(PageOne);///////////PUSHING VAR PAGE INTO MY ARRAY FOR RESIZING
    scaleTwo.push(PageTwo);
    scaleThree.push(PageThree);
    scaleFour.push(PageFour);


    switch (state)
    {
        case 1:
          if (mx > 1010 && mx < 1010 + kitchen[PageOne].width && my > 315 && my < 315 + kitchen[PageOne].height)
            {
              ctx.drawImage(kitchen[PageOne], mouseX, mouseY, kitchen[PageOne].width + scaleOne[PageOne], kitchen[PageOne].height + scaleOne[PageOne]);

              MyImage.src = kitchen[PageOne].src;

              if (38 in keysDown)///////////////////////////HANDLING KEYBOARD'S INPUT FOR BIGGER OR SMALLER IMAGE
              {
                scaleOne[PageOne] += 1;
              }

              if (40 in keysDown)
              {
                scaleOne[PageOne] -= 1;
              }
              alreadydone = false;

              step = 1;
            }

          else  if (mx > 1010 && mx < 1010 + kitchen[PageOne+1].width &&
                my > 315 + furnarray[page].spaced  &&
                my < 315 + furnarray[page].spaced + kitchen[PageOne+1].height)
              {
                ctx.drawImage(kitchen[PageOne+1], mouseX, mouseY, kitchen[PageOne+1].width + scaleOne[PageOne+1], kitchen[PageOne+1].height + scaleOne[PageOne+1]);

                MyImage.src = kitchen[PageOne+1].src;

                if (38 in keysDown)
                {
                  scaleOne[PageOne+1] += 1;
                }

                if (40 in keysDown)
                {
                  scaleOne[PageOne+1] -= 1;
                }

                  clicked = kitchen[PageOne+1];

                alreadydone = false;

                step = 2;

              }
        break;


        case 2:
            if (mx > 1010 && mx < 1010 + livingroom[PageTwo].width && my > 315 && my < 315 + livingroom[PageTwo].height)
            {
              ctx.drawImage(livingroom[PageTwo], mouseX, mouseY, livingroom[PageTwo].width + scaleTwo[PageTwo], livingroom[PageTwo].height + scaleTwo[PageTwo]);

              MyImage.src = livingroom[PageTwo].src;

              if (38 in keysDown)
              {
                scaleTwo[PageTwo] += 1;
              }

              if (40 in keysDown)
              {
                scaleTwo[PageTwo] -= 1;
              }
              alreadydone = false;

              step = 3;
            }

            if (mx > 1010 && mx < 1010 + livingroom[PageTwo+1].width &&
                my > 315 + furnarray[page].spaced  &&
                my < 315 + furnarray[page].spaced + livingroom[PageTwo+1].height)
              {
              ctx.drawImage(livingroom[PageTwo+1], mouseX, mouseY, livingroom[PageTwo+1].width + scaleTwo[PageTwo+1], livingroom[PageTwo+1].height + scaleTwo[PageTwo+1]);

              MyImage.src = livingroom[PageTwo+1].src;

              if (38 in keysDown)
              {
                scaleTwo[PageTwo+1] += 1;
              }

              if (40 in keysDown)
              {
                scaleTwo[PageTwo+1] -= 1;
              }
              alreadydone = false;

              step = 4;
            }
        break;



        case 3:
          if (mx > 1010 && mx < 1010 + bedroom[PageThree].width && my > 315 && my < 315 + bedroom[PageThree].height)
            {
              ctx.drawImage(bedroom[PageThree], mouseX, mouseY, bedroom[PageThree].width + scaleThree[PageThree], bedroom[PageThree].height + scaleThree[PageThree]);

              MyImage.src = bedroom[PageThree].src;

              if (38 in keysDown)
              {
                scaleThree[PageThree] += 1;
              }

              if (40 in keysDown)
              {
                scaleThree[PageThree] -= 1;
              }
              alreadydone = false;

              step = 5;
            }

          if (mx > 1010 && mx < 1010 + bedroom[PageThree+1].width &&
              my > 315 + furnarray[PageThree].spaced  &&
              my < 315 + furnarray[PageThree].spaced + bedroom[PageThree+1].height)
          {
            ctx.drawImage(bedroom[PageThree+1], mouseX, mouseY, bedroom[PageThree+1].width + scaleThree[PageThree+1], bedroom[PageThree+1].height + scaleThree[PageThree+1]);

            MyImage.src = bedroom[PageThree+1].src;

            if (38 in keysDown)
            {
              scaleThree[PageThree+1] += 1;
            }

            if (40 in keysDown)
            {
              scaleThree[PageThree+1] -= 1;
            }
            alreadydone = false;

            step = 6;
        }
        break;


        case 4:
          if (mx > 1010 && mx < 1010 + bathroom[PageFour].width && my > 315 && my < 315 + bathroom[PageFour].height)
          {
            ctx.drawImage(bathroom[PageFour], mouseX, mouseY, bathroom[PageFour].width + scaleFour[PageFour], bathroom[PageFour].height + scaleFour[PageFour]);

            MyImage.src = bathroom[PageFour].src;

            if (38 in keysDown)
            {
              scaleFour[PageFour] += 1;
            }

            if (40 in keysDown)
            {
              scaleFour[PageFour] -= 1;
            }
            alreadydone = false;

            step = 7;

          }

          if (mx > 1010 && mx < 1010 + bathroom[PageFour+1].width &&
              my > 315 + furnarray[page].spaced  &&
              my < 315 + furnarray[page].spaced + bathroom[PageFour+1].height)
            {
              ctx.drawImage(bathroom[PageFour+1], mouseX, mouseY, bathroom[PageFour+1].width + scaleFour[PageFour+1], bathroom[PageFour+1].height + scaleFour[PageFour+1]);

              MyImage.src = bathroom[PageFour+1].src;

              if (38 in keysDown)
              {
                scaleFour[PageFour+1] += 1;
              }

            if (40 in keysDown)
            {
              scaleFour[PageFour+1] -= 1;
            }
            alreadydone = false;

            step = 8;
          }
        break;

    }

    StickIt();
  }
}

function StickIt()/////////////////////////DROP IT
{
   if (mx > offleftx && mx < offrightx && my > offlefty && my < offrighty)
    {
      var image = new MyImageTile(mx, my);
      image.setup(MyImage);
      image.update();
      MyObjects.push(image);
      alreadydone = true;
      MyPrices.push(image.price);
      mx = 0;
    }

}

function MakeTheOffice()/////////////////EVERYTHING THAT COMES AFTER OFFICE SIZE CHOOSING
{
	if (is_sizing == true && haschecked == false) //THE USER IS STILL DECIDING
	{

		var pxtocm = 0.02645833;
		var roomwidth = offrightx * pxtocm - offleftx * pxtocm;
		var roomheight = offrighty * pxtocm  - offlefty * pxtocm;
		var scalex = roomwidth/autoscale;
		var scaley = roomheight/autoscale;
		var squaremeters = scaley * scalex;
		offrightx = mouseX; ////AND IS STILL DRAWING USING THE MOUSE
		offrighty = mouseY;

			if (offrightx > 1000 )
			{
			offrightx != mouseX;
			offrightx = 1000;
			}


			if (offrighty > 700 || mouseX > 1000 )
			{
			offrighty != mouseY;
			offrighty = 700;
			}

		office(offrightx,offrighty);

	}



	else 	////////////////////////THE USER IS NOW READY TO START DESIGN THE INTERIOR
	{
			office(offrightx, offrighty);

			offrightx += centretop; ///////CENTRE THE OFFICE
			offleftx  += centretop;

			offrighty  += centreleft;///////CENTRE THE OFFICE
			offlefty  += centreleft;

	}


  if (isdooring == true && mouseX > offleftx
    && mouseX < offrightx && mouseY - 50 > offlefty
    && mouseY  < offrighty && hasdoored == false)

    {
      if  (mouseX > 500 )//(mouseX - (1000 - offleftx) > mouseX - (offrightx))
      {
        doorarcx = offrightx;
        doorarcy = mouseY;

      }

      if (mouseX < 500 )//(mouseX - (1000 - offleftx) < mouseX - (offrightx))
      {
        doorarcx = offleftx;
        doorarcy = mouseY;

      }


    }


    ctx.beginPath();
    if (doorarcx == offleftx){
    ctx.arc(doorarcx, doorarcy, 50, 1.5*Math.PI, 0*Math.PI);}
    if (doorarcx == offrightx){
    ctx.arc(doorarcx, doorarcy, 50, 1*Math.PI,1.5*Math.PI);}
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(doorarcx, doorarcy);
    if (doorarcx == offleftx){
    ctx.lineTo(doorarcx + 50, doorarcy);}
    if (doorarcx == offrightx){
    ctx.lineTo(doorarcx - 50, doorarcy);}
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();


    if ( mx > offleftx && mx < offrightx && my > offlefty
      && my  < offrighty && isdooring == true)
      {
        ctx.beginPath();
        ctx.moveTo(doorarcx, doorarcy);
        ctx.lineTo(doorarcx , doorarcy);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        if (hasdoored == false) {hasdoored = true;}
        isdooring = false;
      }
}

function banner()//////////////////////JUST A JAVASCRIPT BANNER
{
	var roomwidth = offrightx * pxtocm;
	var roomheight = offrighty * pxtocm;
	var scalex = roomwidth/autoscale;
	var scaley = roomheight/autoscale;
	var squaremeters = scaley * scalex;
	//////////////////////////////////////****************ALERT************////////////////


    if (confirm("Your room size is going to be "+scalex.toFixed(1)+"m x "+scaley.toFixed(1)+"m") == true) {//IF IS TRUE, USER PRESSED OK, SO:
        is_sizing = false; /////IS NOT GOING TO BE IN RESIZE-MODE ANYMORE
        haschecked = true; /////////WE HAVE ALREADY CHECKED HIS DEEPER INTENTIONS
    }

    else  //////////////////////////////////////////////////IF OTHERWISE
	   {
		     is_sizing = true; //////////////////USER GOES BACK TO RESIZE MODE
   		haschecked = false; ////////////////HAS BEEN ASKED, BUT HAS NOT DECIDED
   		offleftx = 0;
   		offlefty = 0;
    }

    capture(); /////////////////WITH DEFINED PARAMETERS, LETS GO TO BACK TO OUR CAPTURE FUNCTION

}

function office(offrightx,offrighty) ///DRAW OFFICE UPON MakeTheOffice() PARAMETERS
{
  if (is_sizing == true)
  {
    ctx.beginPath();
    ctx.rect(offleftx, offlefty, offrightx , offrighty);
    ctx.fillStyle = myfinalcolor;
    ctx.fill();
    ctx.closePath();
  }

  else {
	ctx.beginPath();
  ctx.rect(offleftx, offlefty, offrightx - (1000 - offrightx)-5 , offrighty - (700 - offrighty) - 5);
  ctx.fillStyle = myfinalcolor;
  ctx.fill();
  ctx.closePath();
  }

  if (myfinalcolor == parquet)
  {
    ctx.drawImage(parquet, offleftx, offlefty, offrightx - (1000 - offrightx)-5 , offrighty - (700 - offrighty) - 5);
  }

	ctx.beginPath();
	ctx.moveTo(offleftx,offlefty);
	ctx.lineTo(offrightx,offlefty);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.moveTo(offleftx,offlefty);
	ctx.lineTo(offleftx,offrighty);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.moveTo(offleftx,offrighty);
	ctx.lineTo(offrightx,offrighty);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.moveTo(offrightx,offlefty);
	ctx.lineTo(offrightx,offrighty);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.closePath();
}

function blanket()//////////////////COVER SOME THINGS WE DON'T NEED TILL THE USER HAS DECIDED
{
	if (centretop != 0 && centreleft != 0 )
	 {
		ctx.beginPath();
		ctx.rect(1003, 200, 500, 600);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();

		ctx.font ="40px verdana";
		ctx.fillStyle = color3;
		ctx.fillText("TO CHOOSE THE ", 1010, 290);
		ctx.fillText("SIZE OF YOUR ROOM", 1010, 332);
		ctx.fillText("LEFT-CLICK ONCE ", 1010, 374);
		ctx.fillText("WIDTH AND HEIGH", 1010, 416);
		ctx.fillText("SUIT YOUR PLAN ", 1010, 458);
	 }
}

function container()//////////////DIVIDE THE DRAWING SIDE FROM THE MENU
{
	ctx.beginPath();
	ctx.moveTo(1000,0);
	ctx.lineTo(1000,700);

	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.closePath();
}

function Display()///////////////////////////////// DRAW EVERYTHING ON THE CANVAS
{

	drawGrid();
	container();
	drawImageTiles();
	MakeTheOffice();
	capture();
	SideMenu(sidex, sidey);
	blanket();
  DragandDrop();

  for (var i = 0; i < MyObjects.length; i++)
  {
    MyObjects[i].draw();
  }

  console.log(overallprice)

}

function clear()///////////////////////////////CLEAR THE SCREEN
{
	ctx.beginPath();
	ctx.rect(0, 0, c.width, c.height);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function update()///////////////////////////////UPDATE STUFF
{

  overallprice = 0;

  for (var i = 0; i < MyPrices.length; i++)
  {
    overallprice += MyPrices[i];
  }


	for (var i = 0; i < tiles.length; i++)
	{
		if (mouseX > tiles[i].posx && mouseX < tiles[i].posx + 250
			&& mouseY > tiles[i].posy && mouseY < tiles[i].posy + 50)
		{
			tiles[i].color = "#d9d9d9";
		}


		else {tiles[i].color = "white";}
	}

 ///////////////////////////**************COLORING MY FLOOR*****************///////////////////

   if (mx > 1150 && mx < 1175 && my > 130 && my < 155)
   {
     myfinalcolor = floorcolor1;

   }

   if (mx > 1180 && mx < 1205 && my > 130 && my < 155)
   {
     myfinalcolor = floorcolor2;

   }

    if (mx > 1210 && mx < 1235 && my > 130 && my < 155)
    {
      myfinalcolor = floorcolor3;

    }

    if (mx > 1240 && mx < 1265 && my > 130 && my < 155)
    {
      myfinalcolor = floorcolor4;

    }

   if (mx > 1270 && mx < 1295 && my > 130 && my < 155)
   {
     myfinalcolor = floorcolor5;

   }

    if (mx > 1300 && mx < 1325 && my > 130 && my < 155)
    {
      myfinalcolor = parquet;

    }
 	/////////////**************CENTERING THE OFFICE AND NOT MAKE THE H & W VALUES GROW*****************////////
		if ((offleftx - (1000 - offrightx)) > 0)
	{
		centretop = 0;
	}

		if ((offlefty - (700 - offrighty)) > 0)
	{
		centreleft = 0;
	}

	///////////////////////////**********************CHECKING ROOM BUTTONS CLICK*****************************/////////////
	if (mx > 1000 && mx < 1250 && my > 200 && my < 250)
	{
		state = 1;////////////////////////////////FIRST BUTTON IS PRESSED
		for (var i = 0; i < furnarray.length; i++)//DRAW THE IMAGES STORED IN THE ARRAY
		{
			furnarray[i].setup();/////////CALL THE SETUP OF TILES EVERYTIME
		}

		page = 0;///////////////////////SCROLL THE PAGE
    PageOne = 0;


	}

	if (mx > 1250 && mx < 1500 && my > 200 && my < 250)
	{
		state = 2;
		for (var i = 0; i < furnarray.length; i++)
		{
			furnarray[i].setup();
		}
		page = 0;
    PageTwo = 0;


	}

	if (mx > 1000 && mx < 1250 && my > 250 && my < 300)
	{
		state = 3;
		for (var i = 0; i < furnarray.length; i++)
		{
			furnarray[i].setup();
		}
		page = 0;
    PageThree = 0;

	}

	if (mx > 1250 && mx < 1500 && my > 250 && my < 300)
	{
		state = 4;
		for (var i = 0; i < furnarray.length; i++)
		{
			furnarray[i].setup();
		}
		page = 0;
    PageFour = 0;

	}

  //////////////////////////*******************CHECKING SCROLLING BUTTONS CLICK****************///////////////

	if (mx > 1450 && mx < 1450 + 50 && my > 430 && my < 430 + 50)
	{

		page -=1;
    switch (state) {
      case 1:
      PageOne--;
      break;


      case 2:
      PageTwo --;
      break;


      case 3:
      PageThree --;
      break;


      case 4:
      PageFour --;
      break;
    }

			mx = 0;
			my = 0;

	}

	if (mx > 1450 && mx < 1450 + 50 && my > 500 && my < 500 + 50)
	{
		page +=1;
    switch (state) {
      case 1:
      PageOne++;
      break;


      case 2:
      PageTwo ++;
      break;


      case 3:
      PageThree ++;
      break;


      case 4:
      PageFour ++;
      break;
    }
			mx = 0;
			my = 0;
	}

	////////////////////////***************PAGES****************////////////
	if (page > 3) {page = 0;}

  else if (page < 0) {page = 3;}

  if (PageOne > 3) {PageOne = 0;}

  else if (PageOne < 0) {PageOne = 3;}

  if (PageTwo > 3) {PageTwo = 0;}

  else if (PageTwo < 0) {PageTwo = 3;}

  if (PageThree > 3) {PageThree = 0;}

  else if (PageThree < 0) {PageThree = 3;}

  if (PageFour > 3) {PageFour = 0;}

  else if (PageFour < 0) {PageFour = 3;}


	/////////////////////////****************COLOR************/////////////////////////////

	if (mx > 1000 && mx < 1250 && my > 200 && my < 250)
  	{
  		color1 = "grey";
  	}

  else if (mx > 1250 && mx < 1500 && my > 200 && my < 250)
  	{
  		color2 = "grey";
  	}

  else	if (mx > 1000 && mx < 1250 && my > 250 && my < 300)
  	{
  		color3 = "grey";
  	}

	 else if (mx > 1250 && mx < 1500 && my > 250 && my < 300)
    	{
    		color4 = "grey";
    	}
 else 	{color4 = "black", color3 = "black", color2 = "black", color1 = "black";}

}

function setup()///////////////////////////////NESTED "FOR LOOPS" FOR THE BUTTONS
{
	for (var j=0; j<2; j++) /////////////////SET THE TILES ROWS NUMBER
	{
		for(var k=0; k<2; k++)///////////////SET THE TILES COLUMNS NUMBER
		{
			var tile = new Tile( 1000 + k* 250, 200 + j * 50);

			tiles.push(tile);
		}
	}


}

function GameLoop()/////////// LOOP IT
{
	clear();
	update();
	Display();
	setTimeout(GameLoop, time);

}


setup();
GameLoop();


}
