let AngleToMouse         //Other
let DistanceToMouse 
let LX
let LY
let DtoLX
let DtoLY
let mouseLX,mouseLY
let mouseSpeed
let Round = 1
let TX = []
let TY = []
let TT = []
let TU = []
let TN = 150
let TUSpeed = 20
let Transparency = 15
let BounceNum = 0
let Count = false
let Clicked = false
let Dragging = false
let HoldD,HoldA
let Newtons
let HaveHit = true
let HaveGrab = true
let HaveThrown = true
let ShowBounce = false
let ShowBounceFor = 200
let EX,EY
let Elastic = false
let DtoE
let AtoE
let MtoE = 2000
let RClicked = false


let Weight = 1      //Physics
let mouseWeight = 5
let Friction = 0.05
let Gravity = 9.81


let Motion = [0,0]    //Starting
let X = 200
let Y = 200
let W = 25
let H = 25
let StartMiddle = true

function setup() {
  Font = loadFont("/Fonts/Font.ttf")
  NumberFont = loadFont("/Fonts/NumberFont.ttf")
  
  textAlign(CENTER)
  
  createCanvas(800, 700);
  angleMode(DEGREES)
  if(StartMiddle == true)
    {
      X = width/2
      Y = height/2
    }
  for(let i = 0; i <= TN; i++)
    {
      TU.push(i%TUSpeed)
      TX.push(X)
      TY.push(Y)
      TT.push(i/Transparency)
    }
  document.oncontextmenu = () => false;
}

function draw() {
  background(185, 199, 199);
    LX = X
  LY = Y
  X += Motion[0]
  Y += Motion[1]
  if(Round == 1)
    {
      Round = 2
      mouseLX = mouseX
      mouseLY = mouseY
    }else if(Round == 2)
      {
        Round = 1
        mouseSpeed = abs(sqrt(((mouseLX-mouseX)*(mouseLX-mouseX))+((mouseLY-mouseY)*(mouseLY-mouseY))))
      }
  X = constrain(X,W,width-W)
  Y = constrain(Y,H,height-H)
  DtoLX = abs(LX-X)
  DtoLY = abs(LY-Y)
  if(DtoLX == 0)
    {
          Motion[0] = -Motion[0]
      if(Count == true)
        {
         BounceNum++
        }
          
    }
  if(DtoLY == 0)
    {
          Motion[1] = -Motion[1]
      if(Count == true)
        {
          BounceNum++
        }
          
    }
    
  Motion[0] = lerp(Motion[0],0,Friction)
  Motion[1] = lerp(Motion[1],0,Friction)
  
  
  DistanceToMouse = sqrt((abs(Y-mouseY)*abs(Y-mouseY))+(abs(X-mouseX)*abs(X-mouseX)))
  if(DistanceToMouse >= W)
    {
      AngleToMouse = atan2((mouseY-Y),(mouseX-X))
    }else
      {
        if(Clicked == false)
          {
            Newtons = (0.936*mouseWeight)*mouseSpeed
            Motion[0] += cos(AngleToMouse+180)*((0.936*(1/Weight))*Newtons)
        Motion[1] += sin(AngleToMouse+180)*((0.936*(1/Weight))*Newtons)
            BounceNum=0
        Count = true
            HaveHit = true
            if(HaveHit == true && HaveGrab == true && HaveThrown == true)
    {
      ShowBounce = true
    }
          }else
            {
              if(DistanceToMouse <= W/2)
              {
                if(Dragging == false)
                {
                  HoldD=DistanceToMouse
                  HoldA=AngleToMouse
                }
              
              BounceNum=0
        Count = true
              Motion = [0,0]
              Dragging = true
                HaveGrab = true
              }
            }
        
      }
  
  if(abs(Motion[0]) < 0.1 && abs(Motion[1]) < 0.1)
    {
      Count = false
    }
  
  if(mouseIsPressed)
    {
      if(mouseButton == RIGHT)
        {
          if(MtoE > 40)
            {
              RClicked = true

            }else
              {          
              Elastic = false
              }
          
        }
      if(mouseButton == LEFT)
        {
          Clicked = true
        }
      
    }else
      {
        if(RClicked == true)
          {
            Elastic = true
            EX = mouseX
            EY = mouseY
          }
        MtoE = 200
        Clicked = false
        RClicked = false
        if(Dragging == true)
          {
            Newtons = (0.936*mouseWeight)*mouseSpeed
            Motion[0] += cos(AngleToMouse)*((0.936*(0.5/Weight))*Newtons)
        Motion[1] += sin(AngleToMouse)*((0.936*(0.5/Weight))*Newtons)
            Count = true
            if(HaveHit == true && HaveGrab == true && HaveThrown == true)
    {
      ShowBounce = true
    }
            HaveThrown = true
            
          }
        Dragging = false
      }
  if(Dragging == true)
    {
      X=lerp(X,(HoldD*cos(HoldA+180))+mouseX,0.5)
      Y=lerp(Y,(HoldD*cos(HoldA+180))+mouseY,0.5)
      X = constrain(X,W,width-W)
  Y = constrain(Y,H,height-H)
    }
  
  if(Elastic == true)
    {
      AtoE = atan2((EY-Y),(EX-X))
      DtoE = abs(sqrt(((EX-X)*(EX-X))+((EY-Y)*(EY-Y))))
      Motion[0] += cos(AtoE)*(DtoE/100)
      Motion[1] += sin(AtoE)*(DtoE/100)
  stroke(60,73,82)
  fill(60,73,82)
  strokeWeight(W/4)
      line(X,Y,EX,EY)
      circle(EX,EY,W/8)
      MtoE = abs(sqrt(((EX-mouseX)*(EX-mouseX))+((EY-mouseY)*(EY-mouseY))))
    }
  
  for(let i=0;i<=TN;i++)
    {
      if(TU[i] == TUSpeed-1)
        {
          TX[i] = X
          TY[i] = Y
        }
      TU[i] += 1
      TU[i] = TU[i]%TUSpeed
      stroke(255)
      strokeWeight(W*2)
         line(TX[i],TY[i],TX[i+1],TY[i+1])
      
    }
  
  fill(248, 250, 252)
  stroke(60,73,82)
  strokeWeight(2.5)
  ellipse(X,Y,2*W,2*H)
  
  textFont(NumberFont)
  noStroke()
  textStyle(BOLD)
  fill(240, 245, 246)
  textSize(60)
  text(BounceNum,40,60)
  
  textFont(Font)
  if(HaveHit == false)
    {
      text("Hit Me!",X,Y-50)
    }
  if(HaveHit == true && HaveGrab == false && abs(Motion[0]) < 0.1&& abs(Motion[1]) < 0.1)
    {
      text("Grab Me!",X,Y-50)
    }
  if(HaveHit == true && HaveGrab == true && HaveThrown == false)
    {
      text("Throw Me!",X,Y-50)
    }
  if(ShowBounce == true && ShowBounceFor < 200)
    {
      text(" <= Counts The Bounces",325,60)
      ShowBounceFor++
    }
}
