$(function(){
var stt = 1;//画左半边为0，右半边为1。

if(stt == 2){
	$(".right_area").show();
	$(".board").show();
	$(".right_area .right_btn").tap(function(){
		$(".right_area").hide();
		$(".board").hide();
		$(".img img").addClass("hjmyr");
	})
}

var screenWidth = $(window).width(),
	screenHeight = $(window).height();
	$('body').css('height',screenHeight).css('position','relative');

	var t2tp = parseInt($(".title2").css("height"));
	var dtp = parseInt($(".dw2").css("height"));

	$(".dw2").css("top",t2tp+1+"px");
	var tnW = parseInt($(".tan .tbg").css("width"));
	$(".tan .tbg").css("left",(screenWidth-tnW)/2+7+"px");
	$(".tryAgain span").css("left",(screenWidth-tnW)/2+7+10+"px");
	$(".shareBtn1 span").css("left",(screenWidth-tnW)/2+7+10+14+110+"px");
	//canvas样式

	var oCanvas = document.getElementById('palette');
	var brd = $("#palette");
	brd.attr({'width' : 160+"px",'height' : 320+"px"});
	brd.css("top",t2tp+dtp+1+"px");
	$(".white").css("top",t2tp+dtp+1+"px");
	$(".img img").css("top",t2tp+dtp+21+"px");

	function areaJudge(statu){
		if(statu==0){
			$(".white").css("left",screenWidth/2);
			brd.css("left",(parseInt(screenWidth)-320)/2-2+"px");
			$(".mask").css("left",(parseInt(screenWidth)-320)/2+"px");
		}
		else if(statu==1){
			$(".white").css("left",0);
			brd.css({"left":parseInt(screenWidth)/2-2+"px","border-right":"none","border-left":"2px dashed #a2a1a1"});
			$(".mask").css({"left":parseInt(screenWidth)/2+"px"});
		}
	}
	areaJudge(stt);
	var cxt=oCanvas.getContext("2d");
	 	cxt.lineWidth=2;
		cxt.strokeStyle="green";


	//移动
	var count = 0;var heng = new Array();var zong = new Array();
	var max_heng = 0;var max_zong = 0;var min_h = 10000;var min_z = 10000;
	var add1 = -35;var add2 = -10;var add3 = -10;var add4 = -10;var add5 = -10;var addEx = -2;
	var score_left = 60,score_right = 60;//初始分为60
	var record = new Array(200);
	var move = function(e){
		brd.on('touchstart' , function (e) {
			var disX = 0, disY = 0, mouseX = 0, mouseY = 0;
			e = e || window.event;
			disX = e.targetTouches[0].pageX - this.offsetLeft;
			disY = e.targetTouches[0].pageY - this.offsetTop;
			cxt.moveTo(disX,disY);
		});
		brd.on('touchmove' , function (e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			mouseX = e.targetTouches[0].pageX - this.offsetLeft;
			mouseY = e.targetTouches[0].pageY - this.offsetTop;
			cxt.lineTo(mouseX,mouseY);
			// console.log("横坐标是："+mouseX,"纵坐标是："+mouseY);
			function moveJudge(statu){
				if(statu==0){
					//上凸
					if(mouseX>=85&&mouseX<=90&&mouseY>=20&&mouseY<=25){add2=5;}
					if(mouseX>=80&&mouseX<=95&&mouseY>=35-20&&mouseY<=50-20){if(add2<5)add2=4;}
					if(mouseX>=70&&mouseX<=105&&mouseY>=25-20&&mouseY<=60-20){if(add2<4)add2=2;}
					if(mouseX>=60&&mouseX<=115&&mouseY>=15-20&&mouseY<=70-20){if(add2<2)add2=1;}

					//ex
					if(mouseX>=30&&mouseX<=35&&mouseY>=42&&mouseY<=47){addEx=5;}
					if(mouseX>=25&&mouseX<=40&&mouseY>=37&&mouseY<=52){if(addEx<5)addEx=4;}
					if(mouseX>=20&&mouseX<=45&&mouseY>=32&&mouseY<=57){if(addEx<4)addEx=3;}
					if(mouseX>=15&&mouseX<=50&&mouseY>=27&&mouseY<=62){if(addEx<3)addEx=2;}

					//左凸
					if(mouseX>=0&&mouseX<=5&&mouseY>=125&&mouseY<=130){add3=5;}
					if(mouseX>=-5&&mouseX<=10&&mouseY>=140-20&&mouseY<=155-20){if(add3<5)add3=4;}
					if(mouseX>=-15&&mouseX<=20&&mouseY>=130-20&&mouseY<=165-20){if(add3<4)add3=2;}
					if(mouseX>=-25&&mouseX<=30&&mouseY>=120-20&&mouseY<=175-20){if(add3<2)add3=1;}

					//下弧
					if(mouseX>=64&&mouseX<=69&&mouseY>=253-20&&mouseY<=258-20){add4=5;}
					if(mouseX>=59&&mouseX<=74&&mouseY>=248-20&&mouseY<=263-20){if(add4<5)add4=4;}
					if(mouseX>=49&&mouseX<=84&&mouseY>=238-20&&mouseY<=273-20){if(add4<4)add4=2;}
					if(mouseX>=39&&mouseX<=94&&mouseY>=228-20&&mouseY<=283-20){if(add4<2)add4=1;}

					//结尾
					if(mouseX>=155&&mouseX<=160&&mouseY>=315-20&&mouseY<=320-20){add5=5;}
					if(mouseX>=150&&mouseX<=165&&mouseY>=310-20&&mouseY<=330-20){if(add5<5)add5=4;}
					if(mouseX>=140&&mouseX<=175&&mouseY>=280&&mouseY<=320){if(add5<4)add5=2;}
					if(mouseX>=130&&mouseX<=185&&mouseY>=290-20&&mouseY<=350-20){if(add5<2)add5=1;}

					//禁区
					if(mouseX>50&&mouseX<110&&mouseY>70&&mouseY<160){bomb = -10;}
					if(mouseX>110&&mouseX<145&&mouseY>120&&mouseY<180){big_bomb = -60;}

				}
				else if(statu==1){

					//上凸
					if(mouseX<=75&&mouseX>=70&&mouseY>=20&&mouseY<=25){add2=5;}
					if(mouseX<=80&&mouseX>=160-95&&mouseY>=35-20&&mouseY<=50-20){if(add2<5)add2=4;}
					if(mouseX<=90&&mouseX>=160-105&&mouseY>=25-20&&mouseY<=60-20){if(add2<4)add2=2;}
					if(mouseX<=100&&mouseX>=160-115&&mouseY>=15-20&&mouseY<=70-20){if(add2<2)add2=1;}

					//ex
					if(mouseX<=130&&mouseX>=125&&mouseY>=42&&mouseY<=47){addEx=5;}
					if(mouseX<=135&&mouseX>=120&&mouseY>=37&&mouseY<=52){if(addEx<5)addEx=4;}
					if(mouseX<=140&&mouseX>=115&&mouseY>=32&&mouseY<=57){if(addEx<4)addEx=3;}
					if(mouseX<=145&&mouseX>=110&&mouseY>=27&&mouseY<=62){if(addEx<3)addEx=2;}

					//右凸
					if(mouseX<=160&&mouseX>=155&&mouseY>=125&&mouseY<=130){add3=5;}
					if(mouseX<=165&&mouseX>=150&&mouseY>=120&&mouseY<=135){if(add3<5)add3=4;}
					if(mouseX<=175&&mouseX>=140&&mouseY>=110&&mouseY<=145){if(add3<4)add3=2;}
					if(mouseX<=185&&mouseX>=130&&mouseY>=100&&mouseY<=155){if(add3<2)add3=1;}

					//下弧
					if(mouseX<=96&&mouseX>=91&&mouseY>=253-20&&mouseY<=258-20){add4=5;}
					if(mouseX<=101&&mouseX>=86&&mouseY>=248-20&&mouseY<=263-20){if(add4<5)add4=4;}
					if(mouseX<=111&&mouseX>=76&&mouseY>=238-20&&mouseY<=273-20){if(add4<4)add4=2;}
					if(mouseX<=121&&mouseX>=66&&mouseY>=228-20&&mouseY<=283-20){if(add4<2)add4=1;}

					//结尾
					if(mouseX<=5&&mouseX>=0&&mouseY>=295&&mouseY<=300){add5=5;}
					if(mouseX<=10&&mouseX>=-5&&mouseY>=290&&mouseY<=310){if(add5<5)add5=4;}
					if(mouseX<=20&&mouseX>=-15&&mouseY>=280&&mouseY<=320){if(add5<4)add5=2;}
					if(mouseX<=30&&mouseX>=-25&&mouseY>=270&&mouseY<=330){if(add5<2)add5=1;}

					//禁区
					if(mouseX<110&&mouseX>50&&mouseY>70&&mouseY<160){bomb = -10;}
					if(mouseX<50&&mouseX>15&&mouseY>120&&mouseY<180){big_bomb = -60;}

				}
				count++;
				heng[count-1] = mouseX;
				zong[count-1] = mouseY;


				if(count<201){cxt.stroke();}//只接收二百点

				console.log(count);
			}
			moveJudge(stt);
		});
		brd.on('touchend' , function (e) {
			$(".mask").show();
			$(".img img").removeClass("hjmyr");
			for(var a=0;a<heng.length;a++){
				record[a]=[heng[a],zong[a]];
			};
			console.log("坐标集合"+record);
			console.log("stop");
			//不允许断点
			// console.log("横坐标集合:"+heng);
			for(var i=1;i<heng.length;i++){if(max_heng<heng[i])max_heng=heng[i];}
			for(var k=1;k<heng.length;k++){if(min_h>heng[k])min_h=heng[k];}
			console.log("最大横坐标:"+max_heng);
			console.log("最小横坐标:"+min_h);

			// console.log("纵坐标集合:"+zong);
			for(var j=1;j<zong.length;j++){if(max_zong<zong[j])max_zong=zong[j];}
			for(var u=1;u<zong.length;u++){if(min_z>zong[u])min_z=zong[u];}
			console.log("最大纵坐标:"+max_zong);
			console.log("最小纵坐标:"+min_z);

			function endJudge(statu){
				var lst = 0;
				if(statu==0){
					if(heng[heng.length-1]<115){lst = -10;}
					var bomb = 0;var big_bomb = 0;
					//起点
					if(heng[0]>=125&&heng[0]<=160&&zong[0]>=25&&zong[0]<=90){if(add1<3){add1=0;}}
					if(heng[0]>=130&&heng[0]<=160&&zong[0]>=35&&zong[0]<=90){if(add1<8){add1=3;}}
					if(heng[0]>=140&&heng[0]<=160&&zong[0]>=45&&zong[0]<=80){if(add1<10){add1=8;}}
					if(heng[0]>=150&&heng[0]<=160&&zong[0]>=55&&zong[0]<=70){if(add1<11){add1=10;}}
					if(heng[0]>=155&&heng[0]<=160&&zong[0]>=60&&zong[0]<=65){add1=11;}

				}
				else if(statu==1){
					if(heng[heng.length-1]>45){lst = -10;}
					var bomb = 0;var big_bomb = 0;
					//起点
					if(heng[0]<=35&&heng[0]>=0&&zong[0]>=25&&zong[0]<=90){if(add1<3){add1=0;}}
					if(heng[0]<=30&&heng[0]>=0&&zong[0]>=35&&zong[0]<=90){if(add1<8){add1=3;}}
					if(heng[0]<=20&&heng[0]>=0&&zong[0]>=45&&zong[0]<=80){if(add1<10){add1=8;}}
					if(heng[0]<=10&&heng[0]>=0&&zong[0]>=55&&zong[0]<=70){if(add1<11){add1=10;}}
					if(heng[0]<=5&&heng[0]>=0&&zong[0]>=60&&zong[0]<=65){add1=11;}

				}
				//范围限制
				var minus_y = 0;
				if(max_zong-min_z>400){
					minus_y = -50;
				}
				else if(max_zong-min_z>380&&max_zong-min_z<=400){
					minus_y = -40;
				}
				else if(max_zong-min_z>360&&max_zong-min_z<=380){
					minus_y = -20;
				}
				else if(max_zong-min_z>320&&max_zong-min_z<=360){
					minus_y = -10;
				}

				score = 60+add1+add2+add3+add4+add5+minus_y+bomb+big_bomb+addEx;

				//点数限制
				var point = 0;
				if(count<15){
					score_left = 0;
				}
				else if(count == 81){
					point = 5;
				}
				else if(count<81&&count>=20){
					point = (count-20)/13;
				}
				else if(count>81&&count<=201){
					point = 5-(count-81)/23;
				}
				else{
					score = 20;
				}

				//结尾点限制

				score += point;
				score += lst;
				var scr3 = score.toFixed(3);
				result(scr3);
				console.log(add1,add2,add3,add4,add5,minus_y,point,bomb,big_bomb,lst,addEx);
			}
			endJudge(stt);
		});
	}

	move();
	$(".tryAgain").tap(function(){
		cxt.beginPath();
		cxt.clearRect(0,0,160,320);
		count = 0;
		$(".mask").hide();

		$(".tan").hide();
		$(".board").hide();
		$(".img img").addClass("hjmyr");

		//初始化
		count = 0;heng = new Array();zong = new Array();
		max_heng = 0;max_zong = 0;min_h = 10000;min_z = 10000;
		add1 = -35;add2 = -10;add3 = -10;add4 = -10;add5 = -10;addEx = -2;
		score_left = 60,score_right = 60;
		record = new Array();
	})
	function result(score,statu){
		console.log(score);
		$(".board").show();
		$(".tan").show();
		if(score<20){$(".tan .pingYu").html("LOW货！！！重新来。。");}
		if(score>=20&&score<40){$(".tan .pingYu").html("Come on！快50分了。");}
		if(score>=40&&score<60){$(".tan .pingYu").html("马马虎虎吧~~发出去试试");}
		if(score>=60&&score<80){$(".tan .pingYu").html("哎哟不错，这个屌！");}
		if(score>=80&&score<=100){$(".tan .pingYu").html("perfect ！快发出去看看");}

		if(stt==1){
			$(".tan .shareBtn1").tap(function(){
				$(".tan").hide();
				$(".end").show();
				$(".board").show();
			})
		}
	}
})