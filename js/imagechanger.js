 window.onLoad = function()
 {
setInterval(function(){m1_e_slide()},1000);
setInterval(function(){m1_m_slide()},1000);
setInterval(function(){m1_s_slide()},1000);
setInterval(function(){m2_e_slide()},1000);
setInterval(function(){m2_m_slide()},1000);
setInterval(function(){m2_s_slide()},1000);
setInterval(function(){m3_e_slide()},1000);
setInterval(function(){m3_m_slide()},1000);
setInterval(function(){m3_s_slide()},1000);
 }

function sleep(milliseconds) 
{
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) 
  {
    if ((new Date().getTime() - start) > milliseconds)
    {
      break;
    }
  }
}


var M1_M = document.getElementById('m1-mech');
var M1_E = document.getElementById('m1-elec');
var M1_S = document.getElementById('m1-soft');
var M2_E = document.getElementById('m2-elec');
var M2_S = document.getElementById('m2-mech');
var M2_M = document.getElementById('m2-soft');
var M3_E = document.getElementById('m3-elec');
var M3_M = document.getElementById('m3-mech');
var M3_S = document.getElementById('m3-soft');


function m1_e_slide()
{
  M1_E.src = "./images/matsya1/elec1.jpg";
  sleep(500);
  M1_E.src= "./images/matsya1/elec2.jpg";
}

function m1_m_slide()
{
   M1_M.src = "./images/matsya1/mech1.jpg";
  //  m2.src = "../images/matsya1/mech2.jpg";
}

function m1_s_slide()
{
   M1_S.src = "./images/matsya1/soft1.png";
   sleep(500);
   M1_S.src = "./images/matsya1/soft2.png";
}

function m2_e_slide()
{
   M2_E.src = "./images/matsya2/elec1.jpg";
   sleep(500);
   M2_E.src = "./images/matsya2/elec2.jpg";
}

function m2_m_slide()
{
   M2_M.src = "./images/matsya2/mech1.png";
   sleep(500);
   M2_M.src = "./images/matsya2/mech2.png";
   sleep(500);
   M2_M.src = "./images/matsya2/mech3.jpg";
}

function m2_s_slide()
{
   M2_S.src = "./images/matsya2/soft1.png";
   sleep(500);
   M2_S.src = "./images/matsya2/soft2.png";
   // sleep(500);
}

function m3_e_slide()
{
   M3_E.src = "./images/matsya3/elec1.jpg";
   sleep(500);
   M3_E.src = "./images/matsya3/elec2.jpg";
   // sleep(500);
}

function m3_m_slide()
{
   M3_M.src = "./images/matsya3/mech1.jpg";
   sleep(500);
   M3_M.src = "./images/matsya3/mech2.png";
   sleep(500);

   M3_M.src = "./images/matsya3/mech3.jpg";
   // sleep(500);
}

function m3_s_slide()
{
   M3_S.src = "./images/matsya3/soft1.png";
   sleep(500);
   M3_S.src = "./images/matsya3/soft2.jpg";
   sleep(500);

   M3_S.src = "./images/matsya3/soft3.png";
}
