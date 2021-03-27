let x = 0;
let nbarray = [];

//initial content
function setup() {
  //guide by alert (\n -> next line)
  alert(" Press F11 for full screen experience \n Use right slider to change background color \n Use left slider to change core shape \n move mouse to push big box \n change background line color through cursor position ");
  //canvas size
  createCanvas(960,540, WEBGL);
  //things in nbarray
  for(let i=0;i<6;i+=1){
    nbarray.push(new myBox(-height/2+(height/5)*i,-height/2+(height/5)*i,0,40));
  }
  //speed of frame
  frameRate(40);
  //background slider
  slider = createSlider(0, 255, 40);
  slider.position(10, height + 5);
  slider.style('width', '160px');
  //shape slider
  detailX = createSlider(2, 19, 1);
  detailX.position(780, height + 5);
  detailX.style('width', '160px');
}

function draw() {
  let val = slider.value();
  background(val);
  //call 'v' in nbarray and run it
  nbarray.forEach( (v)=>{v.display();} );
  //cursor
  cursor('https://i.imgur.com/0AixYPh.gif');
}

//hardcore
class myBox{
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx = 1;
    this.my = 2;
    //random color
    this.cc = color(random(255),200+random(55),255);
    //stelas xyz, 
    this.stela = new stela(this.x,this.y,this.z,this.size*0.15,this.size*2.5);
    this.stela1 = new stela1(this.x,this.y,-this.z*5,this.size*(15+random(10)),this.size*1); //bg line
    this.stela2 = new stela2(this.x,this.y,this.z,this.size*0.25,this.size*3);
    this.stela3 = new stela3(this.x,this.y,this.z,this.size*0.4,this.size*3.5);
    this.stela4 = new stela4(this.x,this.y,this.z,this.size*0.3,0); //sphere core
  }
  //show the box
  display(){
    push();
    noFill();
      translate(this.x,this.y,this.z);  
      if (mouseX-width/2 > this.x-this.size/2 && 
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2){
        rotateX(frameCount*0.02); //rotate when cursor on it
        rotateY(frameCount*0.02); //rotate when cursor on it
        this.mx = this.mx+0.5;
        this.my = this.my+0.5;
        //random color
        this.cc = color(random(255),200+random(55),255);
        //audio
        //ele = createAudio('audio.mp3')
        //ele.autoplay(true);
        }
    //show stela
    this.stela.display();
    this.stela1.display();
    this.stela2.display();
    this.stela3.display();
    this.stela4.display();
    //hardcore box
    rotateZ(millis() / 500); //rotate itself
    rotateY(millis() / 500);
    stroke(this.cc);
    box(this.size);
    pop();
    this.move();
  }
  //hardcore movement
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    if (this.y>height/2){this.my = -1*this.my;}
    if (this.y<-height/2){this.my = -1*this.my;}  
    this.x = this.x + this.mx;
    this.y = this.y + this.my;
  }
}

//stela
class stela{
  constructor(x,y,z,size,cdx){ //stela rotate center
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // stela rotate distance
    this.cdx=cdx-50;
    this.cc = color(160+random(95),255,random(255)); // random color
  }
  display(){ //stela buildup
    push();
      noStroke();
      rotateX(frameCount*0.05);
      rotateZ(frameCount*0.04);
      translate(this.cdx,0,0);  
      stroke(this.cc);
      noFill();
      //stela = box
      box(this.size);
    pop();
  }
}

//stela1 bg line
class stela1{
  constructor(x,y,z,size,cdx){ //stela rotate center
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // stela rotate distance
    this.cdx=cdx-50;
  }
  display(){ //stela buildup
    push();
      noStroke();
      rotateX(frameCount*0.01);
      rotateZ(frameCount*0.01);
      translate(this.cdx,0,0);  
      stroke(155,255,mouseX);
      noFill();
      //stela = box
      sphere(this.size,6,3)
    pop();
  }
}

//stela2
class stela2{
  constructor(x,y,z,size,cdy){ //stela rotate center
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // stela rotate distance
    this.cdy=cdy-50;
    this.cc = color(160+random(95),255,random(255)); // random color
  }
  display(){ //stela buildup
    push();
      noStroke();
      rotateZ(frameCount*0.02);
      rotateY(frameCount*0.04);
      translate(this.cdy,0,0);  
      stroke(this.cc);
      noFill();
      //stela2 = box
      box(this.size);
    pop();
  }
}

//stela3
class stela3{
  constructor(x,y,z,size,cdz){ //stela rotate center
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // stela rotate distance
    this.cdz=cdz-50;
    this.cc = color(random(255),200+random(55),255); // random color
  }
  display(){ //stela buildup
    push();
      noStroke();
      rotateZ(frameCount*0.04);
      rotateX(frameCount*0.04);
      rotateY(frameCount*0.04);
      translate(this.cdz,0,0);  
      stroke(this.cc);
      noFill();
      //stela3 = box
      box(this.size);
    pop();
  }
}

//stela4 core
class stela4{
  constructor(x,y,z,size,cdx){ //stela rotate center
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // stela rotate distance
    this.cdx=cdx;
    this.cc = color(160+random(95),255,random(255)); // random color
  }
  display(){ //stela buildup
    push();
      noStroke();
      rotateX(frameCount*0.05);
      rotateZ(frameCount*0.04);
      translate(this.cdx,0,0);  
      stroke(this.cc);
      noFill();
      //stela4 = sphere
      sphere(this.size,5+detailX.value(),detailX.value());
    pop();
  }
}