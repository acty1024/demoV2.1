var can,ctx,w,h;
var i;
//获取按键值
var key;
var attacktype1,attacktype2;//角色一的功机方式，角色二的攻击方式
var state1,state2;//角色一的状态，角色二的状态
var attack_count = 0;//受击次数
//绘制小人图片的参数
var set_stop='stop',set_fall='nofall',set_attack='noattack';
var px,py,pw,ph,p_dx,p_dy,p_dw,p_dy;
var dir = 'stop',dir2 = 'stop';
var glassPic = new Image();
var personPic = new Image();
var personPic2 = new Image();
var jump = new Image();
var dun = new Image();
var quan = new Image();
var quan2 = new Image();
var direction = 'stop';
var personW,personH;
var padLeft = 0;
var padTop = 0;
var glassWidth = 1000;
var glassHeight = 630;
var judge1=0;
var fall = new Image();
var attack = new Image();
$(function(){
	can = document.getElementById('canvas');
	ctx = can.getContext('2d');



	w = can.width;
	h = can.height;
	glassPic.src = 'img/bg1.jpg';//背景图片
	personPic.src = 'img/role1.png';//角色1
	personPic2.src = 'img/role2.png';//角色2
	jump.src = 'img/r1jump.png';//角色1跳跃
	dun.src = 'img/r1dun.png';//角色1下蹲
	quan.src = 'img/r1quan.png';//角色1出拳
	fall.src = 'img/fall.png';
	attack.src = 'img/attack.png';
	quan2.src='img/quan2.png'
	personW = personPic.width;
	personH = personPic.height;


	initPersonPicPosition();
	updatePage();

});
function updatePage(){
	var t = setInterval(function(){
		crash();
		fillCanvas();
		drawGlass();		
		drawPerson();
		drawPerson2();//角色2
		
	},63)
}
function initPersonPicPosition(){
	i = 0;
	j=0;
	px = 0;
	px2 = 800;
	py = 450;
	 pw = 63;
	 ph = 91;
	 p_dw = 63;
	 p_dh = 91;
	p_dy = 0;

	py2 = 450;
	 pw2 = 63;
	 ph2 = 91;
	 p_dw2 = 63;
	 p_dh2 = 91
	 ;
	p_dy2 = 0;
}
function drawGlass(){
	ctx.drawImage(glassPic,padLeft,padTop,glassWidth,glassHeight);
	



}

function fillCanvas() {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);

}
//以上为角色1写入canavs以下为角色2
// function drawGlass2(){
// 	ctx2.drawImage(glassPic,padLeft,padTop,glassWidth,glassHeight);
	
// }

// function fillCanvas2() {
// 	ctx2.fillStyle = "#393550";
// 	ctx2.fillRect(0, 0, w, h);
// }

function drawPerson2(){//这里写控制图片的代码角色2
	


	if(dir2 == 'left'){
		if(px2 <= 0){
			//px = 950;
			ctx.drawImage(personPic2,63*(j--),p_dy2,p_dw2,p_dh2,px2,py2,pw2,ph2);
			
			
		}else{
			ctx.drawImage(personPic2,63*(j--),p_dy2,p_dw2,p_dh2,px2-=10,py2,pw2,ph2);
			if((px2-px)<-63)
{

huitu2();
}
			
		}
		
	 if(j < 0){j = 2;}
	}
	else if(dir2 == 'right'){
		if(px2 >= 950){
			ctx.drawImage(personPic2,63*(j++),p_dy2,p_dw2,p_dh2,px2,py2,pw2,ph2);
			huitu2();
			
		}else{
			ctx.drawImage(personPic2,63*(j++),p_dy2,p_dw2,p_dh2,px2+=10,py2,pw2,ph2);
			
			if((px2-px)<-63)
{

huitu2();
}
			
			
		}
		if(j == 3){j = 0;}
	}
   else if(dir2 == 'stop'){		

   ctx.drawImage(personPic2,63*j,p_dy2,p_dw2,p_dh2,px2,py2,pw2,ph2)
     if((px2-px)<-63)
     {

     huitu2();
     }

// 	//第一个参数为图片之后依次为表示图片开始剪切的 xy 坐标位置，表示被剪切图像的宽度高度
// 	//开始绘制时的xy位置pxpy
// 	//表示要使用的图像的宽度高度，即拉伸或缩小图像pwhpwy
 }
 else if(dir2 == 'quan'){

	p_dw2=98;
	p_dh2=91;
	ctx.drawImage(quan2,98*(j--),p_dy2,p_dw2,p_dh2,px2,py2,98,91);
	if((px2-px)<63)
	{
	huitu2();
	}

	p_dw2=63;
	p_dh2=91;
	if(j< 0){j=2;}
	state2=1;
	attacktype2=1
}
}








function huitu2(){//镜像角色2矩形区域图片

	var img_data = ctx.getImageData(px2,py2,p_dw2,p_dh2),
		i, i2, t,
		h = img_data.height,
		w = img_data.width,
		w_2 = w / 2;
	// 将 img_data 的数据水平翻转
	for (var dy = 0; dy < h; dy ++) {
		for (var dx = 0; dx < w_2; dx ++) {
			i = (dy << 2) * w + (dx << 2)
			i2 = ((dy + 1) << 2) * w - ((dx + 1) << 2)
			for (var p = 0; p < 4; p ++) {
				t = img_data.data[i + p]
				img_data.data[i + p] = img_data.data[i2 + p]
				img_data.data[i2 + p] = t
			}
		}
	}
	// 重绘水平翻转后的图片
	ctx.putImageData(img_data, px2,py2)
	}

	
	function huitu1(){//镜像角色2矩形区域图片

		var img_data = ctx.getImageData(px,py,p_dw,p_dh),
			i, i2, t,
			h = img_data.height,
			w = img_data.width,
			w_2 = w / 2;
		// 将 img_data 的数据水平翻转
		for (var dy = 0; dy < h; dy ++) {
			for (var dx = 0; dx < w_2; dx ++) {
				i = (dy << 2) * w + (dx << 2)
				i2 = ((dy + 1) << 2) * w - ((dx + 1) << 2)
				for (var p = 0; p < 4; p ++) {
					t = img_data.data[i + p]
					img_data.data[i + p] = img_data.data[i2 + p]
					img_data.data[i2 + p] = t
				}
			}
		}
		// 重绘水平翻转后的图片
		ctx.putImageData(img_data, px,py)
		}


function drawPerson(){//角色1动作
	
	if(dir == 'left'){
		if(px <= 0){
			//px = 950;
			ctx.drawImage(personPic,63*(i--),p_dy,p_dw,p_dh,px,py,pw,ph);
		}else{
			ctx.drawImage(personPic,63*(i--),p_dy,p_dw,p_dh,px-=10,py,pw,ph);

			if((px2-px)<63)
{

huitu1();
}
		}
		
	 if(i < 0){i = 2;}
	}
	else if(dir == 'right'){
		if(px >= 950){
			ctx.drawImage(personPic,63*(i++),p_dy,p_dw,p_dh,px,py,pw,ph);
		}else{
			ctx.drawImage(personPic,63*(i++),p_dy,p_dw,p_dh,px+=10,py,pw,ph);
			
			
			
			if((px2-px)<63)
{

huitu1();
}


		}
		if(i == 3){i = 0;}
		
	}
	else if((dir == 'stop')&&(set_stop=='stop')&&(set_fall=='nofall')){
		ctx.drawImage(personPic,63*i,p_dy,p_dw,p_dh,px,py,pw,ph);
		//ctx.drawImage(fall,120*3,p_dy,120,p_dh,px,py,120,ph);	

		

		if((px2-px)<63)
{

huitu1();
}
	}

	else if((set_stop == 'nostop')&&(set_fall=='fall')){
		ctx.drawImage(fall,120*3,p_dy,120,p_dh,px,py,120,ph);	

// 		if((px2-px)<63)
// {

// huitu1();
// }
}
else if((set_stop == 'nostop')&&(set_fall=='nofall')&&(set_attack=='attack')){
	ctx.drawImage(attack,72*(2),p_dy,72,p_dh,px,py,72,ph);	

// 		if((px2-px)<63)
// {

// huitu1();
// }
}

	else if(dir == 'jump'){
		p_dh=108;
		ctx.drawImage(jump,63*(i--),p_dy,p_dw,108,px,py-=120,pw,ph);
		if((px2-px)<63)
		{
		
		huitu1();
		}
		 py+=120;
		 p_dh=91;
		i = 1;
	}
	else if(dir == 'down'){
		p_dh=108;
		ctx.drawImage(dun,63*(i++),p_dy,p_dw,108,px,py-=20,pw,108);
		if((px2-px)<63)
		{
		
		huitu1();
		}
		py+=20;
		p_dh=91;
		 if(i>1){i = 1;}
	}
	else if(dir == 'quan'){
		p_dw=93;
		p_dh=108;
		ctx.drawImage(quan,93*(i--),p_dy,p_dw,p_dh,px,py-=20,93,108);
		if((px2-px)<63)
		{
		
		huitu1();
		}
		py+=20;
		p_dw=63;
		p_dh=91;
		if(i < 0){i=1;}
		state1=1;
		attacktype1=1
	}
	
	
	
	
}








(function keyControl(){//键盘事件控制角色1

	$(document).keydown(function(e){
		key = e.which;
		if(key ==37){
			dir = 'left';
			p_dy = 91;

		}else if(key ==39){
			dir = 'right';
			p_dy = 0;
		}else if(key ==38){
			dir = 'jump';
			p_dy = 0;
		}
		else if(key ==40){
			dir = 'down';
			p_dy = 0;
		}
		else if(key == 97){
			dir = 'quan';
			p_dy = 0;
		}
		
		
		
		
		
		//控制角色2
		if(key ==65){
			dir2 = 'left';
			p_dy2 = 91;

		}
		else if(key==68){
			dir2 = 'right';
			p_dy2 = 0;
		}
		else if(key==87){
			dir2 = 'jump';
			p_dy2 = 0;
		}
		else if(key==83){
			dir2 = 'down';
			p_dy2 = 0;
		}
		else if(key == 74){
			dir2 = 'quan';
			p_dy2 = 0;
		}
	});
	$(document).keyup(function(e){
	
		dir = 'stop';
		dir2 = 'stop';
		state1=0;
		state2=0;

	});
})
();


 function attacked(){//判断受击次数
// 	if(attack_count > 2){
		
// 		fun_fall();
// 		attack_count = 0;
// 	}
// 	else{
	
			
	fun_attack();
// 		attack_count+=1;
	
// 	}
// 	//fun_attack();
// 	//fun_fall();
	
	
}

function fun_fall(){


	
	setTimeout(() => {
		set_stop='nostop';
		ctx.drawImage(fall,120*(0),p_dy,120,p_dh,px-=3,py,120,ph);
	},0);
	setTimeout(() => {
		ctx.drawImage(fall,120*(1),p_dy,120,p_dh,px-=3,py,120,ph);
	},400);
	setTimeout(() => {
		ctx.drawImage(fall,120*(2),p_dy,120,p_dh,px-=3,py,120,ph);
		set_fall='fall';

	}, 800);
	

	setTimeout(() => {
		
	//	ctx.drawImage(fall,120*(3),p_dy,120,p_dh,px,py,120,ph);
		
		set_fall='nofall'
		set_stop='stop';
	},1200);
}

function fun_attack(){

	
	
	setTimeout(() => {
		set_stop='nostop';
		
		ctx.drawImage(attack,72*(0),p_dy,72,p_dh,px,py,72,ph);
		if(attack_i==3){attack_i=0;}
		}, 0);
	setTimeout(() => {
		ctx.drawImage(attack,72*(1),p_dy,72,p_dh,px,py,72,ph);
		set_attack='attack';
		if(attack_i==3){attack_i=0;}
		}, 300);
	setTimeout(() => {
		set_attack='noattack';
		set_stop='stop';
		
		if(attack_i==3){attack_i=0;}
		}, 600);
			
	
}

// var attack_count2 = 0;
// function attacked2(){
// 	if(attack_count2 > 2){
// 		fun_fall();
// 		attack_count2 = 0;
// 	}
// 	else{
// 		fun_attack();
// 		attack_count2++;
// 	}
// }

// function fun_fall2(){
// 	setTimeout(() => {
// 		ctx.drawImage(fall2,90*(0),p_dy2,p_dw2,p_dh2,px2-=5,py2,pw2,ph2);
// 	}, 50);
// 	setTimeout(() => {
// 		ctx.drawImage(fall2,90*(1),p_dy2,p_dw2,p_dh2,px2-=5,py2,pw2,ph2);
// 	}, 100);
// 	setTimeout(() => {
// 		ctx.drawImage(fall2,90*(2),p_dy2,p_dw2,p_dh2,px2-=5,py2,pw2,ph2);
// 	}, 150);
// 	setTimeout(() => {
// 		ctx.drawImage(fall2,90*(3),p_dy2,p_dw2,p_dh2,px2-=5,py2,pw2,ph2);
// 	}, 200);
// }

// function fun_attack2(){
// 	setTimeout(() => {
// 		ctx.drawImage(attack2,72*(0),p_dy2,p_dw2,p_dh2,px2,py2,pw2,ph2);
// 		if(attack_i==3){attack_i=0;}
// 		}, 50);
// 	setTimeout(() => {
// 		ctx.drawImage(attack2,72*(1),p_dy2,p_dw2,p_dh2,px2,py2,pw2,ph2);
// 		if(attack_i==3){attack_i=0;}
// 		}, 100);
// 	setTimeout(() => {
// 		ctx.drawImage(attack2,72*(2),p_dy2,p_dw2,p_dh2,px2,py2,pw2,ph2);
// 		if(attack_i==3){attack_i=0;}
// 		}, 150);
	
// }

function crash(){
	// state：0，1,2,3；
	// 0正常状态
	// 1进攻状态
	// 2受击状态
	// 3被击倒状态（不可选中）
         switch (state1){
               case 0:
				   if((px2-px)<63&&state2==0){
				    //角色一和角色二正常相遇
				}
				    else if((px2-px)>-63&&(px2-px)<68&&state2==1&&attacktype2==1){
					//角色一被角色二攻击
                              fun_fall();
			}
					break;
			    case 1:
					if((px2-px1)<63&&state2==0){
                        //角色二被角色一攻击
					}
					if((px2-px1)<63&&state2==1){
                        //角色二和角色一同时受伤
					}
				   break;
				case 2:
					
				   break; 
				   case 3:
					//角色一不可选中
					
				   break;  
		 }

















}


