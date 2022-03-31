var i1 =Math.floor (Math.random()*6)+1;
var i2 =Math.floor (Math.random()*6)+1;

document.querySelectorAll("img")[0].setAttribute("src","images/dice"+i1+".png");
document.querySelectorAll("img")[1].setAttribute("src","images/dice"+i2+".png");
if (i1>i2) {
  document.querySelector("h1").innerHTML="Player 1 win!";
  } else if (i1<i2) {
    document.querySelector("h1").innerHTML="Player 2 win!";
} else {
    document.querySelector("h1").innerHTML="Draw!";
}
