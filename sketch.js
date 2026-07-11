let C = 0
let CPS = 0
let PB = 0
let PBText = ""
let ResetPBClicks = 0
let ResetPBTimer = 0
let PBA = 255

let ShowBigBrain = 0

let Started = false
let ST = null
let CT = 0
let DC = 0

let Menu = true

let IS = 0


function preload()
{
  ClickTracker = createButton("")
  ClickTracker.mousePressed(Click)
  ClickTracker.mouseOver(ClickTrackerOverColor)
  ClickTracker.mouseOut(ClickTrackerOutColor)
  ClickTracker.style("font-weight","bold")
  ClickTracker.style("background-color","rgb(230,180,80)")
  ClickTracker.style("color","rgb(45,45,60)")
  ClickTracker.style("border-color","rgb(230,180,80)")
  ClickTracker.style("border-style","outdent")

  StartButton = createButton("START")
  StartButton.mouseReleased(MenuOff)
  StartButton.mouseOver(StartButtonOverColor)
  StartButton.mouseOut(StartButtonOutColor)
  StartButton.style("font-weight","bold")
  StartButton.style("background-color","rgb(230,180,80)")
  StartButton.style("color","rgb(45,45,60)")
  StartButton.style("border-color","rgb(230,180,80)")
  StartButton.style("border-style","outdent")

  ResetPBButton = createButton("")
  ResetPBButton.mousePressed(ResetPB)
  ResetPBButton.style("background-color","transparent")
  ResetPBButton.style("border","none")
  ResetPBButton.style("color","rgb(255,255,180)")
  ResetPBButton.style("font-weight","bold")

  ApplePay = loadSound("Sounds/ApplePay.mp3")
  BigBrain = loadSound("Sounds/BigBrain.mp3")
  Boom = loadSound("Sounds/Boom.mp3")
  Bruh = loadSound("Sounds/Bruh.mp3")
  EmotionalDamage = loadSound("Sounds/EmotionalDamage.mp3")
  Fahhh = loadSound("Sounds/Fahhh.mp3")
  Hallelujah = loadSound("Sounds/Hallelujah.mp3")
  Laugh = loadSound("Sounds/Laugh.mp3")
  MiBombo = loadSound("Sounds/MiBombo.mp3")
  Rizz = loadSound("Sounds/Rizz.mp3")
  Scammer = loadSound("Sounds/Scammer.mp3")
  Wow = loadSound("Sounds/Wow.mp3")

  Brain = loadImage("Images/Brain.gif")
}

function setup() {
  let cnv = createCanvas(500, 500);
  textAlign(CENTER,CENTER)
  imageMode(CORNER)

  ApplePay.setVolume(0.5)

  cnv.elt.oncontextmenu = () => false; 

  if(getItem("PB") != null)
  {
    PB = getItem("PB")
  }
}

function draw() {

  resizeCanvas(windowWidth,windowHeight)
  if(width <= height)
  {
    IS = width
  }else
  {
    IS = height
  }

  ClickTracker.position(width/5,height/5)
  ClickTracker.size(width*(3/5),height*(3/5))
  ClickTracker.style("font-size",IS/4 + "px")
  ClickTracker.style("border-width",IS/80 + "px")
  
  StartButton.position(width/5,height*(3/5))
  StartButton.size(width*(3/5),height/4)
  StartButton.style("font-size",IS/(20/3) + "px")
  StartButton.style("border-width",IS/80 + "px")

  ResetPBButton.position(0,0)
  ResetPBButton.size(width,height/6)
  ResetPBButton.style("font-size",IS/16 + "px")

  DC--
  ResetPBTimer--
  ShowBigBrain--
  
  if(Menu == false)
  {
    CPSScreen()
  }else
  {
    MenuScreen()
  }
}

function CPSScreen()
{
  ClickTracker.position(width/5,height/5)
  StartButton.position(-IS*100,-IS*100)
  ResetPBButton.position(-IS*100,-IS*100)
  ClickTracker.html(C)
  CT = millis()
  if(Started == false)
  {
    ST = millis()
  }
  
  background(100,100,150)


  textSize(IS/5)
  textStyle(BOLD)
  noStroke()
  text(round((CT-ST)/1000),width/2,height*(73/80))

  if(round((CT-ST)/1000) == 10)
  {
    Reset()
  }
}

function MenuScreen()
{
  ClickTracker.position(-IS*100,-IS*100)
  StartButton.position(width/5,height*(3/5))
  ResetPBButton.position(0,0)

  if(ResetPBClicks == 1 && ResetPBTimer > 0)
  {
    ResetPBButton.html("RESET PB?")
    PBA = 0
  }else
  {
    ResetPBButton.html("")
    PBA = 255
  }

  if(ResetPBTimer <=0)
  {
    ResetPBClicks = 0
  }

  if(ResetPBClicks == 2 && ResetPBTimer > 0)
  {
    PB = 0
    storeItem("PB",PB)
    ResetPBClicks = 0
    ResetPBTimer = 0
    PBText = ""
    Bruh.play()
  }
  background(100,100,150)
  textSize(IS/4)
  textStyle(BOLD)
  noStroke()
  fill(255,255,180)
  text(round(CPS,4),width/2,height*(4/10))

  textSize(IS/8)
  fill(255,255,180,PBA)
  text(PBText + round(PB,4),width/2,height*(1/10))

  if(ShowBigBrain > 0)
  {
    image(Brain,(width/2)-(IS/8),0,IS/4,IS/4)
  }else
  {
    BigBrain.pause()
  }
}

function MenuOff()
{
  if(DC <= 0)
  {
    Menu = false
    ST = 0
    Boom.play()
    ShowBigBrain = 0
        BigBrain.pause()
        BigBrain.playMode('restart')
  }
  
}

function Click()
{
  if(mouseButton == LEFT)
  {
      C++
    
    ApplePay.play()

  if(Started == false)
  {
    ST = millis()
    Started = true
  }
  }

}

function StartButtonOverColor()
{
  StartButton.style("background-color","rgb(220,170,70)")
  StartButton.style("border-color","rgb(220,170,70)")
}

function StartButtonOutColor()
{
  StartButton.style("background-color","rgb(230,180,80)")
  StartButton.style("border-color","rgb(230,180,80)")
}

function ClickTrackerOverColor()
{
  ClickTracker.style("background-color","rgb(220,170,70)")
  ClickTracker.style("border-color","rgb(220,170,70)")
}

function ClickTrackerOutColor()
{
  ClickTracker.style("background-color","rgb(230,180,80)")
  ClickTracker.style("border-color","rgb(230,180,80)")
}

function ResetPB()
{
  ResetPBClicks++
  ResetPBTimer = 50
}

function Reset()
{
    Started = false
    CPS = round(C/((CT-ST)/1000),2)
    C = 0
    ST = 0
    DC = 100
  if(CPS > 100)
  {
    Scammer.play()
  }else if(CPS <= 100,CPS > 10)
  {
    BigBrain.play()
    ShowBigBrain = 200
  }else if(CPS <= 10 && CPS > 8)
  {
    Wow.play()
  }else if(CPS <= 8 && CPS > 5)
  {
    Rizz.play()
  }else if(CPS <= 5 && CPS > 4)
  {
    Laugh.play()
  }else if(CPS <= 5 && CPS > 4)
  {
    Laugh.play()
  }else if(CPS <= 4 && CPS > 2)
  {
    EmotionalDamage.play()
  }else if(CPS <= 2 && CPS > 1)
  {
    Fahhh.play()
  }else if(CPS <= 1)
  {
    MiBombo.play()
  }

  if(CPS > PB)
  {
    PB = CPS
    storeItem("PB",PB)
    PBText = "NEW: "
    Hallelujah.play()
  }else
  {
    PBText = ""
  }
  Menu = true
}
