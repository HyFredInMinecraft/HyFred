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
let Points = 0
let PointsCount = false
let WhichSound
let PlaySound = false
let Bounce1;
let Bounce2;
let Bounce3;
let Bounce4;
let Bounce5;
let Bounce6;
let Start = true
let ShowPoints = false
let StartCount = 0


let Weight = 1      //Physics
let mouseWeight = 5
let Friction = 0.05


let Motion = [0,0]    //Starting
let X = 200
let Y = 200
let W = 25
let H = 25
let StartMiddle = true
let Volume = 2

function setup() {
  Bounce1 = loadSound("Sounds/Bounce1.mp3")
  Bounce2 = loadSound("Sounds/Bounce2.mp3")
  Bounce3 = loadSound("Sounds/Bounce3.mp3")
  Bounce4 = loadSound("Sounds/Bounce4.mp3")
  Bounce5 = loadSound("Sounds/Bounce5.mp3")
  Bounce6 = loadSound("Sounds/Bounce6.mp3")
  Bounce1.setVolume(Volume)
  Bounce2.setVolume(Volume)
  Bounce3.setVolume(Volume)
  Bounce4.setVolume(Volume)
  Bounce5.setVolume(Volume)
  Bounce6.setVolume(Volume)
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
      if(Start == false)
        {
          PlayTheSound()
        }
      if(Count == true)
        {
         BounceNum++
        }
          
    }
  if(DtoLY == 0)
    {
          Motion[1] = -Motion[1]
      if(Start == false)
        {
          PlayTheSound()
        }
      if(Count == true)
        {
          BounceNum++
        }
          Motion[1]+=0.001
    }
    
  Motion[0] = lerp(Motion[0],0,Friction)
  Motion[1] = lerp(Motion[1],0,Friction)
  if(abs(Motion[0]) <= 0.1)
    {
      StartCount+=1
    }else
      {
        StartCount = 0
      }
  if(abs(Motion[1]) <= 0.1)
    {
      StartCount+=1
    }else
      {
        StartCount = 0
      }
  if(StartCount >= 150)
    {
      Start=true
    }
  
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
            
                PlayTheSound()
            
            if(PointsCount == true)
        {
          PointsCount = false
          Points += BounceNum
        }
            BounceNum=0
        Count = true
            if(PointsCount == true)
        {
          PointsCount = false
          Points += BounceNum
        }
            PointsCount = true
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
              
                if(PointsCount == true)
        {
          PointsCount = false
          Points += BounceNum
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
      if(PointsCount == true)
        {
          PointsCount = false
          Points += BounceNum
        }
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
            PointsCount = true
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
  
  textAlign(LEFT)
  textFont(NumberFont)
  noStroke()
  textStyle(BOLD)
  fill(240, 245, 246)
  textSize(60)
  text(BounceNum,20,60)
  textAlign(CENTER)
  
  if(ShowPoints==true)
    {
      textAlign(RIGHT)
  textWidth(35*Points.length)
  text(Points,width-20,60)
  textAlign(CENTER)
    }
  
  
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

function PlayTheSound()
    {
      if(Dragging == false)
        {
          Start = false
      WhichSound = round(random(1,6))
      if(WhichSound == 1)
        {
          Bounce1.play()
        }
      if(WhichSound == 2)
        {
          Bounce2.play()
        }
      if(WhichSound == 3)
        {
          Bounce3.play()
        }
      if(WhichSound == 4)
        {
          Bounce4.play()
        }
      if(WhichSound == 5)
        {
          Bounce5.play()
        }
      if(WhichSound == 6)
        {
          Bounce6.play()
        }
        }
      
    }
