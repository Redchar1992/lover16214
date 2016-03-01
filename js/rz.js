var screenWidth = $(window).width(),
	screenHeight = $(window).height();

	$("#dbd_right").css("left",160+"px");
	var scrznw = parseInt($(".score_resultNow").css("top"));
	$(".average").css("top",scrznw+80+230-20+"px");
	var art = parseInt($(".average").css("top"));
	$(".swt").css("top",art+40+5+"px");
	var stp = parseInt($(".swt").css("top"));
	$(".join a").css("top",stp+20+10+"px");
	$(".paiHang").css("top",stp+35+37+"px");



//需调用的数据：record_left(左半心坐标点集)、record_right(右半心坐标点集)、score_left(左半心评分)、score_right(右半心评分)
var record_left = [154,56,152,52,150,51,147,49,145,48,144,47,143,46,140,44,139,44,138,43,134,40,130,39,126,37,118,35,109,33,103,30,99,30,96,30,91,30,89,30,85,30,83,30,81,30,78,31,75,33,73,35,66,39,61,43,58,48,56,52,52,58,48,64,44,69,40,75,36,81,35,85,32,89,30,95,27,101,27,103,25,110,24,113,24,120,24,129,24,137,28,148,33,157,40,170,46,180,55,194,67,207,84,222,102,236,122,247,141,257,150,263,153,265,154,266,155,269];
var record_right = [13,54,15,53,16,53,17,53,20,51,23,49,27,45,31,42,34,40,37,38,39,38,40,36,42,35,46,35,48,33,49,33,50,33,52,33,55,32,61,31,67,31,71,31,75,31,82,31,86,31,90,32,93,34,97,35,101,38,105,41,108,42,111,44,112,46,115,48,117,49,121,52,122,54,126,58,130,63,135,68,138,71,140,75,142,78,145,83,147,87,148,90,149,93,150,96,151,99,152,102,153,106,153,110,153,111,153,116,155,120,155,124,155,128,155,130,155,132,152,138,151,140,148,146,144,150,140,155,136,162,132,167,128,174,123,179,120,184,116,188,114,189,112,193,111,196,108,199,104,202,100,205,96,209,93,212,88,217,83,221,73,228,65,237,60,240,56,246,53,249,49,254,45,257,43,259,39,262,35,264,31,267,28,270,24,271,20,274,14,277,11,280,7,283,5,286,1,288,-1,290,-2,291];
var score_left = 84.294;
var score_right = 91.069;
function drawLeft(record1){
	var cvs = document.getElementById("dbd_left");
	var ctx=cvs.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.strokeStyle="#000";
		ctx.moveTo(record1[0],record1[1]);
		for(var i = 2;i<record1.length;i+=2){
			ctx.lineTo(record1[i],record1[i+1]);
			ctx.stroke();
		}

}
drawLeft(record_left);
function drawRight(record2){
	var cvs = document.getElementById("dbd_right");
	var ctx=cvs.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.strokeStyle="#000";
		ctx.moveTo(record2[0],record2[1]);
		for(var i = 2;i<record2.length;i+=2){
			ctx.lineTo(record2[i],record2[i+1]);
			ctx.stroke();
		}

}
drawRight(record_right);
var average = (score_left+score_right)/2;
var atf = average.toFixed(0);
$(".average").html(atf+"<span>分<span>");//保留几位小数

if(atf<20){$(".swt").html("苍天！这是个异形么。。。");}
if(atf>=20&&atf<40){$(".swt").html("请二位多多练习天下无双剑法。。。");}
if(atf>=40&&atf<60){$(".swt").html("恭喜，离人生圆满还差五十步。。。");}
if(atf>=60&&atf<80){$(".swt").html("哇~~苹果正在向你俩靠近！！！");}
if(atf>=80&&atf<=100){$(".swt").html("牛X！你俩配合度太高了，完美合体！！");}